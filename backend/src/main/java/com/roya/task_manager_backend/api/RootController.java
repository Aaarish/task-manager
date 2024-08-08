package com.roya.task_manager_backend.api;

import com.roya.task_manager_backend.models.dto.SubTaskDto;
import com.roya.task_manager_backend.models.dto.TaskDto;
import com.roya.task_manager_backend.services.RootService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class RootController {
    private final RootService rootService;

    @GetMapping
    public ResponseEntity<List<TaskDto>> listAllTasks() {
        return ResponseEntity.ok(rootService.listAllTasks());
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<TaskDto> getTask(@PathVariable String taskId) {
        return ResponseEntity.ok(rootService.getTask(taskId));
    }

    @PostMapping
    public ResponseEntity<TaskDto> addTask(@RequestBody TaskDto taskDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rootService.addTask(taskDto));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<TaskDto> removeTask(@PathVariable String taskId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(rootService.removeTask(taskId));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDto> editTask(@PathVariable String taskId, @RequestBody TaskDto taskDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(rootService.editTask(taskId, taskDto));
    }

    @PutMapping("/sub/{taskId}")
    public ResponseEntity<TaskDto> appendSubTask(@PathVariable String taskId, @RequestBody SubTaskDto subTaskDto) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(rootService.appendSubTask(taskId, Arrays.asList(subTaskDto)));
    }

    @PutMapping("/{taskId}/sub/{subTaskId}")
    public ResponseEntity<String> removeSubTask(@PathVariable String taskId, @PathVariable String subTaskId) {
        rootService.removeSubTask(taskId, subTaskId);
        return ResponseEntity.ok("sub task is removed successfully !");
    }

}
