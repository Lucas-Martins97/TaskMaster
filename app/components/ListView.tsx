import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, TextInput } from 'react-native';

import useTheme from 'app/utils/hooks/useTheme';

import ToastMessage from 'app/utils/Toast';
import routeController from 'app/route/routeController';
import { toDo, itemHandle } from 'app/config/types';
import useLogin from 'app/utils/hooks/useLogin';
import InputTodoForm from './InputTodoForm';

export default function ListView() {
  const { theme } = useTheme(); // Hook para pegar o tema atual

  const [todoList, setTodoList] = useState<toDo[]>([]); // Estado principal da lista de tarefas

  // Estados para controle da edição de uma tarefa
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedKanban, setEditedKanban] = useState<string>('');

  const { login } = useLogin(); // Hook customizado para pegar dados do login

  // Busca inicial das tarefas ao montar o componente
  useEffect(() => {
    const getData = async () => {
      const get = await routeController.getTodo(login);
      if (get && get.todo) {
        setTodoList(get.todo);
      }
    };
    getData();
  }, []);

  // Função para deletar um item da lista

  const handleDeleteItem = async (kanban: toDo, item: itemHandle, id: number) => {
    if (login) {
      const request = await routeController.deleteTodo(kanban, item, id, login);
      if (request) {
        if (request.status != 200) {
          await ToastMessage.error({
            text1: '⚠️Ops !⚠️',
            text2: request.message,
            type: 'error',
          });
        } else {
          if (request.todo) {
            setTodoList([...request.todo]);
          }
          await ToastMessage.success({
            text1: '🥳Sucesso🥳',
            text2: request.message,
            type: 'success',
          });
        }
      }
    }
  };

  // Função para marcar uma tarefa como concluída

  const handleConcludeItem = async (kanban: toDo, item: itemHandle, id: number) => {
    const request = await routeController.concludeTodo(kanban, item, id, login);
    if (request) {
      if (request.status != 200) {
        await ToastMessage.error({
          text1: '⚠️Ops !⚠️',
          text2: request.message,
          type: 'error',
        });
      } else {
        if (request.todo) {
          setTodoList([...request.todo]);
        }
        await ToastMessage.success({
          text1: '🥳Sucesso🥳',
          text2: request.message,
          type: 'success',
        });
      }
    }
  };

  // Função para atualizar o título e kanban de uma tarefa
  const handleUpdateItem = async (title: string, id: number, kanbanTitle: string) => {
    const request = await routeController.editTodoItem(title, id, login, kanbanTitle);
    if (request) {
      if (request.status != 200) {
        await ToastMessage.error({
          text1: '⚠️Ops !⚠️',
          text2: request.message,
          type: 'error',
        });
      } else {
        if (request.todo) {
          setTodoList([...request.todo]);
        }
        await ToastMessage.success({
          text1: '🥳Sucesso🥳',
          text2: request.message,
          type: 'success',
        });
      }
    }
  };

  return (
    <View className="mx-auto w-[80%]">
      <InputTodoForm todoList={todoList} setTodoList={setTodoList} />
      <ScrollView
        className={`h-[550px] border-[1px] ${theme === 'dark' ? 'border-purple-700' : 'border-blue-700'} rounded-[10px] px-[20px] pb-[40px] pt-[10px]`}>
        {todoList.map((todo, i) => (
          <View key={i}>
            {todo.list
              .sort((a, b) => Number(a.finish) - Number(b.finish))
              .map((item, index) => (
                <View
                  key={item.title}
                  style={{
                    backgroundColor: `${item.finish ? '#4ade80' : `${todo.bgKanbanColor}`}`,
                  }}
                  className={` mb-[20px]  flex-row justify-between rounded-[10px] p-[10px]`}>
                  <View className="">
                    <TouchableOpacity
                      disabled={item.finish}
                      onPress={() => {
                        if (!item.finish) {
                          setIsEditing(true);
                          setEditedTitle(item.title);
                          setEditingIndex(i); // index do kanban
                          setEditedKanban(todo.kanbanTitle);
                        }
                      }}>
                      <Text className={`text-[18px] font-medium  ${item.finish && 'line-through'}`}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                    <Text>{todo.kanbanTitle}</Text>
                  </View>

                  <View className="">
                    {item.finish ? (
                      <View className="flex flex-row items-center">
                        <TouchableOpacity onPress={() => handleDeleteItem(todo, item, i)}>
                          <Image
                            source={require('../../assets/icon/trash.png')}
                            resizeMode="contain"
                            className="ml-[70px] h-[30px] w-[30px]"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <View className="flex flex-row items-center">
                          <TouchableOpacity onPress={() => handleConcludeItem(todo, item, i)}>
                            <Image
                              source={require('../../assets/icon/check.png')}
                              resizeMode="contain"
                              className="mx-[20px] h-[30px] w-[30px]"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDeleteItem(todo, item, i)}>
                            <Image
                              source={require('../../assets/icon/trash.png')}
                              resizeMode="contain"
                              className="h-[30px] w-[30px]"
                            />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              ))}
          </View>
        ))}
      </ScrollView>

      {/* Modal para editar a tarefa */}

      <Modal visible={isEditing} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-[80%] rounded-[10px] bg-white p-4">
            <Text className="mb-2 text-[18px] font-semibold text-black">Editar tarefa</Text>

            <TextInput
              value={editedTitle}
              onChangeText={setEditedTitle}
              autoFocus
              className="mb-4 rounded border border-gray-400 px-3 py-2 text-black"
            />

            <ScrollView className="mb-4 max-h-[150px]">
              {todoList.map((kanban) => (
                <TouchableOpacity
                  key={kanban.kanbanTitle}
                  onPress={() => setEditedKanban(kanban.kanbanTitle)}
                  className={`rounded p-2 ${editedKanban === kanban.kanbanTitle ? 'bg-blue-300' : ''}`}>
                  <Text>{kanban.kanbanTitle}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(false);
                  setEditingIndex(null);
                  setEditedTitle('');
                  setEditedKanban('');
                }}
                className="mr-4">
                <Text className="text-blue-500">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await handleUpdateItem(editedTitle, editingIndex as number, editedKanban);
                  setIsEditing(false);
                  setEditingIndex(null);
                  setEditedTitle('');
                  setEditedKanban('');
                }}>
                <Text className="text-green-600">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
