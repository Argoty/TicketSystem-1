package com.leoalelui.ticketsystem.domain.dto.ticket;

import com.leoalelui.ticketsystem.persistence.entity.Category;
import com.leoalelui.ticketsystem.persistence.entity.EmployeeEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
/**
 * 
 * @author Leonardo Argoty
 */
@Data
@AllArgsConstructor
public class TicketResponseDTO {
    private Long id;
    private EmployeeEntity employee;
    private Category category;
    private String title;
    private String description;
    private String priority;
    private String state;
}

