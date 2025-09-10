/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.leoalelui.ticketsystem.presentation.controller;

import com.leoalelui.ticketsystem.domain.dto.request.AssignmentCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.AssignmentResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author leona
 */
@RestController
@AllArgsConstructor
@RequestMapping("api/assignment")
public class AssignmentController {
    PostMapping
    public ResponseEntity<AssignmentResponseDTO> createAssignment(@RequestBody AssignmentCreateDTO assignmentDTO) {
        return ResponseEntity.ok(null)
        
    }
}
