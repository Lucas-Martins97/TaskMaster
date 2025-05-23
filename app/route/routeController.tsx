import { toDo, toDoData, userData, itemsData, itemHandle } from 'app/config/types';
import usersData from 'app/db/usersData';
import todoDatas from 'app/db/todoData';

export default class routeController {
  private static getUserTodo(login: string) {
    const userTodoExist = todoDatas.find((todo) => todo.login === login);
    if (!userTodoExist) throw new Error('Usuário não encontrado');
    return userTodoExist;
  }

  // Realiza login do usuário, verificando existência e senha

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

  // Registra um novo usuário se não existir com o mesmo login
  static async register(data: userData) {
    const userExist = usersData.find((dbData) => dbData.login === data.login);
    if (userExist) {
      return { status: 409, message: 'Usuário já cadastrado!' };
    } else {
      usersData.push(data);
      return { status: 200, message: 'Usuário cadastrado com sucesso!' };
    }
  }

  // Busca as tarefas do usuário; cria listas padrão se for novo usuário
  static async getTodo(login: string) {
    const userTodoExist = this.getUserTodo(login);

    if (userTodoExist) {
      return { status: 200, todo: userTodoExist.todo };
    } else {
      if (login) {
        const newTodoUser: toDoData = {
          login: login,
          todo: [
            {
              kanbanTitle: 'Tarefas',
              bgKanbanColor: '#d58a24',
              list: [],
            },
            {
              kanbanTitle: 'Aguardando',
              bgKanbanColor: '#78be67',
              list: [],
            },
            {
              kanbanTitle: 'Concluidos',
              bgKanbanColor: '#f5f8b0',
              list: [],
            },
          ],
        };
        todoDatas.push(newTodoUser);
        return { status: 200, message: 'Novo usuário incluso para criar tarefas' };
      }
    }
  }

  // Adiciona uma tarefa em uma lista kanban do usuário
  static async setTodo(data: itemsData, login: string) {
    const userTodoExist = this.getUserTodo(login);

    if (userTodoExist) {
      const kanbanAlreadyExist = userTodoExist.todo.find(
        (kanban) => kanban.kanbanTitle === data.kanbanTitle
      );
      if (kanbanAlreadyExist) {
        const dataExist = kanbanAlreadyExist.list.find((item) => item.title === data.itemTitle);
        if (dataExist) {
          return { status: 409, message: 'Tarefa já existe !' };
        }
        const sendData: { finish: boolean; title: string } = {
          finish: false,
          title: data.itemTitle,
        };
        kanbanAlreadyExist.list.push(sendData);
        return { status: 200, message: 'Tarefa criada com sucesso !', todo: userTodoExist.todo };
      } else {
      }
    } else {
      return { status: 404, message: 'Usuário não encontrado !' };
    }
  }

  // Deleta uma tarefa específica de uma lista kanban
  static async deleteTodo(kanban: toDo, item: itemHandle, id: number, login: string) {
    const userTodoExist = this.getUserTodo(login);

    if (!userTodoExist) {
      return { status: 404, message: 'Usuário não encontrado !' };
    }

    const kanbanAlreadyExist = userTodoExist.todo.find(
      (kanbanData) => kanbanData.kanbanTitle === kanban.kanbanTitle
    );
    if (!kanbanAlreadyExist) {
      return { status: 404, message: 'Kanban não encontrado !' };
    }

    const dataIndex = kanbanAlreadyExist.list.findIndex((data) => data.title === item.title);
    if (dataIndex === -1) {
      return { status: 404, message: 'Tarefa não encontrada !' };
    }

    kanbanAlreadyExist.list.splice(dataIndex, 1);

    return {
      status: 200,
      message: 'Tarefa deletada com sucesso !',
      todo: userTodoExist.todo,
    };
  }

  // Marca uma tarefa como concluída
  static async concludeTodo(kanban: toDo, item: itemHandle, id: number, login: string) {
    const userTodoExist = this.getUserTodo(login);

    if (userTodoExist) {
      const kanbanAlreadyExist = userTodoExist.todo.find(
        (kanbanData) => kanbanData.kanbanTitle === kanban.kanbanTitle
      );
      if (kanbanAlreadyExist) {
        const dataExist = kanbanAlreadyExist.list.find((data) => data.title === item.title);
        if (dataExist) {
          dataExist.finish = true;
          return {
            status: 200,
            message: 'Tarefa concluída com sucesso !',
            todo: userTodoExist.todo,
          };
        } else {
          return { status: 404, message: 'Tarefa não encontrada !' };
        }
      }
    } else {
      return { status: 404, message: 'Usuário não encontrado !' };
    }
  }

  // Edita título e/ou muda a tarefa de kanban
  static async editTodoItem(
    newTitle: string,
    index: number, // índice do kanban original
    login: string,
    newKanbanTitle: string
  ) {
    const userTodoExist = this.getUserTodo(login);

    if (!userTodoExist) {
      return { status: 404, message: 'Usuário não encontrado!' };
    }

    const currentKanban = userTodoExist.todo[index];
    if (!currentKanban) {
      return { status: 404, message: 'Kanban original não encontrado!' };
    }

    // Busca o item original pelo título antigo
    const item = currentKanban.list.find((i) => i.title === newTitle || i.title);
    if (!item) {
      return { status: 404, message: 'Tarefa não encontrada!' };
    }

    const originalTitle = item.title;
    const originalKanbanTitle = currentKanban.kanbanTitle;

    const titleChanged = item.title !== newTitle;
    const kanbanChanged = originalKanbanTitle !== newKanbanTitle;

    if (!titleChanged && !kanbanChanged) {
      return { status: 200, message: 'Nenhuma alteração detectada.' };
    }

    if (kanbanChanged) {
      // Remove do kanban original
      currentKanban.list = currentKanban.list.filter((i) => i !== item);

      // Adiciona ao novo kanban
      const newKanban = userTodoExist.todo.find((data) => data.kanbanTitle === newKanbanTitle);
      if (!newKanban) {
        return { status: 404, message: 'Kanban de destino não encontrado!' };
      }

      if (titleChanged) {
        item.title = newTitle;
      }

      newKanban.list.push(item);
    } else if (titleChanged) {
      // Apenas altera o título no mesmo kanban
      item.title = newTitle;
    }

    return { status: 200, message: 'Tarefa atualizada com sucesso!', todo: userTodoExist.todo };
  }

  // Cria um novo kanban para o usuário, se não existir com o mesmo nome
  static async createKanban(login: string, kanbanName: string, kanbanColor: string) {
    const userTodoExist = this.getUserTodo(login);

    if (userTodoExist) {
      const kanbanAlreadyExist = userTodoExist.todo.find(
        (kanban) => kanban.kanbanTitle === kanbanName
      );
      if (kanbanAlreadyExist) {
        return { status: 409, message: 'Kanban já existe !' };
      } else {
        userTodoExist.todo.push({
          kanbanTitle: kanbanName,
          bgKanbanColor: kanbanColor,
          list: [],
        });
        return { status: 200, message: 'Kanban criado com sucesso !', todo: userTodoExist.todo };
      }
    } else {
      return { status: 404, message: 'Usuário não encontrado !' };
    }
  }

  // Deleta um kanban específico do usuário

  static async deleteKanban(kanban: toDo, login: string) {
    const userTodoExist = this.getUserTodo(login);

    if (!userTodoExist) {
      return { status: 404, message: 'Usuário não encontrado !' };
    }

    const index = userTodoExist.todo.findIndex((data) => data.kanbanTitle === kanban.kanbanTitle);
    if (index === -1) {
      return { status: 404, message: 'Kanban não encontrado !' };
    }

    userTodoExist.todo.splice(index, 1);

    return {
      status: 200,
      message: 'Kanban deletado com sucesso !',
      todo: userTodoExist.todo,
    };
  }
}
