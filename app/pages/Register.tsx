import { View, Text } from 'react-native';
import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';
import { useEffect, useState } from 'react';
import InputComponent from 'app/components/InputComponent';
import { useForm, Controller } from 'react-hook-form';
import routeController from 'app/route/routeController';
import ToastMessage from 'app/utils/Toast';
import ButtonComponent from 'app/components/ButtonComponent';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { userData, RootStackParamList } from 'app/config/types';

export default function Register() {
  const [showError, setShowError] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { theme } = useTheme();
  const onInvalid = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

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

  const onSubmit = async (data: userData) => {
    const normalizeData = {
      login: data.login.toLowerCase(),
      password: data.password,
    };
    const request = await routeController.register(normalizeData);
    if (request.status === 409) {
      await ToastMessage.error({
        text1: '⚠️Ops !⚠️',
        text2: request.message,
        type: 'error',
      });
    } else {
      await ToastMessage.error({
        text1: '🥳Sucesso🥳',
        text2: request.message,
        type: 'success',
      });
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    }
  };

  return (
    <View className="mx-auto w-[100%]">
      <View>
        <Text
          className={`${Theme.getTextColor(theme)} mb-[20px] text-center text-[25px] font-bold`}>
          Cadastro
        </Text>
      </View>
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

      <ButtonComponent cta="Cadastrar" function={handleSubmit(onSubmit, onInvalid)} />
      {showError && (
        <View className="mx-auto mt-[20px] w-[80%] items-center justify-center rounded-[10px] border-[1px] border-red-700 bg-red-200 p-[10px] ">
          <Text className="text-red-800">Preencha todos os campos !</Text>
        </View>
      )}
    </View>
  );
}
