package com.company.doctorsdemo.appointment;

import com.company.doctorsdemo.doctor.DoctorRepository;
import com.company.doctorsdemo.patient.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;

    private static final Set<Status> ACTIVE_STATUSES = Set.of(
            Status.PENDING,
            Status.MISSED,
            Status.IN_PROGRESS,
            Status.FINISHED
    );

    public AppointmentService(AppointmentRepository appointmentRepository,
                              DoctorRepository doctorRepository,
                              PatientRepository patientRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
    }

    @Transactional
    public AppointmentRequestResult requestAppointment(AppointmentRequestInput request){
        boolean patientConflict = isAppointmentExistsForPatient(request);
        if (patientConflict) {
            return new AppointmentRequestResult(false);
        }

        boolean doctorConflict = isAppointmentExistsForDoctor(request);
        if (doctorConflict) {
            return new AppointmentRequestResult(false);
        }

        Appointment createdAppointment = createNewAppointment(request);
        AppointmentRequestResult result = new AppointmentRequestResult(true);
        result.setAppointment(createdAppointment);
        return result;
    }

    private boolean isAppointmentExistsForDoctor(AppointmentRequestInput request) {
        long conflictCount = appointmentRepository.countConflictsByDoctorAndPeriod(
                request.getDoctorId(),
                ACTIVE_STATUSES,
                request.getTime().plusMinutes(request.getDurationMinutes()),
                request.getTime()
        );
        return conflictCount > 0;
    }

    private boolean isAppointmentExistsForPatient(AppointmentRequestInput request) {
        long conflictCount = appointmentRepository.countConflictsByPatientAndPeriod(
                request.getPatientId(),
                ACTIVE_STATUSES,
                request.getTime().plusMinutes(request.getDurationMinutes()),
                request.getTime()
        );
        return conflictCount > 0;
    }

    private Appointment createNewAppointment(AppointmentRequestInput request) {
        Appointment appointment = new Appointment();
        appointment.setPatient(patientRepository.getReferenceById(request.getPatientId()));
        appointment.setDoctor(doctorRepository.getReferenceById(request.getDoctorId()));
        appointment.setStartTime(request.getTime());
        appointment.setDuration(request.getDurationMinutes());
        appointment.setStatus(Status.PENDING);

        return appointmentRepository.save(appointment);
    }

    @Transactional
    public void cancel(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById (appointmentId)
                .orElseThrow(EntityNotFoundException::new);
        if(appointment.getStatus() != Status.PENDING) {
            throw new IllegalStateException("Wrong status for appointment " + appointmentId);
        }
        appointment.setStatus(Status.CANCELLED);
        appointmentRepository.save(appointment);
    }

}
