import { Pressable, PressableProps, StyleSheet } from 'react-native';

import Text from './text';

import { THEME } from '~/constants/theme';

const Button = ({ children, ...others }: ButtonProps) => {
  return (
    <Pressable style={style.container} {...others}>
      <Text style={style.text}>{children}</Text>
    </Pressable>
  );
};
export default Button;

const style = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: THEME.colors.primary,
  },
  text: {
    color: THEME.colors.white,
  },
});

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
}
