import { View, TextInput, TextInputProps, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';
type InputComponentProps = TextInputProps & {
  name: string;
};

export default function InputComponent({ name, ...props }: InputComponentProps) {
  const { theme } = useTheme();

  const [isPassword, setIsPassword] = useState(true);
  return (
    <View
      className={` mx-auto mb-[20px] flex w-[80%] flex-row items-center justify-between rounded-[10px]  border-[1px]  px-[20px] ${theme === 'dark' ? 'border-white' : 'border-gray-500'} `}>
      <TextInput
        {...props}
        secureTextEntry={name === 'password' && isPassword ? true : false}
        placeholderTextColor={theme === 'dark' ? 'white' : 'gray'}
        className={`${Theme.getTextColor(theme)} w-[90%]`}
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
