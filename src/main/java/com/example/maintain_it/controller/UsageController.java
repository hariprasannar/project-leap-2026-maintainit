package com.example.maintain_it.controller;
import com.example.maintain_it.entity.UsageLog;
import com.example.maintain_it.repository.UsageLogRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/usage")
public class UsageController {
    private final UsageLogRepository repository;
    public UsageController(UsageLogRepository repository) { this.repository = repository; }
    @GetMapping
    public List<UsageLog> getAll() { return repository.findAll(); }
    @GetMapping("/{id}")
    public UsageLog getById(@PathVariable int id) { return repository.findById(id).orElse(null); }
    @PostMapping
    public UsageLog create(@RequestBody UsageLog usageLog) { return repository.save(usageLog); }
    @PutMapping("/{id}")
    public UsageLog update(@PathVariable int id, @RequestBody UsageLog usageLog) {
        usageLog.setId(id);
        return repository.save(usageLog);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) { repository.deleteById(id); }
}
