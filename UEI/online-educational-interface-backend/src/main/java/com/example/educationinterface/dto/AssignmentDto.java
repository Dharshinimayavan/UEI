package com.example.educationinterface.dto;

import com.example.educationinterface.entity.Assignment;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

/**
 * DTO for Assignment data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentDto {
    private Long id;
    private Long courseId;
    private String courseName;

    @NotBlank
    private String title;

    private String description;
    private LocalDateTime dueDate;

    public static AssignmentDto fromEntity(Assignment a) {
        return AssignmentDto.builder()
                .id(a.getId())
                .courseId(a.getCourse().getId())
                .courseName(a.getCourse().getCourseName())
                .title(a.getTitle())
                .description(a.getDescription())
                .dueDate(a.getDueDate())
                .build();
    }
}
