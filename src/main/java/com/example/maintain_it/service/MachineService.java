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

    public Machine updateMachine(int id, Machine machine) {

        Machine existingMachine = machineRepository.findById(id).orElse(null);

        if (existingMachine != null) {
            existingMachine.setName(machine.getName());
            existingMachine.setMaintenanceInterval(machine.getMaintenanceInterval());
            existingMachine.setIntervalType(machine.getIntervalType());
            existingMachine.setUsageHours(machine.getUsageHours());

            return machineRepository.save(existingMachine);
        }

        return null;
    }


}