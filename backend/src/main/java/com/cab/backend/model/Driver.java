package com.cab.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "drivers") //  Mapping this class to 'drivers' collection
public class Driver {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String telephone1;
    private String telephone2;
    private String nic;

    // Constructors
    public Driver() {}

    public Driver(String firstName, String lastName, String email, String telephone1, String telephone2, String nic) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.telephone1 = telephone1;
        this.telephone2 = telephone2;
        this.nic = nic;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelephone1() { return telephone1; }
    public void setTelephone1(String telephone1) { this.telephone1 = telephone1; }

    public String getTelephone2() { return telephone2; }
    public void setTelephone2(String telephone2) { this.telephone2 = telephone2; }

    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }
}
