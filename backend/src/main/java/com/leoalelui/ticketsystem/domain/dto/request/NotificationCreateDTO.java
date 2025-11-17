package com.leoalelui.ticketsystem.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO de creación para notificaciones
 * 
 * @author Leonardo Argoty
 */
@Data
@AllArgsConstructor
@Schema(description = "Datos para crear una nueva notificación")
public class NotificationCreateDTO {
    @NotBlank(message="El mensaje no puede ser nulo o vacío")
    @Schema(description="Mensaje que contiene la información sobre la notificación", example="Se acaba de asignar el ticket 'x' a un empleado 'y'")
    private String message;
    
    @Schema(description="ID del empleado al cual se le crea la notificación", example="123")
    @NotNull(message="El id del empleado no puede ser nulo")
    private Long employeeId;
}
