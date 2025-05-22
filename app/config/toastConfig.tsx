// app/config/toastConfig.ts

import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#22c55e',
        backgroundColor: '#ecfdf5',
        borderRadius: 8,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#166534',
      }}
      text2Style={{
        fontSize: 14,
        color: '#166534',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#ef4444',
        backgroundColor: '#dc3545',
        borderRadius: 8,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
      }}
      text2Style={{
        fontSize: 14,
        color: '#ffffff',
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#3b82f6',
        backgroundColor: '#eff6ff',
        borderRadius: 8,
        paddingVertical: 10,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e3a8a',
      }}
      text2Style={{
        fontSize: 14,
        color: '#1e3a8a',
      }}
    />
  ),
};
