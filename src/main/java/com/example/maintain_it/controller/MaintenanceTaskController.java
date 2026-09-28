package com.example.maintain_it.controller;

import com.example.maintain_it.entity.MaintenanceTask;
import com.example.maintain_it.service.MaintenanceTaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class MaintenanceTaskController {

    private final MaintenanceTaskService maintenanceTaskService;

    public MaintenanceTaskController(
            MaintenanceTaskService maintenanceTaskService) {
        this.maintenanceTaskService = maintenanceTaskService;
    }

    @PostMapping
    public MaintenanceTask addTask(@RequestBody MaintenanceTask task) {
        return maintenanceTaskService.saveTask(task);
    }

    @GetMapping
    public List<MaintenanceTask> getAllTasks() {
        return maintenanceTaskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public MaintenanceTask getTaskById(@PathVariable int id) {
        return maintenanceTaskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public MaintenanceTask updateTask(
            @PathVariable int id,
            @RequestBody MaintenanceTask task) {

        return maintenanceTaskService.updateTask(id, task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable int id) {
        maintenanceTaskService.deleteTask(id);
        return "Maintenance task deleted successfully";
    }
}