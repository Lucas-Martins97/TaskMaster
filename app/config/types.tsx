export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

export type userData = {
  login: string;
  password: string;
};

export type toDoData = {
  login: string;
  todo: toDo[];
};

export type toDo = {
  title: string;
  finish: boolean;
};
