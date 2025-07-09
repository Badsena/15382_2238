package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "https://3001.vs.amypo.com"})
public class UserController {

    @Autowired
    private UserRepo repo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (repo.existsById(user.getEmail())) {
            return "User already exists";
        }
        // Set default role as USER if not specified
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }
        repo.save(user);
        return "User registered successfully with role: " + user.getRole();
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        User existing = repo.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (existing != null) {
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("role", existing.getRole());
            response.put("username", existing.getUsername());
            response.put("email", existing.getEmail());
        } else {
            response.put("success", false);
            response.put("message", "Invalid credentials");
        }
        return response;
    }

    @PostMapping("/admin/register")
    public String registerAdmin(@RequestBody User user) {
        if (repo.existsById(user.getEmail())) {
            return "User already exists";
        }
        user.setRole("ADMIN");
        repo.save(user);
        return "Admin registered successfully";
    }
}
