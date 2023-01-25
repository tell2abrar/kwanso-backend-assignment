import { Base } from './Base';
import { Column, Entity, OneToMany } from 'typeorm';
import { Task } from '.';

@Entity('users')
export class User extends Base {
  @Column()
  email: string;

  @Column()
  password: string;

  // @Field(() => [Truck], { nullable: true })
  // @OneToMany(() => Truck, (truck) => truck.trucker)
  // trucks: Truck[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
