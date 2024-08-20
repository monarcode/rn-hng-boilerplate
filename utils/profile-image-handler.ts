import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickImageOrUseCamera = async (): Promise<string | undefined> => {
  // Ask the user if they want to pick from gallery or use camera
  return new Promise((resolve) => {
    Alert.alert(
      'Choose Image Source',
      'Would you like to select a picture from your gallery or take a new one?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => resolve(undefined),
        },
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            const result = await pickImage();
            resolve(result);
          },
        },
        {
          text: 'Take a Photo',
          onPress: async () => {
            const result = await takePhoto();
            resolve(result);
          },
        },
      ]
    );
  });
};

const pickImage = async (): Promise<string | undefined> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
    return undefined;
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

  return undefined;
};

const takePhoto = async (): Promise<string | undefined> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission denied', 'Sorry, we need camera permissions to make this work!');
    return undefined;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    return result.assets[0].uri;
  }

  return undefined;
};
export const resizeImage = async (uri: string) => {
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 500 } }], // Resize to width of 500, height will adjust automatically
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipulatedImage.uri;
};
