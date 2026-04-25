package com.example.monumentbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@bharatheritage.com");
        message.setTo(toEmail);
        message.setSubject("Your Verification OTP Code");
        message.setText("Your OTP is " + otp + ". It expires in 5 minutes. Please do not share this with anyone.");
        
        try {
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
            // In a real application, you might throw a custom exception here
        }
    }
}
