package com.example.maintain_it.service;

import com.example.maintain_it.entity.MaintenanceTask;
import com.example.maintain_it.repository.MaintenanceTaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaintenanceTaskService {

    private final MaintenanceTaskRepository maintenanceTaskRepository;

    public MaintenanceTaskService(
            MaintenanceTaskRepository maintenanceTaskRepository) {
        this.maintenanceTaskRepository = maintenanceTaskRepository;
    }

    public MaintenanceTask saveTask(MaintenanceTask task) {
        return maintenanceTaskRepository.save(task);
    }

    public List<MaintenanceTask> getAllTasks() {
        return maintenanceTaskRepository.findAll();
    }

    public MaintenanceTask getTaskById(int id) {
        return maintenanceTaskRepository.findById(id).orElse(null);
    }

    public void deleteTask(int id) {
        maintenanceTaskRepository.deleteById(id);
    }

    public MaintenanceTask updateTask(int id, MaintenanceTask task) {

        MaintenanceTask existingTask =
                maintenanceTaskRepository.findById(id).orElse(null);

        if (existingTask != null) {

            existingTask.setMachineId(task.getMachineId());
            existingTask.setTaskName(task.getTaskName());
            existingTask.setDueDate(task.getDueDate());
            existingTask.setStatus(task.getStatus());

            return maintenanceTaskRepository.save(existingTask);
        }

        return null;
    }
}