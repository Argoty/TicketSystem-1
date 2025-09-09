package com.leoalelui.ticketsystem.domain.dto.assignment;

import com.leoalelui.ticketsystem.persistence.entity.EmployeeEntity;
import com.leoalelui.ticketsystem.persistence.entity.Ticket;
import java.time.LocalDateTime;
import lombok.Data;

/**
 * 
 * @author Leonardo Argoty
 */

@Data
public class AssignmentResponseDTO {
    private Long id;

    private Ticket ticket;
    private EmployeeEntity employee;
    private LocalDateTime assignment_date;
}

