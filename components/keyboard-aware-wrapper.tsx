import React, { ComponentProps } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = ComponentProps<typeof KeyboardAwareScrollView>;

const KeyboardAwareWrapper = ({ children, ...props }: Props) => (
  <KeyboardAwareScrollView
    enableOnAndroid
    enableResetScrollToCoords={false}
    keyboardShouldPersistTaps="handled"
    {...props}>
    {children}
  </KeyboardAwareScrollView>
);

export default KeyboardAwareWrapper;
