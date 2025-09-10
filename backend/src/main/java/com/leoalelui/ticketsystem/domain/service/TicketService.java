package com.leoalelui.ticketsystem.domain.service;

import com.leoalelui.ticketsystem.domain.dto.request.TicketCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.request.TicketUpdateStateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.TicketResponseDTO;

import java.util.List;

public interface TicketService {
    TicketResponseDTO createTicket(TicketCreateDTO ticketCreateDTO);
    TicketResponseDTO updateState(Long id, TicketUpdateStateDTO ticketUpdateStateDTO);
    void deleteTicket(Long id);
    TicketResponseDTO getTicketById(Long id);
    List<TicketResponseDTO> getAllTickets();
    List<TicketResponseDTO> getTicketsByState(String state);
}
