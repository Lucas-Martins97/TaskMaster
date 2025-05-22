import { toDo, userData } from 'app/config/types';
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
    }
  }
  static async setTodo(data: toDo, login: string) {
    console.log(login);
    console.log(data);
    const userTodoExist = todoDatas.find((todo) => todo.login === login);

    if (userTodoExist) {
      userTodoExist.todo.push(data);
    }
  }
}
