package com.example.maintain_it.repository;
import com.example.maintain_it.entity.MaintenanceTask;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TaskRepository extends JpaRepository<MaintenanceTask, Integer> {
    List<MaintenanceTask> findByMachineId(int machineId);
}
