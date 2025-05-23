import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

type toastData = {
  text1: string | undefined;
  text2: string;
  type: string;
};

export default class ToastMessage {
  static async success(data: toastData) {
    Toast.show({
      type: data.type,
      text1: data.text1,
      text2: data.text2,
      position: 'top',
      visibilityTime: 2000,
    });
  }
  static async error(data: toastData) {
    Toast.show({
      type: data.type,
      text1: data.text1,
      text2: data.text2,
      position: 'top',
      visibilityTime: 1000,
    });
  }
}
