# 📝TaskMaster📝

TaskMaster é um TodoList desenvolvido como parte do processo de entrevista da empresa MXM Group.

## ⚙️Tecnologias Utilizadas
* ReactNative; 
* NativeWind;
* TypeScript;
* Expo;
* React Native Toast Message;

## 🚀Instalação

Faça o clone deste repositório usando o comando:

```bash
git clone https://github.com/Lucas-Martins97/TaskMaster.git
```

Após o clone ser concluído, direcione-se para a pasta:
```bash
cd TaskMaster
```
E instale as dependências (npm ou yarn):
```bash
npm install
```

Por fim, rode o comando:
```bash
npx expo start
```


## 📱 Visualização no Dispositivo

⚠️ É recomendável baixar o aplicativo do Expo no celular para leitura do QR Code que surgirá no terminal. A partir dele, será iniciada a visualização. ⚠️

* ⚠️ **Nota**: A versão Web (Desktop) está disponível, mas não foi totalmente implementada. Pode conter bugs ou apresentar comportamentos inesperados.

⚠️ Em caso de qualquer erro, me comunique. Para reiniciar a aplicação, basta ir ao terminal e pressionar a tecla **R**. ⚠️

## 🔒Login e Cadastro
Existem alguns usuários com cadastros criados e alguns deles já possuem tarefas como teste. Fique à vontade para acessar:
* Login: teste@gmail.com
 
* senha: Teste@teste123

⚠️O Campo Login não é case sensitive, todavia a senha sim !⚠️

## 📑Criação de novas tarefas e Kanban
A criação de novas tarefas ocorre através do input disponível na página após o login. Após digitar o nome da tarefa, será questionado em qual kanban deseja utilizar. Caso não tenha nenhum criado, ou caso deseje criar outro, basta clicar no botão "Novo".

A criação de um novo kanban solicita um **hex** para background. É necessário o uso da hashtag. Exemplo: #2b373d. Pode ser criada uma função para captar a cor através de um color picker (não implementado neste momento devido ao tempo hábil de produção). Todavia, colocando o hex, funciona perfeitamente.

* Na página **Home**, ao lado de "Tarefas", existe a palavra "Lista" que, ao ser clicada, alterna entre os modelos **Lista** e **Kanban**.


## 📱 Download

Para fazer o download do apk você pode acessar o link: [Build Expo](https://expo.dev/accounts/zazoe/projects/TaskMaster/builds/274ffac1-c08c-42b0-83a7-318f5b9aa1a7)


## 💾 Dados  

Os dados ficam salvos de login para login até a reinicialização da aplicação, caso esteja utilizando o aplicativo instalado, quando fechar toda a aplicação os dados adicionados serão perdidos. Para aplicações rodando através do **npx expo start** enquanto o terminal estiver rodando, os dados — mesmo entre logins diferentes — permanecerão salvos.

# Documentação das Rotas

## ↗️ Rotas  
📂 **routeController** 📂

### Endpoints / Métodos
<details>

<summary>

Clique Aqui para mais informações de rotas 

</summary>

#### 1. **login(data: userData)**

Realiza login do usuário, verificando se o usuário existe e se a senha está correta.

- **Parâmetros:**
  - `data` (userData): Objeto com campos `login` e `password`.

- **Retorno:**
  - `200` - Login feito com sucesso.
  - `404` - Senha ou email incorretos.

---

#### 2. **register(data: userData)**

Registra um novo usuário se ainda não existir um usuário com o mesmo login.

- **Parâmetros:**
  - `data` (userData): Objeto com os dados do usuário (`login`, `password`, etc).

- **Retorno:**
  - `200` - Usuário cadastrado com sucesso.
  - `409` - Usuário já cadastrado.

---

#### 3. **getTodo(login: string)**

Busca as tarefas do usuário. Se o usuário não possuir tarefas, cria listas padrão para ele.

- **Parâmetros:**
  - `login` (string): Login do usuário.

- **Retorno:**
  - `200` + objeto `todo` contendo as listas de tarefas do usuário.
  - Se o usuário não existir, cria um novo registro com listas padrão e retorna mensagem de inclusão.

---

#### 4. **setTodo(data: itemsData, login: string)**

Adiciona uma nova tarefa em uma lista kanban específica do usuário.

- **Parâmetros:**
  - `data` (itemsData): Objeto contendo `kanbanTitle` e `itemTitle`.
  - `login` (string): Login do usuário.

- **Retorno:**
  - `200` - Tarefa criada com sucesso + lista atualizada de tarefas.
  - `409` - Tarefa já existe.
  - `404` - Usuário não encontrado.

---

#### 5. **deleteTodo(kanban: toDo, item: itemHandle, id: number, login: string)**

Deleta uma tarefa específica de uma lista kanban do usuário.

- **Parâmetros:**
  - `kanban` (toDo): Objeto com a lista kanban onde a tarefa está.
  - `item` (itemHandle): Objeto da tarefa a ser deletada.
  - `id` (number): Identificador da tarefa (não usado no código mas passado).
  - `login` (string): Login do usuário.

- **Retorno:**
  - `200` - Tarefa deletada com sucesso + lista atualizada.
  - `404` - Usuário, Kanban ou Tarefa não encontrados.

---

#### 6. **concludeTodo(kanban: toDo, item: itemHandle, id: number, login: string)**

Marca uma tarefa como concluída.

- **Parâmetros:**
  - `kanban` (toDo): Objeto do kanban da tarefa.
  - `item` (itemHandle): Objeto da tarefa.
  - `id` (number): ID da tarefa.
  - `login` (string): Login do usuário.

- **Retorno:**
  - `200` - Tarefa marcada como concluída + lista atualizada.
  - `404` - Usuário ou tarefa não encontrados.

---

#### 7. **editTodoItem(newTitle: string, index: number, login: string, newKanbanTitle: string)**

Edita o título de uma tarefa e/ou move a tarefa para outro kanban.

- **Parâmetros:**
  - `newTitle` (string): Novo título da tarefa.
  - `index` (number): Índice do kanban original na lista do usuário.
  - `login` (string): Login do usuário.
  - `newKanbanTitle` (string): Título do kanban de destino.

- **Retorno:**
  - `200` - Tarefa atualizada com sucesso + lista atualizada.
  - `404` - Usuário, Kanban original, Kanban destino ou tarefa não encontrados.
  - Mensagem indicando se nenhuma alteração foi detectada.

---

#### 8. **createKanban(login: string, kanbanName: string, kanbanColor: string)**

Cria um novo kanban para o usuário, se não existir um kanban com o mesmo nome.

- **Parâmetros:**
  - `login` (string): Login do usuário.
  - `kanbanName` (string): Nome do novo kanban.
  - `kanbanColor` (string): Cor de fundo do kanban.

- **Retorno:**
  - `200` - Kanban criado com sucesso + lista atualizada.
  - `409` - Kanban já existe.
  - `404` - Usuário não encontrado.

---

#### 9. **deleteKanban(kanban: toDo, login: string)**

Deleta um kanban específico do usuário.

- **Parâmetros:**
  - `kanban` (toDo): Kanban a ser deletado.
  - `login` (string): Login do usuário.

- **Retorno:**
  - `200` - Kanban deletado com sucesso + lista atualizada.
  - `404` - Usuário ou Kanban não encontrados.

---

#### Tipos utilizados

```ts
type userData = {
  login: string;
  password: string;
};

type toDo = {
  kanbanTitle: string;
  bgKanbanColor: string;
  list: itemHandle[];
};

type itemHandle = {
  title: string;
  finish: boolean;
};

type toDoData = {
  login: string;
  todo: toDo[];
};

type itemsData = {
  kanbanTitle: string;
  itemTitle: string;
};


```


</details>


## 🤝 Fique a vontade em contribuir

Solicitações de *pull* são bem-vindas. Para alterações significativas, abra uma issue primeiro
para discutir o que você gostaria de alterar.

Certifique-se de atualizar os testes conforme apropriado.

## Licença

Este projeto está licenciado sob os termos da licença [MIT](https://choosealicense.com/licenses/mit/)
