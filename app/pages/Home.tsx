import { View, Text, TouchableOpacity } from 'react-native';
import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';
import InputComponent from 'app/components/InputComponent';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import routeController from 'app/route/routeController';
import { toDo } from 'app/config/types';
import { useForm, Controller } from 'react-hook-form';

export default function Home() {
  const { theme } = useTheme();
  const [todoList, setTodoList] = useState<toDo[]>([]);
  const [login, setLogin] = useState<string>();
  useEffect(() => {
    const getData = async () => {
      let data = await AsyncStorage.getItem('user');
      console.log(data);

      if (data) {
        setLogin(data);

        const get = await routeController.getTodo(data);
        if (get && get.todo) {
          setTodoList(get.todo);
        }
      }

      // console.log(get);
    };
    getData();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<toDo>({
    defaultValues: {
      title: '',
      finish: false,
    },
  });

  const onSubmit = async (data: toDo) => {
    if (login) {
      const post = await routeController.setTodo(data, login);
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
      <View>
        {todoList.map((todo, i) => (
          <View
            key={i}
            className={`items-cente mb-[20px] flex h-[40px] flex-row items-center  justify-center rounded-[10px] border-[1px] ${todo.finish && 'border-green-700 bg-green-300'} ${theme === 'dark' && !todo.finish ? 'border-purple-700 bg-purple-400' : 'border-blue-700 bg-blue-400'} px-[30px]`}>
            <Text
              className={`text-[20px] font-medium ${todo.finish && 'text-green-800 line-through'}`}>
              {todo.title}
            </Text>
            {!todo.finish && (
              <>
                <Text className="ml-[30px] mt-[5px] ">✅</Text>

                <Text className="ml-[30px] mt-[5px] ">🗑️</Text>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
