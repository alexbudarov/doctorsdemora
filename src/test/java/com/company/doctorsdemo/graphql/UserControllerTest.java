package com.company.doctorsdemo.graphql;

import com.company.doctorsdemo.security.User;
import com.company.doctorsdemo.security.UserDto;
import com.company.doctorsdemo.security.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.HttpGraphQlTester;
import org.springframework.security.test.context.support.WithMockUser;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureHttpGraphQlTester
@WithMockUser(authorities = {"ROLE_ADMIN"})
public class UserControllerTest {

    @Autowired
    private HttpGraphQlTester graphQlTester;

    @Autowired
    private UserRepository userRepository;

    private UserDto user;

    private Long userId;

    @BeforeEach
    public void setup() {
        user = new UserDto();
        user.setFullName("Alex");
        user.setUsername("alexb");
        user.setEnabled(true);
    }

    @AfterEach
    void tearDown() {
        if (userId != null) {
            userRepository.deleteById(userId);
        }
    }

    @Test
    public void testCreate() {
        //when: send a GraphQL mutation
        //then: check response and mutation side effect
        graphQlTester.documentName("updateUser")
                .variable("input", user)
                .execute()
                .path("updateUser")
                .entity(UserDto.class)
                .satisfies(returnedValue -> {
                    assertNotNull(returnedValue.getId());
                    userId = returnedValue.getId();
                    assertEquals("alexb", returnedValue.getUsername());
                });

        assertTrue(userRepository.existsById(userId));
    }

    @Test
    public void testUpdateDontTouchPassword() {
        // create
        graphQlTester.documentName("updateUser")
                .variable("input", user)
                .execute()
                .path("updateUser")
                .entity(UserDto.class)
                .satisfies(returnedValue -> {
                    userId = returnedValue.getId();
                    assertTrue(returnedValue.getEnabled());
                });

        User userEntity = userRepository.findById(userId).orElseThrow();
        userEntity.setPassword("{noop}password");
        userRepository.save(userEntity);

        // update
        UserDto modifiedUser = new UserDto();
        modifiedUser.setId(userId);
        modifiedUser.setFullName(user.getFullName());
        modifiedUser.setUsername(user.getUsername());
        modifiedUser.setEnabled(false);

        graphQlTester.documentName("updateUser")
                .variable("input", modifiedUser)
                .execute()
                .path("updateUser")
                .entity(UserDto.class)
                .satisfies(returnedValue -> {
                    assertFalse(returnedValue.getEnabled());
                });

        userEntity = userRepository.findById(userId).orElseThrow();
        assertEquals("{noop}password", userEntity.getPassword());
    }

}
