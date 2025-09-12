package com.leoalelui.ticketsystem.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * @Author: alej0nt
 */

@Data
@Entity
@Table (name = "evidence")
public class EvidenceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn (name = "ticket_id", nullable = false)
    private TicketEntity ticket;

    private String url;

}
