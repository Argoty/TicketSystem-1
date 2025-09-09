package com.leoalelui.ticketsystem.domain.service;

import com.leoalelui.ticketsystem.domain.dto.category.CategoryCreateDTO;
import com.leoalelui.ticketsystem.domain.dto.category.CategoryResponseDTO;

/**
 * @author: alej0nt
 */
public interface CategoryService {
    CategoryResponseDTO save (CategoryCreateDTO categoryCreateDTO);
}
