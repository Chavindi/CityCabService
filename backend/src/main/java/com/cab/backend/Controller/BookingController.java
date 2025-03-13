package com.cab.backend.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cab.backend.dto.AssignDriverRequest;
import com.cab.backend.dto.BookingWithCustomerDTO;
import com.cab.backend.exception.BookingNotFoundException;
import com.cab.backend.exception.DriverNotFoundException;
import com.cab.backend.model.Booking;
import com.cab.backend.model.User;
import com.cab.backend.repository.BookingRepository;
import com.cab.backend.repository.UserRepository;
import com.cab.backend.service.BookingService;  // Make sure you have this service class

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BookingService bookingService;  // Inject service for assigning driver

    public BookingController(BookingRepository bookingRepository, UserRepository userRepository, BookingService bookingService) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.bookingService = bookingService;
    }

    // Add a new booking
    @PostMapping
    public ResponseEntity<Booking> addBooking(@RequestBody Booking booking) {
        // Generate a unique order number if not present
        if (booking.getOrderNumber() == null || booking.getOrderNumber().isEmpty()) {
            String orderNumber = "ORD-" + (int)(Math.random() * 90000 + 10000); // Generate order number
            booking.setOrderNumber(orderNumber);
        }
    
        // Save booking with order number and registration number
        Booking savedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

@PostMapping("/assignDriver")
public ResponseEntity<?> assignDriver(@RequestBody AssignDriverRequest request) {
    try {
        bookingService.assignDriverToBooking(request.getBookingId(), request.getDriverId());
        return ResponseEntity.ok("Driver assigned successfully");
    } catch (BookingNotFoundException | DriverNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }
}

    // Get all bookings (for admin, for example)
    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/driver/{email}/bookings")
    public List<Booking> getBookingsByDriver(@PathVariable String email) {
        return bookingService.getBookingsByDriver(email);
    }

    // Get bookings for a specific customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> getBookingsByCustomerId(@PathVariable String customerId) {
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
            
            // Handle null customer (if any)
            if (customer == null) {
                customer = new User(); // Or return default/null value
            }

            return new BookingWithCustomerDTO(booking, customer);
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(bookingsWithCustomers);
    }
}
