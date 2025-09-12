package com.leoalelui.ticketsystem.domain.service;

import com.leoalelui.ticketsystem.domain.dto.request.AssignmentCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.AssignmentResponseDTO;
import java.util.List;

/**
 *
 * @author leonardo Argoty
 */
public interface AssignmentService {
    AssignmentResponseDTO create(AssignmentCreateDTO assignmentCreateDTO);
    
    AssignmentResponseDTO getById(Long id);
    
    List<AssignmentResponseDTO> getAll();
    
    List<AssignmentResponseDTO> getByEmployeeId(Long employeeId);
    
    List<AssignmentResponseDTO> getByTicketId(Long ticketId);
    
    void delete(Long id);
}
