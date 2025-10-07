package com.leoalelui.ticketsystem.domain.service;

import com.leoalelui.ticketsystem.domain.dto.request.CategoryCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.request.CategoryUpdateDTO;
import com.leoalelui.ticketsystem.domain.dto.response.CategoryResponseDTO;

/**
 * @author: alej0nt
 */
public interface CategoryService {
    CategoryResponseDTO save (CategoryCreateDTO categoryCreateDTO);
    void delete(Long id);
    CategoryResponseDTO update(Long id, CategoryUpdateDTO categoryUpdateDTO);
}
