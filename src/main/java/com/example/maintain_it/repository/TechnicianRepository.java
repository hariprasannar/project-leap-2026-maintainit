package com.example.maintain_it.repository;
import com.example.maintain_it.entity.Technician;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TechnicianRepository extends JpaRepository<Technician, Integer> {}
