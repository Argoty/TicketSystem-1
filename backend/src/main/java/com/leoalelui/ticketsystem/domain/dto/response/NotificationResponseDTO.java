package com.leoalelui.ticketsystem.domain.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO de respuesta de una notificación
 *
 * @author Leonardo Argoty
 */
@Data
@AllArgsConstructor
@Schema(description = "Datos de respuesta que representan una notificación")
public class NotificationResponseDTO {
    @Schema(description = "ID unico de la notificación", example = "45")
    private Long id;

    @Schema(description = "Mensaje con la información de la notificación")
    private String message;

    @Schema(description = "Fecha y hora de creación de la notificación", example = "2025-09-10T14:30:00")
    private LocalDateTime creationDate;

    @Schema(description = "Indica si la notificación ya fue leída", example = "false o true")
    private boolean isRead;
}
