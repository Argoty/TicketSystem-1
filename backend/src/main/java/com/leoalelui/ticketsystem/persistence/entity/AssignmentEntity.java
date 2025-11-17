package com.leoalelui.ticketsystem.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

/**
 *
 * @author leonardo argoty
 */
@Data
@Entity
@Table(name = "assignment")
public class AssignmentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private TicketEntity ticket;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    private EmployeeEntity employee;

    @CreationTimestamp
    @Column(name = "assignment_date", nullable = false, updatable = false)
    private LocalDateTime assignmentDate;
}

