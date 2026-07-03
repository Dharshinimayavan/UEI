package com.example.educationinterface.controller;

import com.example.educationinterface.dto.*;
import com.example.educationinterface.repository.UserRepository;
import com.example.educationinterface.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

/**
 * REST controller for Student operations
 */
@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    private final StudentService studentService;
    private final UserRepository userRepository;

    // Helper: get student ID from JWT principal
    private Long getStudentId(Principal principal) {
        return userRepository.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("Student not found"))
                .getId();
    }

    // ===== COURSES =====

    @GetMapping("/courses")
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        return ResponseEntity.ok(studentService.getAllCourses());
    }

    @GetMapping("/courses/enrolled")
    public ResponseEntity<List<CourseDto>> getEnrolledCourses(Principal principal) {
        return ResponseEntity.ok(studentService.getEnrolledCourses(getStudentId(principal)));
    }

    @PostMapping("/enroll/{courseId}")
    public ResponseEntity<Map<String, String>> enroll(@PathVariable Long courseId, Principal principal) {
        String msg = studentService.enrollCourse(getStudentId(principal), courseId);
        return ResponseEntity.ok(Map.of("message", msg));
    }

    // ===== STUDY MATERIALS =====

    @GetMapping("/materials/{courseId}")
    public ResponseEntity<List<StudyMaterialDto>> getMaterials(@PathVariable Long courseId) {
        return ResponseEntity.ok(studentService.getMaterials(courseId));
    }

    // ===== ASSIGNMENTS =====

    @GetMapping("/assignments/{courseId}")
    public ResponseEntity<List<AssignmentDto>> getAssignments(@PathVariable Long courseId) {
        return ResponseEntity.ok(studentService.getAssignmentsByCourse(courseId));
    }

    @PostMapping("/assignments/submit")
    public ResponseEntity<SubmissionDto> submitAssignment(@RequestBody Map<String, Object> body,
                                                           Principal principal) {
        Long assignmentId = Long.valueOf(body.get("assignmentId").toString());
        String fileUrl = (String) body.get("fileUrl");
        return ResponseEntity.ok(studentService.submitAssignment(getStudentId(principal), assignmentId, fileUrl));
    }

    // ===== QUIZZES =====

    @GetMapping("/quizzes/{courseId}")
    public ResponseEntity<List<QuizDto>> getQuizzes(@PathVariable Long courseId) {
        return ResponseEntity.ok(studentService.getQuizzesByCourse(courseId));
    }

    @PostMapping("/quizzes/submit")
    public ResponseEntity<Map<String, Object>> submitQuiz(@RequestBody QuizSubmitRequest request,
                                                           Principal principal) {
        return ResponseEntity.ok(studentService.submitQuiz(getStudentId(principal), request));
    }

    // ===== RESULTS =====

    @GetMapping("/results")
    public ResponseEntity<Map<String, Object>> getResults(Principal principal) {
        Long studentId = getStudentId(principal);
        return ResponseEntity.ok(Map.of(
            "assignmentResults", studentService.getAssignmentResults(studentId),
            "quizResults", studentService.getQuizResults(studentId)
        ));
    }

    // ===== ANNOUNCEMENTS =====

    @GetMapping("/announcements")
    public ResponseEntity<List<AnnouncementDto>> getAnnouncements(Principal principal) {
        return ResponseEntity.ok(studentService.getAnnouncements(getStudentId(principal)));
    }
}
