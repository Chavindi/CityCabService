// package com.cab.backend.Controller;

// import java.util.List;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.cab.backend.model.Car;
// import com.cab.backend.repository.CarRepository;

// @RestController
// @RequestMapping("/cars") //  API Base Path: http://localhost:8080/cars
// public class CarController {

//     private final CarRepository carRepository;

//     public CarController(CarRepository carRepository) {
//         this.carRepository = carRepository;
//     }

//     //  Get all cars
//     @GetMapping
//     public List<Car> getAllCars() {
//         return carRepository.findAll();
//     }

//     //  Get car by ID
//     @GetMapping("/{id}")
//     public ResponseEntity<Car> getCarById(@PathVariable String id) {
//         return carRepository.findById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     // Get cars assigned to a driver
//     @GetMapping("/driver/{driverId}")
//     public List<Car> getCarsByDriver(@PathVariable String driverId) {
//         return carRepository.findByDriverId(driverId);
//     }

//     // Add a new car
//     @PostMapping
//     public Car addCar(@RequestBody Car car) {
//         return carRepository.save(car);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Car> updateCar(@PathVariable String id, @RequestBody Car carDetails) {
//         return carRepository.findById(id).map(car -> {
//             car.setBrand(carDetails.getBrand());
//             car.setModel(carDetails.getModel());
//             car.setNumber(carDetails.getNumber());
//             car.setColor(carDetails.getColor());
//             car.setYear(carDetails.getYear());
//             return ResponseEntity.ok(carRepository.save(car));
//         }).orElse(ResponseEntity.notFound().build());
//     }

  
//     //@DeleteMapping("/{id}")
//     // public ResponseEntity<Void> deleteCar(@PathVariable String id) {
//     //     return carRepository.findById(id).map(car -> {
//     //         carRepository.delete(car);
//     //         return ResponseEntity.ok().build();
//     //     }).orElse(ResponseEntity.notFound().build());
//     // }
// }



package com.cab.backend.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cab.backend.model.Car;
import com.cab.backend.repository.CarRepository;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarRepository carRepository;

    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    // Get all cars
    
    @GetMapping
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }
    

    // Get car by ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable String id) {
        return carRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

 

    // Add a new car
    @PostMapping
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        Car savedCar = carRepository.save(car);
        return ResponseEntity.ok(savedCar);
    }

    // Update car details
    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable String id, @RequestBody Car carDetails) {
        return carRepository.findById(id).map(car -> {
            car.setBrand(carDetails.getBrand());
            car.setModel(carDetails.getModel());
            car.setNumber(carDetails.getNumber());
            car.setColor(carDetails.getColor());
            car.setYear(carDetails.getYear());
            Car updatedCar = carRepository.save(car);
            return ResponseEntity.ok(updatedCar);
        }).orElse(ResponseEntity.notFound().build());
    }


}
