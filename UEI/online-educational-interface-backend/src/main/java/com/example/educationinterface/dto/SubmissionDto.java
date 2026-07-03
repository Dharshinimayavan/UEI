package com.example.educationinterface.dto;

import com.example.educationinterface.entity.AssignmentSubmission;
import lombok.*;
import java.time.LocalDateTime;

/**
 * DTO for Assignment Submission data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionDto {
    private Long id;
    private Long assignmentId;
    private String assignmentTitle;
    private Long studentId;
    private String studentName;
    private String fileUrl;
    private Integer marks;
    private LocalDateTime submittedAt;

    public static SubmissionDto fromEntity(AssignmentSubmission s) {
        return SubmissionDto.builder()
                .id(s.getId())
                .assignmentId(s.getAssignment().getId())
                .assignmentTitle(s.getAssignment().getTitle())
                .studentId(s.getStudent().getId())
                .studentName(s.getStudent().getName())
                .fileUrl(s.getFileUrl())
                .marks(s.getMarks())
                .submittedAt(s.getSubmittedAt())
                .build();
    }
}
