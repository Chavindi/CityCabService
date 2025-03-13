package com.cab.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "cars")
 //  Mapping this class to 'cars' collection
public class Car {
    @Id
    private String id;
    private String brand;
    private String model;
    private String number;
    private String color;
    private int year;
    private String cabimageURL;

    //  Constructors
    public Car() {}

    public Car(String brand, String model, String number, String color, int year) {
        this.brand = brand;
        this.model = model;
        this.number = number;
        this.color = color;
        this.year = year;
    }

    //  Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
}
