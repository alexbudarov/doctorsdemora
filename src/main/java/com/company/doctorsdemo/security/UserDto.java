package com.company.doctorsdemo.security;

import jakarta.validation.constraints.Email;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * DTO for {@link User}
 */
public class UserDto implements Serializable {
    private Long id;
    private String username;
    private Boolean enabled;
    private List<Long> authorityIds;
    private List<String> authorityNames;
    private String fullName;
    @Email
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public List<Long> getAuthorityIds() {
        return authorityIds;
    }

    public void setAuthorityIds(List<Long> authorityIds) {
        this.authorityIds = authorityIds;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDto entity = (UserDto) o;
        return Objects.equals(this.id, entity.id) &&
                Objects.equals(this.username, entity.username) &&
                Objects.equals(this.enabled, entity.enabled) &&
                Objects.equals(this.authorityIds, entity.authorityIds) &&
                Objects.equals(this.fullName, entity.fullName) &&
                Objects.equals(this.email, entity.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, enabled, authorityIds, fullName, email);
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(" +
                "id = " + id + ", " +
                "username = " + username + ", " +
                "enabled = " + enabled + ", " +
                "authorityIds = " + authorityIds + ", " +
                "fullName = " + fullName + ", " +
                "email = " + email + ")";
    }

    public List<String> getAuthorityNames() {
        return authorityNames;
    }

    public void setAuthorityNames(List<String> authorityNames) {
        this.authorityNames = authorityNames;
    }
}