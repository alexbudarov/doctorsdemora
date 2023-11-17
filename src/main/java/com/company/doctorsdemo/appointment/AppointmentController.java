package com.company.doctorsdemo.appointment;

import com.amplicode.core.graphql.annotation.GraphQLId;
import com.amplicode.core.graphql.paging.OffsetPageInput;
import com.amplicode.core.graphql.paging.ResultPage;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class AppointmentController {
    private final AppointmentRepository crudRepository;

    public AppointmentController(AppointmentRepository crudRepository) {
        this.crudRepository = crudRepository;
    }

    @QueryMapping(name = "appointmentList")
    @Transactional(readOnly = true)
    @NonNull
    public ResultPage<Appointment> findAll(
            @Argument AppointmentFilter filter,
            @Argument("sort") List<AppointmentOrderByInput> sortInput,
            @Argument("page") OffsetPageInput pageInput
    ) {
        Specification<Appointment> specification = createFilter(filter);
        Pageable page = Optional.ofNullable(pageInput)
                .map(p -> PageRequest.of(p.getNumber(), p.getSize()).withSort(createSort(sortInput)))
                .orElseGet(() -> PageRequest.ofSize(20).withSort(createSort(sortInput)));
        Page<Appointment> pageData = crudRepository.findAll(specification, page);
        return ResultPage.page(pageData.getContent(), pageData.getTotalElements());
    }

    @QueryMapping(name = "appointment")
    @Transactional(readOnly = true)
    @NonNull
    public Appointment findById(@GraphQLId @Argument @NonNull Long id) {
        return crudRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Unable to find entity by id: %s ", id)));
    }

    protected Sort createSort(List<AppointmentOrderByInput> sortInput) {
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
                        case DOCTOR_FIRST_NAME:
                            return Sort.Order.by("doctor.firstName").with(direction);
                        case PATIENT_FIRST_NAME:
                            return Sort.Order.by("patient.firstName").with(direction);
                        case START_TIME:
                            return Sort.Order.by("startTime").with(direction);
                        default:
                            return null;
                    }
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        return Sort.by(orders);
    }

    static class AppointmentOrderByInput {
        private AppointmentOrderByProperty property;
        private SortDirection direction;

        public AppointmentOrderByProperty getProperty() {
            return property;
        }

        public void setProperty(AppointmentOrderByProperty property) {
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

    public enum AppointmentOrderByProperty {
        DOCTOR_FIRST_NAME,
        PATIENT_FIRST_NAME,
        START_TIME
    }

    protected Specification<Appointment> createFilter(AppointmentFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (filter != null) {
                if (filter.doctorLastName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("doctor").get("lastName")), "%" + filter.doctorLastName.toLowerCase() + "%"));
                }
                if (filter.patientLastName != null) {
                    predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("patient").get("lastName")), "%" + filter.patientLastName.toLowerCase() + "%"));
                }
                if (filter.startTimeMin != null) {
                    predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startTime"), filter.startTimeMin));
                }
                if (filter.startTimeMax != null) {
                    predicates.add(criteriaBuilder.lessThan(root.get("startTime"), filter.startTimeMax));
                }
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    static class AppointmentFilter {
        private String doctorLastName;
        private String patientLastName;
        private LocalDateTime startTimeMin;
        private LocalDateTime startTimeMax;

        public String getDoctorLastName() {
            return doctorLastName;
        }

        public void setDoctorLastName(String doctorLastName) {
            this.doctorLastName = doctorLastName;
        }

        public String getPatientLastName() {
            return patientLastName;
        }

        public void setPatientLastName(String patientLastName) {
            this.patientLastName = patientLastName;
        }

        public LocalDateTime getStartTimeMin() {
            return startTimeMin;
        }

        public void setStartTimeMin(LocalDateTime startTimeMin) {
            this.startTimeMin = startTimeMin;
        }

        public LocalDateTime getStartTimeMax() {
            return startTimeMax;
        }

        public void setStartTimeMax(LocalDateTime startTimeMax) {
            this.startTimeMax = startTimeMax;
        }
    }
}