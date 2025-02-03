package com.cab.backend.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cab.backend.dto.BookingWithCustomerDTO;
import com.cab.backend.model.Booking;
import com.cab.backend.model.User;
import com.cab.backend.repository.BookingRepository;
import com.cab.backend.repository.UserRepository;



@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;
     private final UserRepository userRepository;

    public BookingController(BookingRepository bookingRepository , UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    // Add a new booking
    @PostMapping
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {
        // Generate a unique order number if not present
        if (booking.getOrderNumber() == null || booking.getOrderNumber().isEmpty()) {
            String orderNumber = "ORD-" + Math.floor(Math.random() * 90000 + 10000); // Generate order number
            booking.setOrderNumber(orderNumber);
        }
    
        // Save booking with order number and registration number
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }
    

    // Get all bookings (for admin, for example)
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    // Get bookings for a specific customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> getBookingsByCustomerId(@PathVariable String customerId) {
        // Custom query can be written in the repository
        List<Booking> bookings = bookingRepository.findByRegistrationNumber(customerId);
        return ResponseEntity.ok(bookings);
    }

    // Update booking status (e.g., when the booking is accepted, completed, etc.)
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable String id, @RequestBody Booking bookingDetails) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setStatus(bookingDetails.getStatus());
            Booking updatedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(updatedBooking);
        }).orElse(ResponseEntity.notFound().build());
    }


        // Get all bookings with customer details
        @GetMapping("/withCustomers")
        public ResponseEntity<List<BookingWithCustomerDTO>> getAllBookingsWithCustomers() {
            List<Booking> bookings = bookingRepository.findAll();
        
            List<BookingWithCustomerDTO> bookingsWithCustomers = bookings.stream().map(booking -> {
                // Use registrationNumber to look up user (customer)
                User customer = userRepository.findByRegistrationNumber(booking.getRegistrationNumber());
                return new BookingWithCustomerDTO(booking, customer); // No need for orElse(null)
            }).collect(Collectors.toList());
        
            return ResponseEntity.ok(bookingsWithCustomers);
        }
        
        
}
