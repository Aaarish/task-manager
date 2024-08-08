package com.roya.task_manager_backend.services;

import com.roya.task_manager_backend.models.dto.SubTaskDto;
import com.roya.task_manager_backend.models.dto.TaskDto;

import java.util.List;

public interface RootService {
    List<TaskDto> listAllTasks();

    TaskDto getTask(String taskId);

    TaskDto addTask(TaskDto taskDto);

    TaskDto removeTask(String taskId);

    TaskDto editTask(String taskId, TaskDto taskDto);

    TaskDto appendSubTask(String taskId, List<SubTaskDto> subTasks);

    void removeSubTask(String taskId, String subTaskId);
}
