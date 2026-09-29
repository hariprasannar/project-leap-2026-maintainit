package com.example.maintain_it.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
@Entity
public class UsageLog {
    @Id private int id;
    private int machineId;
    private String logDate;
    private int usageHours;
    
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public int getMachineId() { return machineId; }
    public void setMachineId(int machineId) { this.machineId = machineId; }
    public String getLogDate() { return logDate; }
    public void setLogDate(String logDate) { this.logDate = logDate; }
    public int getUsageHours() { return usageHours; }
    public void setUsageHours(int usageHours) { this.usageHours = usageHours; }
}
