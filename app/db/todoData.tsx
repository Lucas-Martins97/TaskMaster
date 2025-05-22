import { toDoData } from 'app/config/types';

const toDoDatas: toDoData[] = [
  {
    login: 'teste@gmail.com',
    todo: [
      {
        title: 'Primeira Tarefa',
        finish: false,
      },
      {
        title: 'Segunda Tarefa',
        finish: false,
      },
      {
        title: 'Terceira Tarefa',
        finish: true,
      },
    ],
  },
];

export default toDoDatas;
