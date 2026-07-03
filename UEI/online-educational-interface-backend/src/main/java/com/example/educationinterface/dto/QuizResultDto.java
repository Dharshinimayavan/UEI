package com.example.educationinterface.dto;

import com.example.educationinterface.entity.QuizResult;
import lombok.*;
import java.time.LocalDateTime;

/**
 * DTO for QuizResult — avoids lazy-loading serialization issues
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultDto {
    private Long id;
    private Long quizId;
    private String quizTitle;
    private Long studentId;
    private String studentName;
    private Integer score;
    private LocalDateTime attemptedAt;

    public static QuizResultDto fromEntity(QuizResult r) {
        return QuizResultDto.builder()
                .id(r.getId())
                .quizId(r.getQuiz().getId())
                .quizTitle(r.getQuiz().getTitle())
                .studentId(r.getStudent().getId())
                .studentName(r.getStudent().getName())
                .score(r.getScore())
                .attemptedAt(r.getAttemptedAt())
                .build();
    }
}
