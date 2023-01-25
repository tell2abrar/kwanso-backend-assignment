import TaskService from './service';
import { Request } from 'express';
import { catchAsync } from '../../common';
import { CreateTaskResponse, ListAllTasksResponse, TaskDto } from './dto';

class TaskController {
  createTask = catchAsync<CreateTaskResponse | null>(async (req: Request) => {
    const { body, user } = req;
    return await TaskService.createTask(body, user);
  });

  getAllTasks = catchAsync<ListAllTasksResponse>(async (req: Request) => {
    const { user } = req;
    return await TaskService.getAllTasks(user);
  });
}

export default new TaskController();
