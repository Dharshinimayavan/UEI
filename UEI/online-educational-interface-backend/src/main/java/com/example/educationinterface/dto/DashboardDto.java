package com.example.educationinterface.dto;

import lombok.*;

/**
 * DTO for Admin Dashboard statistics
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDto {
    private long totalStudents;
    private long totalTeachers;
    private long totalCourses;
    private long totalAssignments;
    private long totalQuizzes;
}
