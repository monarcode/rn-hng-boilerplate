import { StatusBar } from 'expo-status-bar';
import { Modal as NModal, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import { ScreenContent } from '~/components/ScreenContent';
import { toastConfig } from '~/libs/toast-config';

export default function Modal() {
  return (
    <>
      <ScreenContent path="app/modal.tsx" title="Modal" />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <NModal>
        <Toast config={toastConfig} />
      </NModal>
    </>
  );
}
