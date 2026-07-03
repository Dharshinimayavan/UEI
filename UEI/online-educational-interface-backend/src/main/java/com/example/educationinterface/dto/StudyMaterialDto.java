package com.example.educationinterface.dto;

import com.example.educationinterface.entity.StudyMaterial;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

/**
 * DTO for Study Material
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyMaterialDto {
    private Long id;
    private Long courseId;
    private String courseName;

    @NotBlank
    private String title;

    private String fileUrl;
    private LocalDateTime uploadedAt;

    public static StudyMaterialDto fromEntity(StudyMaterial sm) {
        return StudyMaterialDto.builder()
                .id(sm.getId())
                .courseId(sm.getCourse().getId())
                .courseName(sm.getCourse().getCourseName())
                .title(sm.getTitle())
                .fileUrl(sm.getFileUrl())
                .uploadedAt(sm.getUploadedAt())
                .build();
    }
}
