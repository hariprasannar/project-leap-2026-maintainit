package com.example.maintain_it.controller;

import com.example.maintain_it.entity.Machine;
import com.example.maintain_it.service.MachineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/machines")
public class MachineController {

    private final MachineService machineService;

    public MachineController(MachineService machineService) {
        this.machineService = machineService;
    }

    @PostMapping
    public Machine addMachine(@RequestBody Machine machine) {
        return machineService.saveMachine(machine);
    }

    @GetMapping
    public List<Machine> getAllMachines() {
        return machineService.getAllMachines();
    }

    @GetMapping("/{id}")
    public Machine getMachineById(@PathVariable int id) {
        return machineService.getMachineById(id);
    }

    @PutMapping("/{id}")
    public Machine updateMachine(@PathVariable int id,
                                 @RequestBody Machine machine) {
        return machineService.updateMachine(id, machine);
    }

    @DeleteMapping("/{id}")
    public String deleteMachine(@PathVariable int id) {

        machineService.deleteMachine(id);

        return "Machine deleted successfully";
    }
}