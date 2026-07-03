package com.example.educationinterface.dto;

import com.example.educationinterface.entity.Question;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

/**
 * DTO for Question data
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionDto {
    private Long id;
    private Long quizId;

    @NotBlank
    private String questionText;

    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;

    public static QuestionDto fromEntity(Question q) {
        return QuestionDto.builder()
                .id(q.getId())
                .quizId(q.getQuiz().getId())
                .questionText(q.getQuestionText())
                .optionA(q.getOptionA())
                .optionB(q.getOptionB())
                .optionC(q.getOptionC())
                .optionD(q.getOptionD())
                .correctAnswer(q.getCorrectAnswer())
                .build();
    }
}
