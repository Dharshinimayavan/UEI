package com.example.educationinterface.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO for login/register response containing JWT token and user info
 */
@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String name;
    private String role;
    private Long userId;
}
