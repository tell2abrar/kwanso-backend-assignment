import { Task, User } from '../../db/entities';
import {
  CreateTaskDto,
  CreateTaskResponse,
  ListAllTasksResponse,
  TaskDto,
} from './dto';

export interface ITaskService {
  createTask(
    req: CreateTaskDto,
    user: User
  ): Promise<CreateTaskResponse | null>;

  getAllTasks(user: User): Promise<ListAllTasksResponse>;
}

export interface ITaskMapper {
  dtoToEntity(req: CreateTaskDto): Partial<Task>;
  entityToDto(req: Task): TaskDto;
}
