package com.example.educationinterface.service;

import com.example.educationinterface.dto.*;
import com.example.educationinterface.entity.*;
import com.example.educationinterface.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service for student operations: enrollments, materials, assignments, quizzes, results
 */
@Service
@RequiredArgsConstructor
public class StudentService {

    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StudyMaterialRepository studyMaterialRepository;
    private final AssignmentRepository assignmentRepository;
    private final AssignmentSubmissionRepository submissionRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;
    private final AnnouncementRepository announcementRepository;
    private final UserRepository userRepository;

    // ===== COURSES =====

    /**
     * Get all available courses (all courses on the platform)
     */
    public List<CourseDto> getAllCourses() {
        return courseRepository.findAll().stream()
                .map(CourseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Enroll a student in a course
     */
    public String enrollCourse(Long studentId, Long courseId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new RuntimeException("Already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .course(course)
                .build();
        enrollmentRepository.save(enrollment);
        return "Enrolled successfully in: " + course.getCourseName();
    }

    /**
     * Get courses a student is enrolled in
     */
    public List<CourseDto> getEnrolledCourses(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId).stream()
                .map(e -> CourseDto.fromEntity(e.getCourse()))
                .collect(Collectors.toList());
    }

    // ===== STUDY MATERIALS =====

    public List<StudyMaterialDto> getMaterials(Long courseId) {
        return studyMaterialRepository.findByCourseId(courseId).stream()
                .map(StudyMaterialDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ===== ASSIGNMENTS =====

    public List<AssignmentDto> getAssignmentsByCourse(Long courseId) {
        return assignmentRepository.findByCourseId(courseId).stream()
                .map(AssignmentDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Submit an assignment
     */
    public SubmissionDto submitAssignment(Long studentId, Long assignmentId, String fileUrl) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Assignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found"));

        AssignmentSubmission submission = AssignmentSubmission.builder()
                .student(student)
                .assignment(assignment)
                .fileUrl(fileUrl)
                .build();
        return SubmissionDto.fromEntity(submissionRepository.save(submission));
    }

    // ===== QUIZZES =====

    public List<QuizDto> getQuizzesByCourse(Long courseId) {
        return quizRepository.findByCourseId(courseId).stream()
                .map(q -> {
                    QuizDto dto = QuizDto.fromEntity(q);
                    List<QuestionDto> questions = questionRepository.findByQuizId(q.getId())
                            .stream().map(QuestionDto::fromEntity).collect(Collectors.toList());
                    dto.setQuestions(questions);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    /**
     * Submit quiz answers and calculate score
     */
    public Map<String, Object> submitQuiz(Long studentId, QuizSubmitRequest request) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Quiz quiz = quizRepository.findById(request.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        // Check if already attempted
        if (quizResultRepository.findByQuizIdAndStudentId(quiz.getId(), studentId).isPresent()) {
            throw new RuntimeException("Quiz already attempted");
        }

        // Calculate score
        List<Question> questions = questionRepository.findByQuizId(quiz.getId());
        int score = 0;
        for (Question q : questions) {
            String submitted = request.getAnswers().get(q.getId());
            if (submitted != null && submitted.equalsIgnoreCase(q.getCorrectAnswer())) {
                score++;
            }
        }

        QuizResult result = QuizResult.builder()
                .quiz(quiz)
                .student(student)
                .score(score)
                .build();
        quizResultRepository.save(result);

        return Map.of(
            "score", score,
            "total", questions.size(),
            "quizTitle", quiz.getTitle()
        );
    }

    // ===== RESULTS =====

    public List<SubmissionDto> getAssignmentResults(Long studentId) {
        return submissionRepository.findByStudentId(studentId).stream()
                .map(SubmissionDto::fromEntity)
                .collect(Collectors.toList());
    }

    public List<QuizResultDto> getQuizResults(Long studentId) {
        return quizResultRepository.findByStudentId(studentId).stream()
                .map(QuizResultDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ===== ANNOUNCEMENTS =====

    public List<AnnouncementDto> getAnnouncements(Long studentId) {
        return announcementRepository.findAnnouncementsForStudent(studentId).stream()
                .map(AnnouncementDto::fromEntity)
                .collect(Collectors.toList());
    }
}
