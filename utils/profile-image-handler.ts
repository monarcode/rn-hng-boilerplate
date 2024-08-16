import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export const pickImage = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    Toast.show({
      type: 'error',
      props: {
        title: 'Permission denied',
        description: 'Sorry, we need camera roll permissions to make this work!',
      },
    });
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    return result.assets[0].uri;
  }

  return null;
};
