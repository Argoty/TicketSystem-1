package com.leoalelui.ticketsystem.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "employee_id", nullable = false)
    private EmployeeEntity employee;
    
    @ManyToOne()
    @JoinColumn(name = "category_id", nullable = false)
    private Category categor;

    private String title;

    private String description;

    private String priority;

    private String state;
}
