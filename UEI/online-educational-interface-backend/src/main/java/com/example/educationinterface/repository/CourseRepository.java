package com.example.educationinterface.repository;

import com.example.educationinterface.entity.Course;
import com.example.educationinterface.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTeacher(User teacher);
    List<Course> findByTeacherId(Long teacherId);
}
