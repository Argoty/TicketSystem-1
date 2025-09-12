package com.leoalelui.ticketsystem.domain.service.impl;

import com.leoalelui.ticketsystem.domain.dto.request.AssignmentCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.AssignmentResponseDTO;

import com.leoalelui.ticketsystem.domain.service.AssignmentService;
import com.leoalelui.ticketsystem.persistence.dao.AssignmentDAO;
import com.leoalelui.ticketsystem.persistence.dao.EmployeeDAO;
import com.leoalelui.ticketsystem.persistence.dao.TicketDAO;
import com.leoalelui.ticketsystem.persistence.entity.EmployeeEntity;
import com.leoalelui.ticketsystem.persistence.entity.TicketEntity;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 *
 * @author leonardo Argoty
 */
@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl implements AssignmentService{
    private final AssignmentDAO assignmentDAO;
    private final TicketDAO ticketDAO;
    private final EmployeeDAO employeeDAO;
    
    @Override
    public AssignmentResponseDTO create(AssignmentCreateDTO assignmentCreateDTO){
        Long ticketId = assignmentCreateDTO.getTicketId();
        Long employeeId = assignmentCreateDTO.getEmployeeId();

        // Verifica existencia del ticket (posible modificación despues)
        TicketEntity ticket;
        try {
            ticket = ticketDAO.findById(ticketId).get();
        } catch (RuntimeException ex) {
            throw new RuntimeException("Ticket no encontrado con id: " + ticketId);
        }

        // Verifica existencia del empleado (posible modificación despues)
        EmployeeEntity employee;
        try {
            employee = employeeDAO.findById(employeeId).get();
        } catch (RuntimeException ex) {
            throw new RuntimeException("Empleado no encontrado con id: " + employeeId);
        }

        // Valida rol del empleado (debe ser agente)
        String role = employee.getRole() != null ? employee.getRole().toString() : null;
        if (role == null || !(role.equalsIgnoreCase("AGENTE"))) {
            throw new RuntimeException("El empleado con id " + employeeId + " no tiene el rol de AGENTE.");
        }

        // Valida que el ticket no esté cerrado/resuelto
        String ticketState = ticket.getState() != null ? ticket.getState().toString() : null;
        if (ticketState != null) {
            String s = ticketState.trim().toLowerCase();
            if (s.equals("resuelto") || s.equals("cerrado")) {
                throw new RuntimeException("No se puede asignar un ticket en estado finalizado (" + ticketState + ").");
            }
        }

        return assignmentDAO.save(assignmentCreateDTO);
    };
    
    @Override
    public AssignmentResponseDTO getById(Long id) {
        return assignmentDAO.getById(id);
    };
    
    @Override
    public List<AssignmentResponseDTO> getAll(){
        return assignmentDAO.getAll();
    };
    
    @Override
    public List<AssignmentResponseDTO> getByEmployeeId(Long employeeId){
        return assignmentDAO.getByEmployeeId(employeeId);
    };
    
    @Override
    public List<AssignmentResponseDTO> getByTicketId(Long ticketId){
        return assignmentDAO.getByTicketId(ticketId);
    };
    
    @Override
    public void delete(Long id) {
        assignmentDAO.deleteById(id);
    };
}
