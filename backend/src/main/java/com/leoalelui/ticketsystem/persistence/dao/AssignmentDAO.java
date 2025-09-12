package com.leoalelui.ticketsystem.persistence.dao;

import com.leoalelui.ticketsystem.domain.dto.request.AssignmentCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.AssignmentResponseDTO;
import com.leoalelui.ticketsystem.persistence.entity.AssignmentEntity;
import com.leoalelui.ticketsystem.persistence.mapper.AssignmentMapper;
import com.leoalelui.ticketsystem.persistence.repository.AssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author leonardo Argoty
 */
@Repository
@RequiredArgsConstructor
public class AssignmentDAO {

    private final AssignmentRepository assignmentRepository;
    private final AssignmentMapper assignmentMapper;

    @Transactional
    public AssignmentResponseDTO save(AssignmentCreateDTO createDTO) {
        AssignmentEntity entity = assignmentMapper.toEntity(createDTO);
        AssignmentEntity saved = assignmentRepository.save(entity);
        return assignmentMapper.toDTO(saved);
    }

    @Transactional(readOnly = true)
    public AssignmentResponseDTO getById(Long id) {
        AssignmentEntity entity = assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assignment not found with id: " + id));
        return assignmentMapper.toDTO(entity);
    }

    @Transactional(readOnly = true)
    public List<AssignmentResponseDTO> getAll() {
        return assignmentMapper.toDTOList(assignmentRepository.findAll());
    }

    @Transactional(readOnly = true)
    public List<AssignmentResponseDTO> getByEmployeeId(Long employeeId) {
        return assignmentMapper.toDTOList(assignmentRepository.findByEmployeeId(employeeId));
    }

    @Transactional(readOnly = true)
    public List<AssignmentResponseDTO> getByTicketId(Long ticketId) {
        return assignmentMapper.toDTOList(assignmentRepository.findByTicketId(ticketId));
    }

    @Transactional
    public void deleteById(Long id) {
        if (!assignmentRepository.existsById(id)) {
            throw new RuntimeException("Assignment not found with id: " + id);
        }
        assignmentRepository.deleteById(id);
    }
}
