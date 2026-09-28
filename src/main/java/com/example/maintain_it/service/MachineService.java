package com.example.maintain_it.service;

import com.example.maintain_it.entity.Machine;
import com.example.maintain_it.repository.MachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MachineService {

    private final MachineRepository machineRepository;

    public MachineService(MachineRepository machineRepository) {
        this.machineRepository = machineRepository;
    }

    public Machine saveMachine(Machine machine) {
        return machineRepository.save(machine);
    }

    public List<Machine> getAllMachines() {
        return machineRepository.findAll();
    }

    public Machine getMachineById(int id) {
        return machineRepository.findById(id).orElse(null);
    }

    public void deleteMachine(int id) {
        machineRepository.deleteById(id);
    }
}