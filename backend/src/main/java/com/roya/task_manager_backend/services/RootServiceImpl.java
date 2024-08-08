package com.roya.task_manager_backend.services;

import com.roya.task_manager_backend.dao.SubTaskDao;
import com.roya.task_manager_backend.dao.TaskDao;
import com.roya.task_manager_backend.models.SubTask;
import com.roya.task_manager_backend.models.Task;
import com.roya.task_manager_backend.models.dto.SubTaskDto;
import com.roya.task_manager_backend.models.dto.TaskDto;
import com.roya.task_manager_backend.utils.State;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RootServiceImpl implements RootService {
    private final TaskDao taskDao;
    private final SubTaskDao subTaskDao;

    @Override
    public List<TaskDto> listAllTasks() {
        return taskDao.findAll()
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public TaskDto getTask(String taskId) {
        Task task = taskDao.findById(taskId)
                .orElseThrow(() -> new RuntimeException("No task with given taskId: " + taskId));

        return mapToDto(task);
    }

    @Override
    public TaskDto addTask(TaskDto taskDto) {
        Task task = mapToEntity(taskDto);
        Task savedTask = taskDao.save(task);

        return mapToDto(savedTask);
    }

    @Override
    public TaskDto removeTask(String taskId) {
        Task task = taskDao.findById(taskId)
                .orElseThrow(() -> new RuntimeException("No task with such id"));

        taskDao.delete(task);

        return mapToDto(task);
    }

    @Override
    public TaskDto editTask(String taskId, TaskDto taskDto) {
        Task task = taskDao.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Invalid task id"));

        if(taskDto.getTitle() != null && !taskDto.getTitle().isEmpty()) task.setTitle(taskDto.getTitle());
        if(taskDto.getDesc() != null && !taskDto.getDesc().isEmpty()) task.setDesc(taskDto.getDesc());
        if(taskDto.getState() != null) task.setState(taskDto.getState());

        Task savedTask = taskDao.save(task);

        return mapToDto(savedTask);
    }

    @Override
    public TaskDto appendSubTask(String taskId, List<SubTaskDto> subTasks) {

        Task task = taskDao.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Invalid task id"));

        if(subTasks == null || subTasks.isEmpty()) {
            return null;
        }

        TaskDto taskDto = mapToDto(task);
        List<SubTaskDto> subTasksList = new ArrayList<>(taskDto.getSubTasks());

        subTasks.forEach(subTask -> {
            SubTask sTask = SubTask.builder()
                    .subTaskId(UUID.randomUUID().toString())
                    .taskId(taskId)
                    .heading(subTask.getHeading())
                    .desc(subTask.getDesc())
                    .build();

            SubTask savedSubTask = subTaskDao.save(sTask);

            SubTaskDto dto = SubTaskDto.builder()
                    .subTaskId(savedSubTask.getSubTaskId())
                    .taskId(savedSubTask.getTaskId())
                    .heading(savedSubTask.getHeading())
                    .desc(savedSubTask.getDesc())
                    .build();

            subTasksList.add(dto);
        });

        taskDto.setSubTasks(subTasksList);

        return taskDto;
    }

    @Override
    public void removeSubTask(String taskId, String subTaskId) {
        List<SubTask> subTasks = subTaskDao.findByTaskId(taskId);
        SubTask subTaskToBeRemoved = subTasks.stream()
                .filter(subTask -> subTask.getSubTaskId().equalsIgnoreCase(subTaskId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No sub-task exists with such subTaskId"));

        subTaskDao.delete(subTaskToBeRemoved);

        Task task = taskDao.findById(taskId)
                .orElseThrow(() -> new RuntimeException("No sub-task exists belonging to such taskId"));
        TaskDto taskDto = mapToDto(task);
        taskDto.getSubTasks().remove(subTaskToBeRemoved);
    }

    private TaskDto mapToDto(Task task) {
        List<SubTask> subTasks = subTaskDao.findByTaskId(task.getTaskId());
        List<SubTaskDto> subTaskDtos = null;

        if (subTasks != null) {
            subTaskDtos = subTasks.stream()
                    .map(subTask -> SubTaskDto.builder()
                            .subTaskId(subTask.getSubTaskId())
                            .taskId(subTask.getTaskId())
                            .heading(subTask.getHeading())
                            .desc(subTask.getDesc())
                            .build())
                    .toList();
        }

        return TaskDto.builder()
                .taskId(task.getTaskId())
                .title(task.getTitle())
                .desc(task.getDesc())
                .state(task.getState())
                .subTasks(subTaskDtos)
                .build();
    }

    private Task mapToEntity(TaskDto taskDto) {
        return Task.builder()
                .taskId(taskDto.getTaskId() == null ? UUID.randomUUID().toString() : taskDto.getTaskId())
                .title(taskDto.getTitle())
                .desc(taskDto.getDesc())
                .state(taskDto.getState() == null ? State.TODO : taskDto.getState())
                .build();
    }

    private void addSubTasks(TaskDto taskDto) {
        if (taskDto.getSubTasks().isEmpty()) {
            return;
        }

        taskDto.getSubTasks().forEach(subTaskDto -> {
                    SubTask subTask = SubTask.builder()
                            .subTaskId(UUID.randomUUID().toString())
                            .taskId(taskDto.getTaskId())
                            .heading(subTaskDto.getHeading())
                            .desc(subTaskDto.getDesc())
                            .build();

                    subTaskDao.save(subTask);
                });
    }

}
