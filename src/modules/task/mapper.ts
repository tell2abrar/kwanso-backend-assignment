import { Task } from '../../db/entities';
import { ITaskMapper } from './interface';
import { CreateTaskDto, TaskDto } from './dto';

class TaskMapper implements ITaskMapper {
  dtoToEntity(req: CreateTaskDto): Partial<Task> {
    const task: Partial<Task> = {
      name: req.name,
    };
    return task;
  }

  entityToDto(req: Task): TaskDto {
    const taskDto: TaskDto = {
      id: req.id,
      name: req.name,
    };
    return taskDto;
  }
}

export default <ITaskMapper>new TaskMapper();
