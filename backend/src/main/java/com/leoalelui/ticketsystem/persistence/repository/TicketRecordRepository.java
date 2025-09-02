package com.leoalelui.ticketsystem.persistence.repository;

import com.leoalelui.ticketsystem.persistence.entity.TicketRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRecordRepository extends JpaRepository<TicketRecord, Long> {}
