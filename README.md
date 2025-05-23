# 📝TaskMaster📝

TaskMaster é um TodoList desenvolvido como parte do processo de entrevista da empresa MXM Group.
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

## 💾 Dados  

Os dados ficam salvos de login para login até a reinicialização da aplicação. Enquanto o terminal estiver rodando, os dados — mesmo entre logins diferentes — permanecerão salvos.

## 🤝 Fique a vontade em contribuir

Solicitações de *pull* são bem-vindas. Para alterações significativas, abra uma issue primeiro
para discutir o que você gostaria de alterar.

Certifique-se de atualizar os testes conforme apropriado.

## Licença

Este projeto está licenciado sob os termos da licença [MIT](https://choosealicense.com/licenses/mit/)
