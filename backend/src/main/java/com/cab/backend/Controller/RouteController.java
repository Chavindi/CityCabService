package com.cab.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/route")
public class RouteController {

    private static final String OSRM_API_URL = "http://router.project-osrm.org/route/v1/driving/";
    

    @GetMapping("/getRoute")
    public String getRoute(@RequestParam String origin, @RequestParam String destination) {
        // Example API request for OSRM
        String url = OSRM_API_URL + origin + ";" + destination + "?overview=false&steps=true";
        
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        return response;  // Return the raw response
    }
}
