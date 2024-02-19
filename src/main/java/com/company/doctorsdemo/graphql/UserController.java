package com.company.doctorsdemo.graphql;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import com.company.doctorsdemo.security.*;
import jakarta.persistence.criteria.Predicate;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class UserController {
    private final UserRepository crudRepository;
    private final UserMapper mapper;

    private final UserManagementService userManagementService;

    public UserController(UserRepository crudRepository, UserMapper mapper,
                          UserManagementService userManagementService) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
        this.userManagementService = userManagementService;
    }

    @MutationMapping(name = "deleteUser")
    @Transactional
    @Secured("ROLE_ADMIN")
    public void delete(@GraphQLId @Argument @NonNull Long id) {
        User entity = crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));

        crudRepository.delete(entity);
    }

    @QueryMapping(name = "userList")
    @Transactional(readOnly = true)
    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @NonNull
    public ResultPage<UserDto> findAll(
            @Argument UserFilter filter,
            @Argument("sort") List<UserOrderByInput> sortInput,
            @Argument("page") OffsetPageInput pageInput
    ) {
        Specification<User> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<User> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent().stream().map(mapper::toDto).collect(Collectors.toList()), pageData.getTotalElements());
    }

    @QueryMapping(name = "user")
    @Transactional(readOnly = true)
    @Secured("ROLE_ADMIN")
    @NonNull
    public UserDto findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    @MutationMapping(name = "updateUser")
    @Transactional
    @Secured("ROLE_ADMIN")
    @NonNull
    public UserDto update(@Argument @NonNull @Valid UserDto input) {
        if (input.getId() != null) {
            if (!crudRepository.existsById(input.getId())) {
                throw new RuntimeException(
                        String.format("Unable to find entity by id: %s ", input.getId()));
            }
        }
        User entity = input.getId() == null
                ? new User()
                : crudRepository.findById(input.getId()).orElseThrow();

        mapper.update(input, entity);
        entity = crudRepository.save(entity);
        return mapper.toDto(entity);
    }

    @Secured("ROLE_ADMIN")
    @MutationMapping(name = "changePassword")
    public void changePassword(
            @Argument @NonNull Long userId,
            @Argument @NonNull String newPassword
    ) {
        userManagementService.changePassword(userId, newPassword);
    }

    protected Sort createSort(List<UserOrderByInput> sortInput) {
        if (sortInput == null || sortInput.isEmpty()) {
            return Sort.unsorted();
        }
        List<Sort.Order> orders = sortInput.stream()
                .map(item -> {
                    Sort.Direction direction;
                    if (item.getDirection() == SortDirection.ASC) {
                        direction = Sort.Direction.ASC;
                    } else {
                        direction = Sort.Direction.DESC;
                    }
                    switch (item.getProperty()) {
                        case USERNAME:
                            return Sort.Order.by("username").with(direction);
                        case FULL_NAME:
                            return Sort.Order.by("fullName").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class UserOrderByInput {
        private UserOrderByProperty property;
        private SortDirection direction;

        public UserOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(UserOrderByProperty property) {
            this.property = property;
        }

        public SortDirection getDirection() {
            return direction;
        }

        public void setDirection(SortDirection direction) {
            this.direction = direction;
        }
    }

    public enum SortDirection {
        ASC,
        DESC
    }

    public enum UserOrderByProperty {
        USERNAME,
        FULL_NAME
    }

    protected Specification<User> createFilter(UserFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.username != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("username")), "%" + filter.username.toLowerCase() + "%"));
                }
                if (filter.fullName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("fullName")), "%" + filter.fullName.toLowerCase() + "%"));
                }
                if (filter.email != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + filter.email.toLowerCase() + "%"));
                }
                if (filter.enabled != null) {
                    predicates.add(criteriaBuilder.equal(root.get("enabled"), filter.enabled));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class UserFilter {
        private String username;
        private String fullName;
        private String email;
        private Boolean enabled;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getFullName() {
            return fullName;
        }

        public void setFullName(String fullName) {
            this.fullName = fullName;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public Boolean getEnabled() {
            return enabled;
        }

        public void setEnabled(Boolean enabled) {
            this.enabled = enabled;
        }
    }
}