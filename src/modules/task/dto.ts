import { Length, IsEmail } from 'class-validator';

export class CreateTaskDto {
  @Length(1)
  name: string;
}

export class TaskDto {
  id: number;
  name: string;
}

export class CreateTaskResponse {
  task: TaskDto;
}

export class ListAllTasksResponse {
  tasks: TaskDto[];
}
