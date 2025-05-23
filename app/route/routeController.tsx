import { toDo, toDoData, userData } from 'app/config/types';
import usersData from 'app/db/usersData';
import todoDatas from 'app/db/todoData';

export default class routeController {
  static async login(data: userData) {
    const userExist = usersData.find((dbData) => dbData.login === data.login);
    if (!userExist) {
      return { status: 404, message: 'Senha Ou Email incorretos' };
    } else {
      const confirmPassword = userExist.password === data.password;
      if (!confirmPassword) {
        return { status: 404, message: 'Senha Ou Email incorretos' };
      } else {
        return { status: 200, message: 'Login feito com sucesso !' };
      }
    }
  }

  static async register(data: userData) {
    const userExist = usersData.find((dbData) => dbData.login === data.login);
    if (userExist) {
      return { status: 409, message: 'Usuário já cadastrado!' };
    } else {
      usersData.push(data);
      return { status: 200, message: 'Usuário cadastrado com sucesso!' };
    }
  }
  static async getTodo(login: string | null) {
    const userTodoExist = todoDatas.find((todo) => todo.login === login);

    if (userTodoExist) {
      return { status: 200, todo: userTodoExist.todo };
    } else {
      if (login) {
        const newTodoUser: toDoData = {
          login: login,
          todo: [],
        };
        todoDatas.push(newTodoUser);
        return { status: 200, message: 'Novo usuário incluso para criar tarefas' };
      }
    }
  }
  static async setTodo(data: toDo, login: string) {
    const userTodoExist = todoDatas.find((todo) => todo.login === login);

    if (userTodoExist) {
      const dataAlreadyExist = userTodoExist.todo.find((todoData) => todoData.title === data.title);
      if (dataAlreadyExist) {
        return { status: 409, message: 'Ja existe uma tarefa com esse titulo !' };
      } else {
        userTodoExist.todo.push(data);

        return {
          status: 200,
          message: 'Tarefa adicionada  com sucesso !',
          todo: userTodoExist.todo,
        };
      }
    } else {
      return { status: 404, message: 'Usuário não encontrado !' };
    }
  }

  static async deleteTodo(data: toDo, id: number, login: string) {
    const userTodoExist = todoDatas.find((todo) => todo.login === login);
    if (userTodoExist) {
      const dataExist = userTodoExist.todo.find((todo) => todo.title === data.title);
      if (dataExist) {
        userTodoExist.todo.splice(id, 1);

        return { status: 200, message: 'Tarefa deletada com sucesso !', todo: userTodoExist.todo };
      } else {
        return { status: 404, message: 'Tarefa não encontrada !' };
      }
    } else {
      return { status: 404, message: 'Usuário não encontrado !' };
    }
  }

  static async concludeTodo(data: toDo, id: number, login: string) {
    const userTodoExist = todoDatas.find((todo) => todo.login === login);
    if (userTodoExist) {
      const dataExist = userTodoExist.todo.find((todo) => todo.title === data.title);
      if (dataExist) {
        dataExist.finish = true;

        return { status: 200, message: 'Tarefa concluida com sucesso !', todo: userTodoExist.todo };
      } else {
        return { status: 404, message: 'Tarefa não encontrada !' };
      }
    } else {
      return { status: 404, message: 'Usuário não encontrado !' };
    }
  }
  static async editTodoItem(data: string, id: number, login: string, prevData: toDo) {
    const userTodoExist = todoDatas.find((todo) => todo.login === login);

    if (userTodoExist) {
      const dataAlreadyExist = userTodoExist.todo.find((todoData) => todoData.title === data);
      if (dataAlreadyExist) {
        return { status: 409, message: 'Ja existe uma tarefa com esse titulo !' };
      } else {
        userTodoExist.todo[id].title = data;
        return { status: 200, message: 'Tarefa editada com sucesso !', todo: userTodoExist.todo };
      }
    } else {
      return { status: 404, message: 'Usuário não encontrado !' };
    }
  }
}
