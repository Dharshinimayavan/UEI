package com.example.educationinterface.dto;

import com.example.educationinterface.entity.Course;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

/**
 * DTO for Course data transfer
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDto {
    private Long id;

    @NotBlank
    private String courseName;

    private String description;
    private Long teacherId;
    private String teacherName;

    public static CourseDto fromEntity(Course course) {
        return CourseDto.builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .description(course.getDescription())
                .teacherId(course.getTeacher().getId())
                .teacherName(course.getTeacher().getName())
                .build();
    }
}
