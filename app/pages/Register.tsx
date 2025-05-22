import { View, Text } from 'react-native';
import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';
import { useEffect } from 'react';
import InputComponent from 'app/components/InputComponent';
import { useForm, Controller } from 'react-hook-form';
import routeController from 'app/route/routeController';
import ToastMessage from 'app/utils/Toast';
import ButtonComponent from 'app/components/ButtonComponent';
import { userData } from 'app/config/types';

export default function Register() {
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
    }
  };

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
  return (
    <View className="mx-auto w-[90%]">
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
      <ButtonComponent cta="Cadastrar" function={handleSubmit(onSubmit)} />
    </View>
  );
}
