package com.leoalelui.ticketsystem.persistence.dao;

import com.leoalelui.ticketsystem.domain.dto.request.EvidenceCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.EvidenceResponseDTO;
import com.leoalelui.ticketsystem.persistence.entity.EvidenceEntity;
import com.leoalelui.ticketsystem.persistence.mapper.EvidenceMapper;
import com.leoalelui.ticketsystem.persistence.repository.EvidenceRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Repository
public class EvidenceDAO {
    private final EvidenceRepository evidenceRepository;
    private final EvidenceMapper evidenceMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public EvidenceResponseDTO save (EvidenceCreateDTO dto) {
        EvidenceEntity evidenceEntity = evidenceMapper.toEntity(dto);
        EvidenceEntity savedEvidenceEntity = evidenceRepository.save(evidenceEntity);
        entityManager.flush();
        entityManager.refresh(savedEvidenceEntity);
        return evidenceMapper.toResponseDTO(savedEvidenceEntity);
    }

    public Optional<EvidenceResponseDTO> findById(Long id) {
        return evidenceRepository.findById(id).
                map(evidenceMapper::toResponseDTO);
    }

    public List<EvidenceResponseDTO> findAllByTicketId(Long ticketId) {
        return evidenceMapper.toDTOList(evidenceRepository.findAllByTicket_Id(ticketId));
    }

    public void delete(Long id) {
        evidenceRepository.deleteById(id);
    }
}
