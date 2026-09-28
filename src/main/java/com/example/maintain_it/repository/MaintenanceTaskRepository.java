package com.example.maintain_it.repository;

import com.example.maintain_it.entity.MaintenanceTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaintenanceTaskRepository
        extends JpaRepository<MaintenanceTask, Integer> {

}