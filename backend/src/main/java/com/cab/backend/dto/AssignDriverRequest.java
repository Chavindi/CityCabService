package com.cab.backend.dto;

public class AssignDriverRequest {
    private String bookingId;
    private String driverId;

    // Constructors
    public AssignDriverRequest() {}

    public AssignDriverRequest(String bookingId, String driverId) {
        this.bookingId = bookingId;
        this.driverId = driverId;
    }

    // Getters and Setters
    public String getBookingId() {
        return bookingId;
    }

    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(String driverId) {
        this.driverId = driverId;
    }
}
