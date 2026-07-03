package com.example.educationinterface.repository;

import com.example.educationinterface.entity.Enrollment;
import com.example.educationinterface.entity.User;
import com.example.educationinterface.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(User student);
    List<Enrollment> findByStudentId(Long studentId);
    List<Enrollment> findByCourseId(Long courseId);
    boolean existsByStudentAndCourse(User student, Course course);
    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);
}
