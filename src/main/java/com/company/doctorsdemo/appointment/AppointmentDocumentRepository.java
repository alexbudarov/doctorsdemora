package com.company.doctorsdemo.appointment;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface AppointmentDocumentRepository extends ElasticsearchRepository<AppointmentDocument, Long> {

}