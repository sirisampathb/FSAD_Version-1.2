package com.example.monumentbackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;
import java.util.stream.Collectors;

@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    @Value("${cors.allowed-methods}")
    private String allowedMethods;

    @Value("${cors.allowed-headers}")
    private String allowedHeaders;

    @Value("${cors.allow-credentials}")
    private boolean allowCredentials;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Clean up and set origins
        config.setAllowedOriginPatterns(Arrays.stream(allowedOrigins.split(","))
                .map(String::trim)
                .collect(Collectors.toList()));
        
        // Clean up and set methods
        config.setAllowedMethods(Arrays.stream(allowedMethods.split(","))
                .map(String::trim)
                .collect(Collectors.toList()));
        
        // Set headers and credentials
        config.setAllowedHeaders(Arrays.stream(allowedHeaders.split(","))
                .map(String::trim)
                .collect(Collectors.toList()));
        config.setAllowCredentials(allowCredentials);
        
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}