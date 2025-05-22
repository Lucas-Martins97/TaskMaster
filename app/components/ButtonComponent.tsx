import { View, Text, TouchableOpacity } from 'react-native';
import useTheme from 'app/utils/hooks/useTheme';
import Theme from 'app/utils/theme';

type ButtonProps = {
  cta: string;
  function: () => void;
};

export default function ButtonComponent({ cta, function: handleSubmit }: ButtonProps) {
  const { theme } = useTheme();
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
