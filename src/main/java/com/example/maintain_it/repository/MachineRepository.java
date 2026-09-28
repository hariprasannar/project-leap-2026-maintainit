package com.example.maintain_it.repository;

import com.example.maintain_it.entity.Machine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MachineRepository extends JpaRepository<Machine, Integer> {

}