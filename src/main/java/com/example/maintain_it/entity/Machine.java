package com.example.maintain_it.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Machine {

    @Id
    private int id;

    private String name;
    private int maintenanceInterval;
    private String intervalType;
    private int usageHours;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMaintenanceInterval() {
        return maintenanceInterval;
    }

    public void setMaintenanceInterval(int maintenanceInterval) {
        this.maintenanceInterval = maintenanceInterval;
    }

    public String getIntervalType() {
        return intervalType;
    }

    public void setIntervalType(String intervalType) {
        this.intervalType = intervalType;
    }

    public int getUsageHours() {
        return usageHours;
    }

    public void setUsageHours(int usageHours) {
        this.usageHours = usageHours;
    }
}