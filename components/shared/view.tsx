import { View as RNView, StyleSheet } from 'react-native';

interface ViewProps extends React.ComponentProps<typeof RNView> {}

const View = ({ children, style, ...props }: ViewProps) => {
  return (
    <RNView style={[styles.default, style]} {...props}>
      {children}
    </RNView>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'transparent',
  },
});

export default View;
