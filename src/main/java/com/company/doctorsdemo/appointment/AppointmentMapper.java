package com.company.doctorsdemo.appointment;

import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface AppointmentMapper {
    @Mapping(source = "patientLastName", target = "patient.lastName")
    @Mapping(source = "patientFirstName", target = "patient.firstName")
    @Mapping(source = "patientId", target = "patient.id")
    @Mapping(source = "doctorLastName", target = "doctor.lastName")
    @Mapping(source = "doctorFirstName", target = "doctor.firstName")
    @Mapping(source = "doctorId", target = "doctor.id")
    Appointment toEntity(AppointmentDocument appointmentDocument);

    @InheritInverseConfiguration(name = "toEntity")
    AppointmentDocument toDto(Appointment appointment);

    @InheritConfiguration(name = "toEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    Appointment partialUpdate(AppointmentDocument appointmentDocument, @MappingTarget Appointment appointment);
}