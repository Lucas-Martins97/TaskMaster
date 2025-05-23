import React from 'react';
import { ThemeProvider } from './utils/context/themeContext';
import { LoginProvider } from './utils/context/loginContext';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Toast from 'react-native-toast-message';
import { toastConfig } from './config/toastConfig';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

// Wrapper para aplicar o Layout em todas as telas automaticamente
function withLayout(Component: React.ComponentType) {
  return function WrappedComponent(props: any) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
}

export default function App() {
  return (
    <ThemeProvider>
      <LoginProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={withLayout(Login)} />
            <Stack.Screen name="Cadastro" component={withLayout(Register)} />
            <Stack.Screen name="Home" component={withLayout(Home)} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </LoginProvider>
    </ThemeProvider>
  );
}
