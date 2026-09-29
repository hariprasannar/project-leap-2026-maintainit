package com.example.maintain_it.repository;
import com.example.maintain_it.entity.UsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
public interface UsageLogRepository extends JpaRepository<UsageLog, Integer> {}
