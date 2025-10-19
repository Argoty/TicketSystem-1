package com.leoalelui.ticketsystem.domain.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "DTO para devolver la información de la evidencia")
public class EvidenceResponseDTO {

    @Schema(description = "ID de la evidencia", example = "10")
    private Long id;

    @Schema(description = "Resumen del ticket asociado a la evidencia", example = "1")
    private TicketResponseDTO ticket;

    @Schema(description = "URL de la imagen de evidencia", example = "https://example.com/evidence1.png")
    private String url;
}
