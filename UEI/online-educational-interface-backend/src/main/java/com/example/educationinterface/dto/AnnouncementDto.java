package com.example.educationinterface.dto;

import com.example.educationinterface.entity.Announcement;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

/**
 * DTO for Announcement data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementDto {
    private Long id;
    private Long courseId;
    private String courseName;

    @NotBlank
    private String title;

    private String message;
    private LocalDateTime createdAt;

    public static AnnouncementDto fromEntity(Announcement a) {
        return AnnouncementDto.builder()
                .id(a.getId())
                .courseId(a.getCourse() != null ? a.getCourse().getId() : null)
                .courseName(a.getCourse() != null ? a.getCourse().getCourseName() : null)
                .title(a.getTitle())
                .message(a.getMessage())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
