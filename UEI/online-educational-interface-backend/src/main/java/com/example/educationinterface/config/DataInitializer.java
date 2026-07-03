package com.example.educationinterface.config;

import com.example.educationinterface.entity.User;
import com.example.educationinterface.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Data initializer - creates default admin, teacher, and student accounts on startup
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create default Admin account
        if (!userRepository.existsByEmail("admin@gmail.com")) {
            User admin = User.builder()
                    .name("Admin")
                    .email("admin@gmail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(User.Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Default admin account created: admin@gmail.com / admin123");
        }

        // Create default Teacher account
        if (!userRepository.existsByEmail("teacher@gmail.com")) {
            User teacher = User.builder()
                    .name("John Teacher")
                    .email("teacher@gmail.com")
                    .password(passwordEncoder.encode("teacher123"))
                    .role(User.Role.TEACHER)
                    .build();
            userRepository.save(teacher);
            log.info("Default teacher account created: teacher@gmail.com / teacher123");
        }

        // Create default Student account
        if (!userRepository.existsByEmail("student@gmail.com")) {
            User student = User.builder()
                    .name("Jane Student")
                    .email("student@gmail.com")
                    .password(passwordEncoder.encode("student123"))
                    .role(User.Role.STUDENT)
                    .build();
            userRepository.save(student);
            log.info("Default student account created: student@gmail.com / student123");
        }
    }
}
