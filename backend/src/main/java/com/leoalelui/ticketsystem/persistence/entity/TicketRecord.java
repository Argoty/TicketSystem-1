package com.leoalelui.ticketsystem.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class TicketRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "previus_state")
    private String previusState;

    @Column(name = "next_state")
    private String nextState;

    @Column(name = "change_date")
    private LocalDate changeDate;

}
