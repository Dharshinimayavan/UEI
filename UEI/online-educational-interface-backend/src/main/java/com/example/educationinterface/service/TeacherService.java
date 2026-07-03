package com.example.educationinterface.service;

import com.example.educationinterface.dto.*;
import com.example.educationinterface.entity.*;
import com.example.educationinterface.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for teacher operations: courses, materials, assignments, quizzes
 */
@Service
@RequiredArgsConstructor
public class TeacherService {

    private final CourseRepository courseRepository;
    private final StudyMaterialRepository studyMaterialRepository;
    private final AssignmentRepository assignmentRepository;
    private final AssignmentSubmissionRepository submissionRepository;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final AnnouncementRepository announcementRepository;

    // ===== COURSE MANAGEMENT =====

    public CourseDto createCourse(CourseDto dto, Long teacherId) {
        User teacher = userRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        Course course = Course.builder()
                .courseName(dto.getCourseName())
                .description(dto.getDescription())
                .teacher(teacher)
                .build();
        return CourseDto.fromEntity(courseRepository.save(course));
    }

    public CourseDto updateCourse(Long courseId, CourseDto dto, Long teacherId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (!course.getTeacher().getId().equals(teacherId)) {
            throw new RuntimeException("Unauthorized: Not your course");
        }
        course.setCourseName(dto.getCourseName());
        course.setDescription(dto.getDescription());
        return CourseDto.fromEntity(courseRepository.save(course));
    }

    public void deleteCourse(Long courseId, Long teacherId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (!course.getTeacher().getId().equals(teacherId)) {
            throw new RuntimeException("Unauthorized: Not your course");
        }
        courseRepository.delete(course);
    }

    public List<CourseDto> getTeacherCourses(Long teacherId) {
        return courseRepository.findByTeacherId(teacherId).stream()
                .map(CourseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ===== STUDY MATERIALS =====

    public StudyMaterialDto addMaterial(StudyMaterialDto dto, Long teacherId) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (!course.getTeacher().getId().equals(teacherId)) {
            throw new RuntimeException("Unauthorized: Not your course");
        }
        StudyMaterial material = StudyMaterial.builder()
                .course(course)
                .title(dto.getTitle())
                .fileUrl(dto.getFileUrl())
                .build();
        return StudyMaterialDto.fromEntity(studyMaterialRepository.save(material));
    }

    // ===== ASSIGNMENTS =====

    public AssignmentDto createAssignment(AssignmentDto dto, Long teacherId) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (!course.getTeacher().getId().equals(teacherId)) {
            throw new RuntimeException("Unauthorized: Not your course");
        }
        Assignment assignment = Assignment.builder()
                .course(course)
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .build();
        return AssignmentDto.fromEntity(assignmentRepository.save(assignment));
    }

    public List<SubmissionDto> getSubmissions(Long teacherId) {
        return submissionRepository.findByTeacherId(teacherId).stream()
                .map(SubmissionDto::fromEntity)
                .collect(Collectors.toList());
    }

    // Update marks for a submission
    public SubmissionDto updateMarks(Long submissionId, Integer marks) {
        AssignmentSubmission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        submission.setMarks(marks);
        return SubmissionDto.fromEntity(submissionRepository.save(submission));
    }

    // ===== QUIZZES =====

    public QuizDto createQuiz(QuizDto dto, Long teacherId) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (!course.getTeacher().getId().equals(teacherId)) {
            throw new RuntimeException("Unauthorized: Not your course");
        }
        Quiz quiz = Quiz.builder()
                .course(course)
                .title(dto.getTitle())
                .duration(dto.getDuration())
                .build();
        return QuizDto.fromEntity(quizRepository.save(quiz));
    }

    public QuestionDto addQuestion(QuestionDto dto) {
        Quiz quiz = quizRepository.findById(dto.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        Question question = Question.builder()
                .quiz(quiz)
                .questionText(dto.getQuestionText())
                .optionA(dto.getOptionA())
                .optionB(dto.getOptionB())
                .optionC(dto.getOptionC())
                .optionD(dto.getOptionD())
                .correctAnswer(dto.getCorrectAnswer())
                .build();
        return QuestionDto.fromEntity(questionRepository.save(question));
    }

    // ===== PERFORMANCE =====

    public List<SubmissionDto> getStudentPerformance(Long teacherId) {
        return submissionRepository.findByTeacherId(teacherId).stream()
                .map(SubmissionDto::fromEntity)
                .collect(Collectors.toList());
    }

    // ===== ANNOUNCEMENTS =====

    public AnnouncementDto createAnnouncement(AnnouncementDto dto, Long teacherId) {
        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        Announcement announcement = Announcement.builder()
                .course(course)
                .title(dto.getTitle())
                .message(dto.getMessage())
                .build();
        return AnnouncementDto.fromEntity(announcementRepository.save(announcement));
    }
}
