package com.roya.task_manager_backend.dao;

import com.roya.task_manager_backend.models.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TaskDao extends MongoRepository<Task, String> {
}
