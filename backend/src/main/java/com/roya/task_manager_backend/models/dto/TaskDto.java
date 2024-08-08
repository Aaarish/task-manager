package com.roya.task_manager_backend.models.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.roya.task_manager_backend.utils.State;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskDto {
    @JsonProperty("todo_id")
    private String taskId;
    private String title;
    private String desc;
    private State state;
    private List<SubTaskDto> subTasks;

}
