package com.company.doctorsdemo.security;

import org.mapstruct.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    @Mapping(source = "authorityIds", target = "authorities")
    User toEntity(UserDto userDto);

    @Mapping(target = "authorityIds", expression = "java(authoritiesToAuthorityIds(user.getAuthorities()))")
    @Mapping(target = "authorityNames", source = "authorities")
    UserDto toDto(User user);

    @Mapping(source = "authorityIds", target = "authorities")
    User update(UserDto userDto, @MappingTarget User user);

    default List<Long> authoritiesToAuthorityIds(List<Authority> authorities) {
        return authorities.stream().map(Authority::getId).collect(Collectors.toList());
    }

    default List<String> authoritiesToAuthorityNames(List<Authority> authorities) {
        return authorities.stream().map(Authority::getName).collect(Collectors.toList());
    }

    default List<Authority> authorityIdsToAuthorities(List<Long> authorityIds) {
        if (authorityIds == null) {
            return new ArrayList<>();
        }
        return authorityIds.stream()
                .map(id -> {
                    Authority auth = new Authority();
                    auth.setId(id);
                    return auth;
                })
                .toList();
    }
}

