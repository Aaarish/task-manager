package com.roya.task_manager_backend.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubTaskDto {
    private String subTaskId;
    private String taskId;
    private String heading;
    private String desc;

}
