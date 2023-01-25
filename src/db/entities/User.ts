import { Base } from './Base';
import { Task } from '.';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('users')
export class User extends Base {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
