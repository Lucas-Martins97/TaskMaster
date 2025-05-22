import { SafeAreaView, StatusBar, View, Image, Text, TouchableOpacity } from 'react-native';
import './styles/global.css';
import useTheme from './utils/hooks/useTheme';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { setTheme, theme } = useTheme();

  return (
    <SafeAreaView className={`flex-1 ${theme === 'dark' ? 'bg-bgBlack' : 'bg-white'}`}>
      <StatusBar
        backgroundColor={theme === 'dark' ? '#000' : '#fff'}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View className="mt-[40px] flex-1">
        <View className="absolute  flex w-full flex-row text-center ">
          <Text
            className={`my-auto mt-[20px] w-[90%] pl-[40px] ${theme === 'dark' ? 'text-brandPurple' : 'text-brandBlue'} text-center text-[30px] font-bold`}>
            TaskMaster
          </Text>
          <TouchableOpacity onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            <Image
              source={
                theme === 'dark'
                  ? require('../assets/png/sun.png')
                  : require('../assets/png/moon.png')
              }
              className="h-10 w-10"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View className="mt-[80px] flex-1">{children}</View>
      </View>
    </SafeAreaView>
  );
}
