export interface RootStackParamList {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
}

export interface userData {
  login: string;
  password: string;
}

export interface toDoData {
  login: string;
  todo: toDo[];
}

export interface toDo {
  kanbanTitle: string;
  bgKanbanColor: string;
  list: {
    title: string;
    finish: boolean;
  }[];
}

export interface listOptions {
  label: string;
  value: string;
}

export interface itemsData {
  itemTitle: string;
  kanbanTitle: string;
}

export interface itemHandle {
  title: string;
  finish: boolean;
}
