import { View, Text, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import useTheme from 'app/utils/hooks/useTheme';
import InputComponent from 'app/components/InputComponent';
import ButtonComponent from 'app/components/ButtonComponent';
import { useForm, Controller } from 'react-hook-form';
import routeController from 'app/route/routeController';
import ToastMessage from 'app/utils/Toast';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, userData } from 'app/config/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from 'app/utils/theme';

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    const showError = async () => {
      if (errors.login || errors.password) {
        await ToastMessage.error({
          text1: 'Temos um Erro',
          text2: 'Preencha todos os Campos',
          type: 'error',
        });
      }
    };
    showError();
  }, [errors.login]);
  const onSubmit = async (data: userData) => {
    const normalizeData = {
      login: data.login.toLowerCase(),
      password: data.password,
    };
    const request = await routeController.login(normalizeData);
    if (request.status === 404) {
      await ToastMessage.error({
        text1: '⚠️Ops !⚠️',
        text2: request.message,
        type: 'error',
      });
    } else {
      await ToastMessage.success({
        text1: '🥳Sucesso🥳',
        text2: request.message,
        type: 'success',
      });
      await AsyncStorage.setItem('user', normalizeData.login);
      setTimeout(() => {
        navigation.navigate('Home');
      }, 1000);
    }
  };

  return (
    <View>
      <Text
        className={`mb-[30px] w-full text-center text-[20px] font-bold ${Theme.getTextColor(theme)}`}>
        Seja Bem-Vindo(a)
      </Text>
      <Controller
        control={control}
        name="login"
        rules={{ required: 'O campo Email é obrigatório' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputComponent
            placeholder="Digite seu email"
            name="login"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={false}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: 'A senha é obrigatória' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputComponent
            placeholder="Digite sua senha"
            name="password"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <View className="mx-auto mb-[20px] flex w-[80%] flex-row">
        <Text className={`${Theme.getTextColor(theme)}`}>Não possui conta ?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cadastro');
          }}>
          <Text className={`${Theme.getTitleColor(theme)}`}> Clique aqui !</Text>
        </TouchableOpacity>
      </View>
      <ButtonComponent cta="Entrar" function={handleSubmit(onSubmit)} />
    </View>
  );
}
