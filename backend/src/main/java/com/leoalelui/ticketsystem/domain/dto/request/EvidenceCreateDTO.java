package com.leoalelui.ticketsystem.domain.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Schema(description = "DTO para crear nueva evidencia.")
public class EvidenceCreateDTO {

    @Schema(description = "ID del ticket que se creara la evidencia", example = "1")
    @NotNull(message = "La ID del ticket es obligatoria")
    private Long ticketId;

    @Schema(description = "URL de la imagen de evidencia", example = "https://example.com/evidence1.png")
    @NotBlank(message = "La URL de evidencia no puede estar vacia")
    private String url;

}
