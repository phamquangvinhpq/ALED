package com.ALED.DTO.Exam;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ALED.DTO.Pagination.PaginationDetails;

import lombok.Data;

@Data
public class PageResult {
    private List<Object> data;

    private PaginationDetails paginationDetails;

    public PageResult(Page page) {
        this.data = page.getContent();
        paginationDetails = new PaginationDetails(page);
    }
}
