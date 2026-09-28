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
}