import { toDoData } from 'app/config/types';

const toDoDatas: toDoData[] = [
  {
    login: 'teste@gmail.com',
    todo: [
      {
        kanbanTitle: 'Mercado',
        bgKanbanColor: '#9ca619',
        list: [
          {
            title: 'Comprar Pão',
            finish: false,
          },
          {
            title: 'Comprar Ovos',
            finish: false,
          },
          {
            title: 'Comprar Manga',
            finish: true,
          },
        ],
      },
      {
        kanbanTitle: 'Tarefas',
        bgKanbanColor: '#1930a6',
        list: [
          {
            title: 'Ir ao Mercado',
            finish: true,
          },
          {
            title: 'Daily as 16h',
            finish: false,
          },
          {
            title: 'Programar App',
            finish: true,
          },
        ],
      },
    ],
  },
  {
    login: 'tamara@gmail.com',
    todo: [
      {
        kanbanTitle: 'Prioridade',
        bgKanbanColor: '#FF3B30',
        list: [
          {
            title: '🎉Contratar Lucas🎉',
            finish: false,
          },
        ],
      },
    ],
  },
  {
    login: 'marcel@gmail.com',
    todo: [
      {
        kanbanTitle: 'Prioridade',
        bgKanbanColor: '#FF3B30',
        list: [
          {
            title: '🎉Contratar Lucas🎉',
            finish: false,
          },
        ],
      },
    ],
  },
];

export default toDoDatas;
