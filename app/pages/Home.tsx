import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';
import InputComponent from 'app/components/InputComponent';
import ToastMessage from 'app/utils/Toast';
import routeController from 'app/route/routeController';
import { toDo } from 'app/config/types';

export default function Home() {
  const { theme } = useTheme();
  const [todoList, setTodoList] = useState<toDo[]>([]);
  const [login, setLogin] = useState<string>();
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      let data = await AsyncStorage.getItem('user');

      if (data) {
        setLogin(data);

        const get = await routeController.getTodo(data);
        if (get && get.todo) {
          setTodoList(get.todo);
        }
      }
    };
    getData();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<toDo>({
    defaultValues: {
      title: '',
      finish: false,
    },
  });

  const onSubmit = async (data: toDo) => {
    if (login) {
      const request = await routeController.setTodo(data, login);
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
        reset({ title: '', finish: false });
      }
    }
  };

  const handleDeleteItem = async (item: toDo, id: number) => {
    if (login) {
      const request = await routeController.deleteTodo(item, id, login);
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

  const handleConcludeItem = async (item: toDo, id: number) => {
    if (login) {
      const request = await routeController.concludeTodo(item, id, login);
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

  const handleUpdateItem = async (title: string, id: number, login: string) => {
    if (login) {
      const prevData: toDo = todoList[id];
      const request = await routeController.editTodoItem(title, id, login, prevData);
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
      <View>
        <Text
          className={`${Theme.getTextColor(theme)} mb-[20px] text-center text-[25px] font-bold`}>
          Tarefas
        </Text>
      </View>
      <View className="flex flex-row">
        <Controller
          control={control}
          name="title"
          rules={{ required: 'O campo de nome é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputComponent
              placeholder="Digite o nome da tarefa"
              name="title"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={false}
            />
          )}
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={`mb-[20px]  ml-[10px] flex w-[60px] items-center justify-center rounded-[20px] ${Theme.getBgColor(theme)}`}>
          <Text className={` text-[40px] font-bold text-white`}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        className={`h-[550px] border-[1px] ${theme === 'dark' ? 'border-purple-700' : 'border-blue-700'} rounded-[10px] px-[20px] pb-[40px] pt-[10px]`}>
        {[...todoList]
          .sort((a, b) => Number(a.finish) - Number(b.finish))
          .map((todo, i) => (
            <View
              key={i}
              className={`mb-[20px] flex flex-row items-center rounded-[10px] border-[1px] px-[20px] py-[5px] ${
                todo.finish && 'border-green-700 bg-green-300'
              } ${
                theme === 'dark' && !todo.finish
                  ? 'border-purple-700 bg-purple-400'
                  : 'border-blue-700 bg-blue-400'
              }`}>
              <Pressable
                onPress={() => {
                  setEditingIndex(i);
                  setEditedTitle(todo.title);
                  setIsEditing(true);
                }}
                className="w-[60%]">
                <Text
                  className={`flex-1 text-[20px] font-medium ${
                    todo.finish && 'text-green-800 line-through'
                  }`}>
                  {todo.title}
                </Text>
              </Pressable>

              {todo.finish ? (
                <View className="flex flex-row items-center">
                  <TouchableOpacity onPress={() => handleDeleteItem(todo, i)}>
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
                    <TouchableOpacity onPress={() => handleConcludeItem(todo, i)}>
                      <Image
                        source={require('../../assets/icon/check.png')}
                        resizeMode="contain"
                        className="mx-[20px] h-[30px] w-[30px]"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteItem(todo, i)}>
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
          ))}
      </ScrollView>
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
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => {
                  setIsEditing(false);
                  setEditingIndex(null);
                }}
                className="mr-4">
                <Text className="text-blue-500">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleUpdateItem(editedTitle, editingIndex as number, login as string);
                  setIsEditing(false);
                  setEditingIndex(null);
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
