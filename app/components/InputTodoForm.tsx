import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import InputComponent from './InputComponent';
import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { toDo } from 'app/config/types';
import Theme from 'app/utils/theme';
import useTheme from 'app/utils/hooks/useTheme';
import routeController from 'app/route/routeController';
import ToastMessage from 'app/utils/Toast';
import useLogin from 'app/utils/hooks/useLogin';
interface Props {
  todoList: toDo[]; // Lista de todos os itens Kanban
  setTodoList: React.Dispatch<React.SetStateAction<toDo[]>>; // Função para atualizar a lista
}

export default function InputTodoForm({ todoList, setTodoList }: Props) {
  const { login } = useLogin(); // Hook customizado para pegar dados do login
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Controle do modal para adicionar item
  const [modalKanbanTitleVisible, setModalKanbanTitleVisible] = useState<boolean>(false); // Modal para criar novo Kanban
  const [itemTitle, setItemTitle] = useState<string>(''); // Título do item a ser adicionado
  const [kanbanTitle, setKanbanTitle] = useState<string>(''); // Título do novo Kanban
  const [kanbanBgColor, setKanbanBgColor] = useState<string>(''); // Cor de fundo do novo Kanban

  const { theme } = useTheme(); // Hook para pegar o tema atual
  interface FormData {
    title: string;
    kanbanTitle: string;
    kanbanBgColor: string;
  }

  // React Hook Form para controle dos inputs
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      kanbanTitle: '',
      kanbanBgColor: '',
    },
  });

  // Função disparada ao enviar o formulário do título da tarefa
  // Abre o modal para selecionar em qual Kanban colocar a tarefa
  const handleModal = async (data: FormData) => {
    setItemTitle(data.title);
    setModalVisible(true);
  };

  useEffect(() => {
    const getData = async () => {
      const get = await routeController.getTodo(login);
      if (get && get.todo) {
        setTodoList(get.todo);
      }
    };
    getData();
  }, []);

  // Função para criação de novo Kanban
  // Verifica se campos foram preenchidos e faz a requisição

  const handleNewKanban = async () => {
    if (kanbanBgColor.length === 0 || kanbanTitle.length === 0) {
      await ToastMessage.error({
        text1: '⚠️Ops !⚠️',
        text2: 'Os campos devem ser preenchidos',
        type: 'error',
      });
    } else {
      const request = await routeController.createKanban(login, kanbanTitle, kanbanBgColor);
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

  // Função para adicionar um item em um Kanban específico

  const handleAddItem = async (itemTitle: string, kanbanTitle: string) => {
    const request = await routeController.setTodo({ itemTitle, kanbanTitle }, login);
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
        onPress={handleSubmit(handleModal, async (formErrors) => {
          if (formErrors.title) {
            await ToastMessage.error({
              text1: '⚠️Ops !⚠️',
              text2: 'Você deve digitar o nome da tarefa',
              type: 'error',
            });
          }
        })}
        className={`mb-[20px]  ml-[10px] flex w-[60px] items-center justify-center rounded-[20px] ${Theme.getBgColor(theme)}`}>
        <Text className={` text-[40px] font-bold text-white`}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <TouchableOpacity
            className={`mx-auto my-[auto] w-[80%] rounded-[10px] border-[1px] bg-white p-[30px] `}
            onPress={() => setModalVisible(false)}>
            <View>
              <View className="flex w-[100%] flex-row justify-center">
                <Text className="text-[20px]">Adicionar </Text>
                <Text className="text-[20px] font-bold">{itemTitle}</Text>
                <Text className="text-[20px]"> em: </Text>
              </View>
              <ScrollView>
                {todoList.map((todo, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleAddItem(itemTitle, todo.kanbanTitle);
                      setModalVisible(false);
                    }}
                    style={{
                      backgroundColor: `${todo.bgKanbanColor}`,
                    }}
                    key={i}
                    className={` mt-[10px] flex-row items-center rounded-[10px] p-2`}>
                    <Text className="text-[18px] font-medium">{todo.kanbanTitle}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setModalKanbanTitleVisible(true);
                  }}
                  className="mx-auto mt-[30px] w-[40%] items-center justify-center rounded-[10px] bg-green-400 p-2 text-[16px]">
                  <Text className=" font-medium ">Novo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalKanbanTitleVisible}
        onRequestClose={() => setModalKanbanTitleVisible(false)}>
        <View className="flex-1 items-center justify-center bg-black/50">
          <TouchableOpacity
            className={`mx-auto my-[auto] w-[80%] rounded-[10px] border-[1px] bg-white p-[30px] `}
            onPress={() => setModalKanbanTitleVisible(false)}>
            <Controller
              control={control}
              name="kanbanTitle"
              rules={{ required: 'O campo de nome é obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  placeholder="Digite o titulo do kanban"
                  name="kanbanTitle"
                  value={value}
                  onChangeText={(text) => {
                    setKanbanTitle(text);
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  secureTextEntry={false}
                />
              )}
            />
            <Controller
              control={control}
              name="kanbanBgColor"
              rules={{ required: 'O campo de nome é obrigatório' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputComponent
                  placeholder="Digite o hex do BG Ex: #abc"
                  name="kanbanBgColor"
                  value={value}
                  onChangeText={(text) => {
                    setKanbanBgColor(text);
                    onChange(text);
                  }}
                  onBlur={onBlur}
                  secureTextEntry={false}
                />
              )}
            />

            <View>
              <TouchableOpacity
                onPress={() => {
                  setModalKanbanTitleVisible(false);
                  handleNewKanban();
                }}
                className="mx-auto mt-[30px] w-[40%] items-center justify-center rounded-[10px] bg-green-400 p-2 text-[16px]">
                <Text className=" font-medium">Adicionar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
