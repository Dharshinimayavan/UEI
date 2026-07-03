package com.example.educationinterface.dto;

import lombok.Data;
import java.util.Map;

/**
 * DTO for quiz submission - maps questionId to selected answer
 */
@Data
public class QuizSubmitRequest {
    private Long quizId;
    // key: questionId, value: selected option ("A", "B", "C", or "D")
    private Map<Long, String> answers;
}
