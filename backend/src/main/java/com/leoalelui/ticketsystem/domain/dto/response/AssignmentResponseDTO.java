package com.leoalelui.ticketsystem.domain.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * 
 * @author Leonardo Argoty
 */
@Data
@AllArgsConstructor
@Schema(description = "Representación completa de una asignación")
public class AssignmentResponseDTO {

    @Schema(description = "ID único de la asignación", example = "10", accessMode = Schema.AccessMode.READ_ONLY)
    private Long id;

    @Schema(description = "Resumen del ticket asignado")
    private TicketResponseDTO ticket;

    @Schema(description = "Resumen del empleado agente asignado")
    private EmployeeResponseDTO employee;

    @Schema(description = "Fecha y hora de la asignación", example = "2025-09-09T10:30:00", accessMode = Schema.AccessMode.READ_ONLY)
    private LocalDateTime assignmentDate;
}


