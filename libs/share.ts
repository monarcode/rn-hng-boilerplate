import { Share } from 'react-native';
import Toast from 'react-native-toast-message';

export const onShare = async (value: string) => {
  try {
    const result = await Share.share({
      message: `${value}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Toast.show({
      type: 'error',
      props: {
        title: 'Error',
        description: error.message,
      },
    });
  }
};
