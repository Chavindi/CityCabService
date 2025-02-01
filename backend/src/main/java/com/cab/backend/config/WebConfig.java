package com.cab.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Enable CORS for all endpoints
                .allowedOrigins("http://localhost:3000")  // Allow the frontend origin explicitly
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Allow these HTTP methods
                .allowedHeaders("*")  // Allow any headers
                .allowCredentials(true);  // Allow credentials like cookies or authentication headers
    }
}
