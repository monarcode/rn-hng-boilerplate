import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';
export const copyToClipboard = async (value: string) => {
  try {
    await Clipboard.setStringAsync(value);
    Toast.show({
      type: 'success',
      props: {
        title: 'Success',
        description: 'Copied to Clipboard',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
