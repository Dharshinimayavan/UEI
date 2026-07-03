package com.example.educationinterface.dto;

import com.example.educationinterface.entity.Quiz;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.util.List;

/**
 * DTO for Quiz data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizDto {
    private Long id;
    private Long courseId;
    private String courseName;

    @NotBlank
    private String title;

    private Integer duration;
    private List<QuestionDto> questions;

    public static QuizDto fromEntity(Quiz quiz) {
        return QuizDto.builder()
                .id(quiz.getId())
                .courseId(quiz.getCourse().getId())
                .courseName(quiz.getCourse().getCourseName())
                .title(quiz.getTitle())
                .duration(quiz.getDuration())
                .build();
    }
}
