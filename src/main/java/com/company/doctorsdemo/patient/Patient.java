package com.company.doctorsdemo.patient;

import com.amplicode.core.file.annotation.FileId;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "patient")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Length(min = 2)
    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Length(min = 2)
    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @FileId
    @Column(name = "passport")
    private String passport;

    @Column(name = "passport_filename")
    private String passportFilename;

    @Column(name = "passport_file_content_type")
    private String passportFileContentType;

    public String getPassportFileContentType() {
        return passportFileContentType;
    }

    public void setPassportFileContentType(String passportFileContentType) {
        this.passportFileContentType = passportFileContentType;
    }

    public String getPassportFilename() {
        return passportFilename;
    }

    public void setPassportFilename(String passportFilename) {
        this.passportFilename = passportFilename;
    }

    public String getPassport() {
        return passport;
    }

    public void setPassport(String passport) {
        this.passport = passport;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}