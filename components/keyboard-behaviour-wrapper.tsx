import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';

import { View } from './shared';

const KeyboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
