import { Todo } from '../../models/todo';
import { HttpRequest, HttpResponse } from '../protocols';
import { IDeleteTodoController, IDeleteTodoRepository } from './protocols';

export class DeleteTodoController implements IDeleteTodoController {
  constructor(private readonly deleteTodoRepository: IDeleteTodoRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<Todo>> {
    try {
      const id = httpRequest.params.id;

      if (!id) {
        return { statusCode: 400, body: 'Obrigatório id do usuário' };
      }

      const todo = await this.deleteTodoRepository.deleteTodo(id);

      return { statusCode: 200, body: todo };
    } catch (error) {
      return { statusCode: 500, body: 'Algo deu errado' };
    }
  }
}
