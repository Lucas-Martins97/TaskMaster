import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import useTheme from 'app/utils/hooks/useTheme';
import InputComponent from 'app/components/InputComponent';
import ButtonComponent from 'app/components/ButtonComponent';
import { useForm, Controller } from 'react-hook-form';
import routeController from 'app/route/routeController';
import ToastMessage from 'app/utils/Toast';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList, userData } from 'app/config/types';
import Theme from 'app/utils/theme';
import useLogin from 'app/utils/hooks/useLogin';

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { theme } = useTheme();
  const { setLogin } = useLogin();
  const [showError, setShowError] = useState<boolean>(false);

  // Configuração inicial do formulário com valores padrão
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<userData>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  // Exibe mensagem de erro por 3 segundos caso os campos estejam inválidos
  const onInvalid = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  // Lógica de login: envia dados normalizados para a API e trata a resposta
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
      setLogin(normalizeData.login);
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
      <ButtonComponent cta="Entrar" function={handleSubmit(onSubmit, onInvalid)} />
      {showError && (
        <View className="mx-auto mt-[20px] w-[80%] items-center justify-center rounded-[10px] border-[1px] border-red-700 bg-red-200 p-[10px] ">
          <Text className="text-red-800">Preencha todos os campos !</Text>
        </View>
      )}
    </View>
  );
}
