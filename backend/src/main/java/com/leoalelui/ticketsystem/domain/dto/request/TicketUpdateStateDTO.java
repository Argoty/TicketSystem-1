package com.leoalelui.ticketsystem.domain.dto.request;

import com.leoalelui.ticketsystem.persistence.enums.State;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TicketUpdateStateDTO {
    @NotNull(message = "El estado no puede ser nulo o vacio")
    private State state;
}
