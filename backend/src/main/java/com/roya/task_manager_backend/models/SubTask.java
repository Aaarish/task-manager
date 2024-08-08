package com.roya.task_manager_backend.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubTask {
    @Id
    private String subTaskId;
    private String taskId;
    private String heading;
    private String desc;

}
