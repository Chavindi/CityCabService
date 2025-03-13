package com.cab.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cab.backend.exception.BookingNotFoundException;
import com.cab.backend.exception.DriverNotFoundException;
import com.cab.backend.model.Booking;
import com.cab.backend.model.Driver;
import com.cab.backend.repository.BookingRepository;
import com.cab.backend.repository.DriverRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final DriverRepository driverRepository;

    public BookingService(BookingRepository bookingRepository, DriverRepository driverRepository) {
        this.bookingRepository = bookingRepository;
        this.driverRepository = driverRepository;
    }

public void assignDriverToBooking(String bookingId, String driverId) {
    Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new BookingNotFoundException("Booking not found"));
    Driver driver = driverRepository.findById(driverId)
            .orElseThrow(() -> new DriverNotFoundException("Driver not found"));

    // Your logic to assign the driver to the booking
    booking.setDriver(driver);
    bookingRepository.save(booking);
}
public List<Booking> getBookingsByDriver(String email) {
    return bookingRepository.findByDriverEmail(email); // Example method to find bookings by email
}
}
