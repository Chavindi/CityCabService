package com.cab.backend.dto;

import com.cab.backend.model.Booking;
import com.cab.backend.model.User;

public class BookingWithCustomerDTO {
    private Booking booking;
    private User customer;

    public BookingWithCustomerDTO(Booking booking, User customer) {
        this.booking = booking;
        this.customer = customer;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }
}
