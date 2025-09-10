package com.leoalelui.ticketsystem.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TicketUpdateStateDTO {
    @NotBlank(message = "El estado no puede estar vacío")
    private String state;
}
