package com.example.maintain_it.controller;
import com.example.maintain_it.entity.MaintenanceTask;
import com.example.maintain_it.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskRepository repository;
    public TaskController(TaskRepository repository) { this.repository = repository; }
    @GetMapping
    public List<MaintenanceTask> getAll() { return repository.findAll(); }
    @GetMapping("/{id}")
    public MaintenanceTask getById(@PathVariable int id) { return repository.findById(id).orElse(null); }
    @PostMapping
    public MaintenanceTask create(@RequestBody MaintenanceTask task) { return repository.save(task); }
    @PutMapping("/{id}")
    public MaintenanceTask update(@PathVariable int id, @RequestBody MaintenanceTask task) {
        task.setId(id);
        return repository.save(task);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) { repository.deleteById(id); }
    @GetMapping("/{id}/status")
    public String getStatus(@PathVariable int id) {
        MaintenanceTask t = repository.findById(id).orElse(null);
        return t != null ? t.getStatus() : "NOT_FOUND";
    }
    @GetMapping("/machine/{machineId}")
    public List<MaintenanceTask> getByMachine(@PathVariable int machineId) { return repository.findByMachineId(machineId); }
}
