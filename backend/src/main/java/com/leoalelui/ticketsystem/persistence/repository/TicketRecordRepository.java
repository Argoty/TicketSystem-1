package com.leoalelui.ticketsystem.persistence.repository;

import com.leoalelui.ticketsystem.persistence.entity.TicketRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRecordRepository extends JpaRepository<TicketRecordEntity, Long> {}
