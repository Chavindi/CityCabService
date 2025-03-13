package com.cab.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "bookings") // Mapping this class to 'bookings' collection
public class Booking {

    @Id
    private String id; 
    private String orderNumber; 
    private String registrationNumber;
    private String email;
    private String pickupLocation;
    private String dropoffLocation;
    private int passengers;
    private String vehicle;
    private float distance; // Corrected typo
    private float totalAmount;
    private Driver driver; 
    private String date;
    private String time;
    private String status; // e.g., 'booked', 'accepted', 'completed'

    // Constructors
    public Booking() {}

    public Booking(String orderNumber, String registrationNumber, String pickupLocation, String dropoffLocation, 
                   int passengers, String vehicle, float distance, float totalAmount, String date, String time, String status) {
        this.orderNumber = orderNumber;
        this.registrationNumber = registrationNumber;
        this.email = email;
        this.pickupLocation = pickupLocation;
        this.dropoffLocation = dropoffLocation;
        this.passengers = passengers;
        this.vehicle = vehicle;
        this.distance = distance;
        this.totalAmount = totalAmount;
        this.date = date;
        this.time = time;
        this.status = status;
    }

    

    // Getters and Setters

    public Driver getDriver() {
        return driver;
    }
    
    public void setDriver(Driver driver) {
        this.driver = driver;
    }
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }


    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDropoffLocation() {
        return dropoffLocation;
    }

    public void setDropoffLocation(String dropoffLocation) {
        this.dropoffLocation = dropoffLocation;
    }

    public int getPassengers() {
        return passengers;
    }

    public void setPassengers(int passengers) {
        this.passengers = passengers;
    }

    public String getVehicle() {
        return vehicle;
    }

    public void setVehicle(String vehicle) {
        this.vehicle = vehicle;
    }

    public float getDistance() {
        return distance;
    }

    public void setDistance(float distance) {
        this.distance = distance;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
