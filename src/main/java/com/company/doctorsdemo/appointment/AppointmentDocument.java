package com.company.doctorsdemo.appointment;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Document(indexName = "appointment", createIndex = false)
public class AppointmentDocument {

    @Id
    @Field(type = FieldType.Keyword)
    private Long id;
    @Id
    @Field(type = FieldType.Keyword, name = "id")
    private Long doctorId;
    @Field(type = FieldType.Text, name = "firstName", analyzer = "standard")
    private String doctorFirstName;
    @Field(type = FieldType.Text, name = "lastName", analyzer = "standard")
    private String doctorLastName;
    @Id
    @Field(type = FieldType.Keyword, name = "id")
    private Long patientId;
    @Field
    private String patientFirstName;
    @Field
    private String patientLastName;
    @Field(type = FieldType.Date, format = {DateFormat.date_hour_minute_second_millis})
    private LocalDateTime startTime;
    @Field(type = FieldType.Text, analyzer = "standard")
    private Status status;
    @Field(type = FieldType.Integer)
    private Integer duration;
    @Field(type = FieldType.Date, format = {DateFormat.date_hour_minute_second_millis})
    private LocalDateTime endTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorFirstName() {
        return doctorFirstName;
    }

    public void setDoctorFirstName(String doctorFirstName) {
        this.doctorFirstName = doctorFirstName;
    }

    public String getDoctorLastName() {
        return doctorLastName;
    }

    public void setDoctorLastName(String doctorLastName) {
        this.doctorLastName = doctorLastName;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientFirstName() {
        return patientFirstName;
    }

    public void setPatientFirstName(String patientFirstName) {
        this.patientFirstName = patientFirstName;
    }

    public String getPatientLastName() {
        return patientLastName;
    }

    public void setPatientLastName(String patientLastName) {
        this.patientLastName = patientLastName;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
}