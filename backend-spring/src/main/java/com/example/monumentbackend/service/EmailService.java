package com.example.monumentbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.internet.MimeMessage;
import org.springframework.scheduling.annotation.Async;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendOtpEmail(String toEmail, String otp) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Your Verification OTP Code");
            
            String htmlContent = "<h3>Your OTP is: <b style='color: #FDB931; font-size: 24px;'>" + otp + "</b></h3>" +

                                 "<p>It expires in 5 minutes. Please do not share this with anyone.</p>" +
                                 "<p>Best regards,<br>The Heritage Team</p>";
                                 
            helper.setText(htmlContent, true);
            
            mailSender.send(mimeMessage);
            System.out.println("OTP Email successfully sent to " + toEmail + " from " + fromEmail);
        } catch (Exception e) {
            e.printStackTrace(); // Log full stack trace
            System.err.println("Failed to send email to " + toEmail + ": " + e.getMessage());
            // Note: Since this is @Async, we don't throw an exception to the controller
        }
    }

}
