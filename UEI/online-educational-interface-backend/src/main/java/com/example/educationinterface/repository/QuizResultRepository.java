package com.example.educationinterface.repository;

import com.example.educationinterface.entity.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByStudentId(Long studentId);
    List<QuizResult> findByQuizId(Long quizId);
    Optional<QuizResult> findByQuizIdAndStudentId(Long quizId, Long studentId);
}
