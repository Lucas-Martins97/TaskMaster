import { View, Text, TouchableOpacity } from 'react-native';
import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';

type ButtonProps = {
  cta: string; // Texto exibido no botão
  function: () => void; // Função executada ao pressionar o botão
};

export default function ButtonComponent({ cta, function: handleSubmit }: ButtonProps) {
  const { theme } = useTheme(); // Obtém o tema atual (dark ou light)
  return (
    <View className="mx-auto w-[50%] rounded-[10px]">
      <TouchableOpacity
        onPress={handleSubmit}
        className={` rounded-[10px] py-[10px] ${Theme.getBgColor(theme)}`}>
        <Text className={`text-center text-[20px] font-bold text-white`}>{cta}</Text>
      </TouchableOpacity>
    </View>
  );
}
