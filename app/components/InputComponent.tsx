import { View, TextInput, TextInputProps, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';
type InputComponentProps = TextInputProps & {
  name: string; // Nome do campo para identificação, usado para lógica específica
};

export default function InputComponent({ name, ...props }: InputComponentProps) {
  const { theme } = useTheme(); // Obtém o tema atual (dark ou light)

  const [isPassword, setIsPassword] = useState(true); // Estado para controlar visibilidade da senha
  return (
    <View
      className={` mx-auto mb-[20px] flex w-[80%] flex-row items-center justify-between rounded-[10px]  border-[1px]  px-[20px] ${theme === 'dark' ? 'border-white' : 'border-gray-500'} `}>
      {name === 'password' && (
        <Image
          resizeMode="contain"
          className=" mr-[10px] h-[20px] w-[20px]"
          source={
            theme === 'dark'
              ? require('../../assets/png/locker/lockerWhite.png')
              : require('../../assets/png/locker/lockerBlack.png')
          }></Image>
      )}
      {name === 'login' && (
        <Image
          resizeMode="contain"
          className=" mr-[10px] h-[20px] w-[20px]"
          source={
            theme === 'dark'
              ? require('../../assets/png/user/userWhite.png')
              : require('../../assets/png/user/userBlack.png')
          }></Image>
      )}

      <TextInput
        {...props}
        secureTextEntry={name === 'password' && isPassword ? true : false}
        placeholderTextColor={theme === 'dark' ? 'white' : 'gray'}
        className={`${Theme.getTextColor(theme)} ${name === 'password' ? 'w-[80%]' : 'w-[90%]'}`}
      />
      {name === 'password' && (
        <TouchableOpacity
          onPress={() => {
            setIsPassword(!isPassword);
          }}>
          <Image
            resizeMode="contain"
            className=" h-[20px] w-[20px]"
            source={
              theme === 'dark'
                ? isPassword
                  ? require('../../assets/png/eyePassword/eyeSlashWhite.png')
                  : require('../../assets/png/eyePassword/eyeWhite.png')
                : isPassword
                  ? require('../../assets/png/eyePassword/eyeSlashBlack.png')
                  : require('../../assets/png/eyePassword/eyeBlack.png')
            }></Image>
        </TouchableOpacity>
      )}
    </View>
  );
}
