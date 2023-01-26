import {
  CreateTodoParams,
  ICreateTodoRepository,
} from '../../controllers/create-todo/protocols';

import { MongoClient } from '../../database/mongo';

import { Todo } from '../../models/todo';

export class MongoCreateTodo implements ICreateTodoRepository {
  async createTodo(params: CreateTodoParams): Promise<Todo> {
    const { insertedId } = await MongoClient.db
      .collection('todo')
      .insertOne(params);

    const todo = await MongoClient.db
      .collection<Omit<Todo, 'id'>>('todo')
      .findOne({ _id: insertedId });

    if (!todo) {
      throw new Error('Tarefa não foi criada');
    }

    const { _id, ...rest } = todo;

    return { id: _id.toHexString(), ...rest };
  }
}
