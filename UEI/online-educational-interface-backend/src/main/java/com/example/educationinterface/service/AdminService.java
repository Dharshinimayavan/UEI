package com.example.educationinterface.service;

import com.example.educationinterface.dto.DashboardDto;
import com.example.educationinterface.dto.UserDto;
import com.example.educationinterface.entity.User;
import com.example.educationinterface.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for admin operations: dashboard, user management, reports
 */
@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final AssignmentRepository assignmentRepository;
    private final QuizRepository quizRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Get platform statistics for admin dashboard
     */
    public DashboardDto getDashboard() {
        return DashboardDto.builder()
                .totalStudents(userRepository.countByRole(User.Role.STUDENT))
                .totalTeachers(userRepository.countByRole(User.Role.TEACHER))
                .totalCourses(courseRepository.count())
                .totalAssignments(assignmentRepository.count())
                .totalQuizzes(quizRepository.count())
                .build();
    }

    /**
     * Get all users
     */
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Create a new user (admin can create any role)
     */
    public UserDto createUser(UserDto dto, String password, String role) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists: " + dto.getEmail());
        }
        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(passwordEncoder.encode(password))
                .role(User.Role.valueOf(role))
                .build();
        return UserDto.fromEntity(userRepository.save(user));
    }

    /**
     * Update an existing user
     */
    public UserDto updateUser(Long id, UserDto dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        if (dto.getRole() != null) {
            user.setRole(User.Role.valueOf(dto.getRole()));
        }
        return UserDto.fromEntity(userRepository.save(user));
    }

    /**
     * Delete a user by ID
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    /**
     * Get platform reports
     */
    public Map<String, Object> getReports() {
        return Map.of(
            "totalStudents", userRepository.countByRole(User.Role.STUDENT),
            "totalTeachers", userRepository.countByRole(User.Role.TEACHER),
            "totalCourses", courseRepository.count(),
            "totalAssignments", assignmentRepository.count(),
            "totalQuizzes", quizRepository.count(),
            "totalEnrollments", enrollmentRepository.count()
        );
    }
}
