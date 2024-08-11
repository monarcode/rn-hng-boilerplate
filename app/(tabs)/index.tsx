import { Button, Text, View } from '~/components/shared';

const HomeScreen = () => {
  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <Text>HomeScreen</Text>
      <Button>Go to Modal</Button>
    </View>
  );
};
export default HomeScreen;
