package com.example.educationinterface.controller;

import com.example.educationinterface.dto.DashboardDto;
import com.example.educationinterface.dto.UserDto;
import com.example.educationinterface.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for Admin operations
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    /**
     * GET /api/admin/dashboard - Get platform statistics
     */
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDto> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboard());
    }

    /**
     * GET /api/admin/users - Get all users
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    /**
     * POST /api/admin/users - Create a new user
     */
    @PostMapping("/users")
    public ResponseEntity<UserDto> createUser(@RequestBody Map<String, String> body) {
        UserDto dto = new UserDto();
        dto.setName(body.get("name"));
        dto.setEmail(body.get("email"));
        dto.setRole(body.get("role"));
        return ResponseEntity.ok(adminService.createUser(dto, body.get("password"), body.get("role")));
    }

    /**
     * PUT /api/admin/users/{id} - Update a user
     */
    @PutMapping("/users/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto dto) {
        return ResponseEntity.ok(adminService.updateUser(id, dto));
    }

    /**
     * DELETE /api/admin/users/{id} - Delete a user
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    /**
     * GET /api/admin/reports - Get platform reports
     */
    @GetMapping("/reports")
    public ResponseEntity<Map<String, Object>> getReports() {
        return ResponseEntity.ok(adminService.getReports());
    }
}
