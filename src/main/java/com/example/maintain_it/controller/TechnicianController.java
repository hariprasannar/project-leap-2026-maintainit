package com.example.maintain_it.controller;
import com.example.maintain_it.entity.Technician;
import com.example.maintain_it.repository.TechnicianRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/technicians")
public class TechnicianController {
    private final TechnicianRepository repository;
    public TechnicianController(TechnicianRepository repository) { this.repository = repository; }
    @GetMapping
    public List<Technician> getAll() { return repository.findAll(); }
    @GetMapping("/{id}")
    public Technician getById(@PathVariable int id) { return repository.findById(id).orElse(null); }
    @PostMapping
    public Technician create(@RequestBody Technician technician) { return repository.save(technician); }
    @PutMapping("/{id}")
    public Technician update(@PathVariable int id, @RequestBody Technician technician) {
        technician.setId(id);
        return repository.save(technician);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) { repository.deleteById(id); }
}
