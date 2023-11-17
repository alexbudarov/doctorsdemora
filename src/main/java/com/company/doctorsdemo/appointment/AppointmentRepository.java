package com.company.doctorsdemo.appointment;

import com.company.doctorsdemo.appointment.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.Collection;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>, JpaSpecificationExecutor<Appointment> {

    @Query("""
            select count(a) from Appointment a
            where a.doctor.id = ?1 and a.status in ?2 and a.startTime <= ?3 and a.endTime >= ?4""")
    long countConflictsByDoctorAndPeriod(Long doctorId, Collection<Status> statuses, LocalDateTime maxStartTime, LocalDateTime minEndTime);

    @Query("""
            select count(a) from Appointment a
            where a.patient.id = ?1 and a.status in ?2 and a.startTime <= ?3 and a.endTime >= ?4""")
    long countConflictsByPatientAndPeriod(Long patientId, Collection<Status> statuses, LocalDateTime maxStartTime, LocalDateTime minEndTime);


}