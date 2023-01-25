import TaskMapper from './mapper';
import {
  CreateTaskDto,
  CreateTaskResponse,
  ListAllTasksResponse,
  TaskDto,
} from './dto';
import { Task, User } from '../../db/entities';
import { ITaskService } from './interface';
import dbManager from '../../db';
import { Repository } from 'typeorm';
import { HTTP400Error, HTTP404Error, HTTP500Error } from '../../errors';

class TaskService implements ITaskService {
  private taskRepo: Repository<Task>;
  constructor() {
    this.taskRepo = dbManager.getRepository(Task);
  }

  createTask = async (
    req: CreateTaskDto,
    user: User
  ): Promise<CreateTaskResponse> => {
    const taskObj: Partial<Task> = TaskMapper.dtoToEntity(req);
    const task = await this.taskRepo.save({ ...taskObj, user });
    if (!task) throw new HTTP500Error('Something went wrong');
    const responseToSend: TaskDto = TaskMapper.entityToDto(task);
    return { task: responseToSend };
  };

  getAllTasks = async (user: User): Promise<ListAllTasksResponse> => {
    let tasksDto: TaskDto[] = [];
    const tasks = await this.taskRepo.find({
      where: { user: { id: user.id } },
    });
    if (tasks.length < 1) return { tasks };

    tasks.forEach((task) => {
      tasksDto.push(TaskMapper.entityToDto(task));
    });
    return { tasks: tasksDto };
  };
}

export default <ITaskService>new TaskService();
