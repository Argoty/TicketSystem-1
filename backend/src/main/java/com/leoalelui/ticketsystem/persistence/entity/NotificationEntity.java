package com.leoalelui.ticketsystem.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

/**
 *
 * @author leona
 */
@Data
@Entity
@Table(name="notification")
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String message;
    
    @Column(name="is_read")
    private boolean isRead;
    
    @CreationTimestamp
    @Column(name="creation_date", nullable = false, updatable = false)
    private LocalDateTime creationDate;
    
    @ManyToOne
    @JoinColumn(name="employee_id", nullable=false)
    private EmployeeEntity employee;
}
