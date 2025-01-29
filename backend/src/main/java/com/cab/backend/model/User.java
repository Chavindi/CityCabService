package com.cab.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // This maps to a "users" collection in MongoDB
public class User {

    @Id
    private String id; // MongoDB generates a unique ID automatically

    private String username;
    private String password;
    private String role; // Can be "CUSTOMER" or "ADMIN"

    // Customer-specific fields
    private String registrationNumber;
    private String name;
    private String address;
    private String nic;
    private String phone;

    // Default constructor (required for MongoDB)
    public User() {
    }

    // Constructor for both Admin and Customer
    public User(String username, String password, String role, String registrationNumber, String name, String address, String nic, String phone) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.registrationNumber = registrationNumber;
        this.name = name;
        this.address = address;
        this.nic = nic;
        this.phone = phone;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
