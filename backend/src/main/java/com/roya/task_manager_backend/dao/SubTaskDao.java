package com.roya.task_manager_backend.dao;

import com.roya.task_manager_backend.models.SubTask;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTaskDao extends MongoRepository<SubTask, String> {
    List<SubTask> findByTaskId(String taskId);

}
