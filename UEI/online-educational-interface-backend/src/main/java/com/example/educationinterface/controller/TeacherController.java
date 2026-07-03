package com.example.educationinterface.controller;

import com.example.educationinterface.dto.*;
import com.example.educationinterface.repository.UserRepository;
import com.example.educationinterface.service.TeacherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
 * REST controller for Teacher operations
 */
@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
@PreAuthorize("hasRole('TEACHER')")
public class TeacherController {

    private final TeacherService teacherService;
    private final UserRepository userRepository;

    // Helper: get teacher ID from JWT principal
    private Long getTeacherId(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Teacher not found"))
                .getId();
    }

    // ===== COURSES =====

    @GetMapping("/courses")
    public ResponseEntity<List<CourseDto>> getCourses(Principal principal) {
        return ResponseEntity.ok(teacherService.getTeacherCourses(getTeacherId(principal)));
    }

    @PostMapping("/courses")
    public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto dto, Principal principal) {
        return ResponseEntity.ok(teacherService.createCourse(dto, getTeacherId(principal)));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<CourseDto> updateCourse(@PathVariable Long id,
                                                   @RequestBody CourseDto dto,
                                                   Principal principal) {
        return ResponseEntity.ok(teacherService.updateCourse(id, dto, getTeacherId(principal)));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Map<String, String>> deleteCourse(@PathVariable Long id, Principal principal) {
        teacherService.deleteCourse(id, getTeacherId(principal));
        return ResponseEntity.ok(Map.of("message", "Course deleted successfully"));
    }

    // ===== STUDY MATERIALS =====

    @PostMapping("/materials")
    public ResponseEntity<StudyMaterialDto> addMaterial(@RequestBody StudyMaterialDto dto, Principal principal) {
        return ResponseEntity.ok(teacherService.addMaterial(dto, getTeacherId(principal)));
    }

    // ===== ASSIGNMENTS =====

    @PostMapping("/assignments")
    public ResponseEntity<AssignmentDto> createAssignment(@RequestBody AssignmentDto dto, Principal principal) {
        return ResponseEntity.ok(teacherService.createAssignment(dto, getTeacherId(principal)));
    }

    @GetMapping("/submissions")
    public ResponseEntity<List<SubmissionDto>> getSubmissions(Principal principal) {
        return ResponseEntity.ok(teacherService.getSubmissions(getTeacherId(principal)));
    }

    @PutMapping("/submissions/{id}/marks")
    public ResponseEntity<SubmissionDto> updateMarks(@PathVariable Long id,
                                                      @RequestBody Map<String, Integer> body) {
        return ResponseEntity.ok(teacherService.updateMarks(id, body.get("marks")));
    }

    // ===== QUIZZES =====

    @PostMapping("/quizzes")
    public ResponseEntity<QuizDto> createQuiz(@RequestBody QuizDto dto, Principal principal) {
        return ResponseEntity.ok(teacherService.createQuiz(dto, getTeacherId(principal)));
    }

    @PostMapping("/questions")
    public ResponseEntity<QuestionDto> addQuestion(@RequestBody QuestionDto dto) {
        return ResponseEntity.ok(teacherService.addQuestion(dto));
    }

    // ===== PERFORMANCE =====

    @GetMapping("/performance")
    public ResponseEntity<List<SubmissionDto>> getPerformance(Principal principal) {
        return ResponseEntity.ok(teacherService.getStudentPerformance(getTeacherId(principal)));
    }

    // ===== ANNOUNCEMENTS =====

    @PostMapping("/announcements")
    public ResponseEntity<AnnouncementDto> createAnnouncement(@RequestBody AnnouncementDto dto,
                                                               Principal principal) {
        return ResponseEntity.ok(teacherService.createAnnouncement(dto, getTeacherId(principal)));
    }
}
