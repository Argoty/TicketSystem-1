package com.leoalelui.ticketsystem.domain;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.leoalelui.ticketsystem.domain.dto.request.AssignmentCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.request.NotificationCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.AssignmentResponseDTO;
import com.leoalelui.ticketsystem.domain.dto.response.CategoryResponseDTO;
import com.leoalelui.ticketsystem.domain.dto.response.EmployeeResponseDTO;
import com.leoalelui.ticketsystem.domain.dto.response.TicketResponseDTO;
import com.leoalelui.ticketsystem.domain.service.EmployeeService;
import com.leoalelui.ticketsystem.domain.service.NotificationService;
import com.leoalelui.ticketsystem.domain.service.TicketService;
import com.leoalelui.ticketsystem.domain.service.impl.AssignmentServiceImpl;
import com.leoalelui.ticketsystem.persistence.dao.AssignmentDAO;
import com.leoalelui.ticketsystem.persistence.enums.Priority;
import com.leoalelui.ticketsystem.persistence.enums.Role;
import com.leoalelui.ticketsystem.persistence.enums.State;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@DisplayName("AssignmentServiceImpl - Unit Tests (único método ejemplo)")
public class AssignmentServiceTest {
    @Mock
    private AssignmentDAO assignmentDAO;

    @Mock
    private TicketService ticketService;

    @Mock
    private EmployeeService employeeService;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private AssignmentServiceImpl assignmentService;

    // DATOS DE PRUEBA
    private AssignmentCreateDTO validAssignmentCreateDTO;
    private TicketResponseDTO validTicketResponse;
    private EmployeeResponseDTO validAgentResponse;
    private AssignmentResponseDTO expectedAssignmentResponse;
    private CategoryResponseDTO validCategory;
    private Long validTicketId;
    private Long validEmployeeId;

    @BeforeEach
    public void setUp() {
        validTicketId = 1L;
        validEmployeeId = 10L;

        // Categoría válida
        validCategory = new CategoryResponseDTO(
                1L,
                "Soporte Técnico",
                "Problemas técnicos generales");

        // Ticket válido en estado ABIERTO
        validTicketResponse = new TicketResponseDTO(
                validTicketId,
                5L, 
                validCategory,
                "Error en inicio de sesión",
                "El usuario no puede iniciar sesión correctamente",
                Priority.ALTA,
                State.ABIERTO, // Estado inicial
                LocalDateTime.now(),
                null);

        // Empleado válido con rol AGENT
        validAgentResponse = new EmployeeResponseDTO(
                validEmployeeId,
                "Juan Pérez",
                "juan.perez@empresa.com",
                Role.AGENT,
                "Soporte Técnico");

        // DTO de entrada para crear asignación
        validAssignmentCreateDTO = new AssignmentCreateDTO(
                validTicketId,
                validEmployeeId);

        // Respuesta esperada después de crear la asignación
        expectedAssignmentResponse = new AssignmentResponseDTO(
                1L,
                validTicketResponse,
                validAgentResponse,
                LocalDateTime.now());
    }

    @Test
    @DisplayName("CREATE - Asignación válida debe crear asignación y cambiar estado del ticket a EN_PROGRESO")
    void createAssignment_ValidData_ShouldCreateAssignmentAndUpdateTicketState() {
        // ARRANGE (Given) - Preparar el escenario

        // Mock: ticketService devuelve el ticket en estado ABIERTO
        when(ticketService.getTicketById(validTicketId))
                .thenReturn(validTicketResponse);

        // Mock: employeeService devuelve el empleado con rol AGENT
        when(employeeService.getEmployeeById(validEmployeeId))
                .thenReturn(validAgentResponse);

        // Mock: assignmentDAO guarda y retorna la asignación creada
        when(assignmentDAO.save(any(AssignmentCreateDTO.class)))
                .thenReturn(expectedAssignmentResponse);

        // ACT (When) - Ejecutar el método bajo prueba
        AssignmentResponseDTO result = assignmentService.create(validAssignmentCreateDTO);

        // ASSERT (Then) - Verificar los resultados

        // Verificar que el resultado no es null y tiene los datos correctos
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTicket().getId()).isEqualTo(validTicketId);
        assertThat(result.getEmployee().getId()).isEqualTo(validEmployeeId);
        assertThat(result.getEmployee().getRole()).isEqualTo(Role.AGENT);

        // Verificar que se llamaron los métodos correctos en el orden esperado
        verify(ticketService, times(1)).getTicketById(validTicketId);
        verify(employeeService, times(1)).getEmployeeById(validEmployeeId);

        // CRÍTICO: Verificar que se actualizó el estado del ticket a EN_PROGRESO
        verify(ticketService, times(1)).updateState(
                eq(validTicketId),
                argThat(dto -> dto.getState() == State.EN_PROGRESO)
        );

        // Verificar que se enviaron 2 notificaciones (al creador del ticket y al agente)
        verify(notificationService, times(2)).create(any(NotificationCreateDTO.class));

        // Verificar que se guardó la asignación
        verify(assignmentDAO, times(1)).save(any(AssignmentCreateDTO.class));
    }
}
