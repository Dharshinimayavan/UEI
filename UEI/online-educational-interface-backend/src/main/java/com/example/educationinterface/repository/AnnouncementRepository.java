package com.example.educationinterface.repository;

import com.example.educationinterface.entity.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByCourseId(Long courseId);

    // Get announcements for courses a student is enrolled in
    @Query("SELECT a FROM Announcement a WHERE a.course.id IN " +
           "(SELECT e.course.id FROM Enrollment e WHERE e.student.id = :studentId)")
    List<Announcement> findAnnouncementsForStudent(Long studentId);
}
