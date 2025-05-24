import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

import useTheme from 'app/utils/hooks/useTheme';
import ToastMessage from 'app/utils/Toast';
import routeController from 'app/route/routeController';
import { toDo, itemHandle } from 'app/config/types';
import useLogin from 'app/utils/hooks/useLogin';
import InputTodoForm from './InputTodoForm';

export default function KanbanView() {
  const { theme } = useTheme(); // Obtém o tema atual (dark ou light)
  const [todoList, setTodoList] = useState<toDo[]>([]); // Estado para lista de kanbans
  const [isEditing, setIsEditing] = useState(false); // Controle do modal de edição aberto ou fechado
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Índice do item em edição
  const [editedTitle, setEditedTitle] = useState<string>(''); // Título editado do item
  const [editedKanban, setEditedKanban] = useState<string>(''); // Kanban selecionado na edição
  const { login } = useLogin(); // Hook customizado para obter dados do login do usuário

  useEffect(() => {
    // Busca inicial dos dados do todo list para o usuário logado
    const getData = async () => {
      const get = await routeController.getTodo(login);
      if (get?.todo) {
        setTodoList(get.todo);
      }
    };
    getData();
  }, []);

  // Função para deletar um item específico dentro de um kanban
  const handleDeleteItem = async (kanban: toDo, item: itemHandle, id: number) => {
    if (login) {
      const request = await routeController.deleteTodo(kanban, item, id, login);
      if (request) {
        if (request.status !== 200) {
          await ToastMessage.error({ text1: '⚠️Ops !⚠️', text2: request.message, type: 'error' });
        } else {
          if (request.todo) {
            setTodoList([...request.todo]);
          } else {
            setTodoList([]);
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

  // Função para deletar um kanban inteiro, com confirmação via Alert
  const handleDeleteKanban = async (kanban: toDo, index: number) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente deletar o kanban "${kanban.kanbanTitle}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            if (login) {
              const request = await routeController.deleteKanban(kanban, login);
              if (request.status !== 200) {
                ToastMessage.error({ text1: '⚠️Ops !⚠️', text2: request.message, type: 'error' });
              } else {
                if (request.todo) {
                  setTodoList([...request.todo]);
                  ToastMessage.success({
                    text1: '🥳Sucesso🥳',
                    text2: request.message,
                    type: 'success',
                  });
                }
              }
            }
          },
        },
      ]
    );
  };

  // Função para marcar um item como concluído

  const handleConcludeItem = async (kanban: toDo, item: itemHandle, id: number) => {
    const request = await routeController.concludeTodo(kanban, item, id, login);
    if (request) {
      if (request.status !== 200) {
        await ToastMessage.error({ text1: '⚠️Ops !⚠️', text2: request.message, type: 'error' });
      } else {
        if (request.todo) {
          setTodoList([...request.todo]);
        } else {
          setTodoList([]);
        }
        await ToastMessage.success({
          text1: '🥳Sucesso🥳',
          text2: request.message,
          type: 'success',
        });
      }
    }
  };

  // Função para atualizar o título de um item de tarefa
  const handleUpdateItem = async (title: string, id: number, kanbanTitle: string) => {
    const request = await routeController.editTodoItem(title, id, login, kanbanTitle);
    if (request) {
      if (request.status !== 200) {
        await ToastMessage.error({ text1: '⚠️Ops !⚠️', text2: request.message, type: 'error' });
      } else {
        if (request.todo) {
          setTodoList([...request.todo]);
        } else {
          setTodoList([]);
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
    <View className="mx-auto w-[90%]">
      <InputTodoForm todoList={todoList} setTodoList={setTodoList} />
      <ScrollView
        horizontal
        className={`mt-4 h-[550px] rounded-[10px] border-[1px] ${theme === 'dark' ? 'border-purple-700' : 'border-blue-700'} p-[10px]`}>
        {todoList.map((kanban, i) => (
          <View key={i} className="mr-4 w-[300px] rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <Text className="mb-2 text-center text-[20px] font-bold  text-black dark:text-white">
              {kanban.kanbanTitle}
            </Text>
            <ScrollView>
              {kanban.list
                .sort((a, b) => Number(a.finish) - Number(b.finish))
                .map((item, index) => (
                  <View
                    key={item.title}
                    style={{
                      backgroundColor: item.finish ? '#4ade80' : kanban.bgKanbanColor,
                    }}
                    className="mb-3 rounded-lg p-3">
                    <TouchableOpacity
                      disabled={item.finish}
                      onPress={() => {
                        if (!item.finish) {
                          setIsEditing(true);
                          setEditedTitle(item.title);
                          setEditingIndex(i);
                          setEditedKanban(kanban.kanbanTitle);
                        }
                      }}>
                      <Text
                        className={`text-base font-medium text-black dark:text-white ${item.finish && 'line-through'}`}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>

                    <View className="mt-2 flex-row justify-end">
                      {item.finish ? (
                        <TouchableOpacity onPress={() => handleDeleteItem(kanban, item, i)}>
                          <Image
                            source={require('../../assets/icon/trash.png')}
                            className="h-[24px] w-[24px]"
                          />
                        </TouchableOpacity>
                      ) : (
                        <>
                          <TouchableOpacity onPress={() => handleConcludeItem(kanban, item, i)}>
                            <Image
                              source={require('../../assets/icon/check.png')}
                              className="mr-3 h-[24px] w-[24px]"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => handleDeleteItem(kanban, item, i)}>
                            <Image
                              source={require('../../assets/icon/trash.png')}
                              className="h-[24px] w-[24px]"
                            />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={() => handleDeleteKanban(kanban, i)}>
              <Image
                source={require('../../assets/icon/trash.png')}
                className="h-[24px] w-[24px]"
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Modal para edição de tarefa */}
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
