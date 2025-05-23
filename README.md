# 📝TaskMaster📝

TaskMaster é um TodoList desenvolvido como parte do processo de entrevista da empresa MXM Group.
## 🚀Instalação

Faça o clone desse repositório usando o comando.

```bash
git clone https://github.com/Lucas-Martins97/TaskMaster.git
```

Após o clone concluído se direcione para a pasta:
```bash
cd TaskMaster
```
E instale as dependencias (npm ou yarn)
```bash
npm install
```

Por fim rode o comando:
```bash
npx expo start
```


## 📱 Visualização no Dispositivo

⚠️É recomendável baixar o aplicativo do expo no celular para leitura do QrCode que irá surgir no terminal, a partir dele será iniciado a visualização⚠️

* ⚠️ Nota: A versão Web (Desktop) está disponível, mas não foi totalmente implementada. Pode conter bugs ou apresentar comportamentos inesperados.

⚠️Em caso de qualquer erro me comunique, para reiniciar a aplicação basta ir no terminal e pressionar a tecla R⚠️

## 🔒Login e Cadastro
Existem alguns usuários com cadastros criados e alguns deles ja possuem tarefas como teste fique a vontade para acessar:
* Login: teste@gmail.com
 
* senha: Teste@teste123

⚠️O Campo Login não é case sensitive, todavia a senha sim !⚠️

## 📑Criação de novas tarefas e Kanban
A criação de novas tarefas ocorre através do Input disponivel na página após o login, após digitar o nome da tarefa será questionado em qual kanban deseja utilizar, caso não tenha nenhum criado ou caso queira criar outro basta clicar no botão "novo".

A criação de um novo Kanban solicita um **Hex para Background**, é necessário o uso do **HashTag** exemplo: #2b373d, pode ser criado uma função para captar a cor através de um color picker, não implementado neste momento devido o tempo hábil de produção. Todavia, colocando o hex funciona perfeitamente.

* Na página Home ao lado de Tarefas existe a palavra "Lista" que ao ser clicada pode alternar entre o modelo Lista e Kanban

## 💾 Dados  

Os dados ficam salvos de login para login até reinicialização da aplicação, enquanto o terminal estiver rodando os dados por mais que em logins diferentes ficaram salvos.

## 🤝 Fique a vontade em contribuir

Solicitações de pull são bem-vindas. Para alterações significativas, abra uma issue primeiro
para discutir o que você gostaria de alterar.

Certifique-se de atualizar os testes conforme apropriado.

## Licença

Este projeto está licenciado sob os termos da licença [MIT](https://choosealicense.com/licenses/mit/)
