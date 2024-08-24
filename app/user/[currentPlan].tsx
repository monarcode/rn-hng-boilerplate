import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

export default function CurrentPlan() {
  const query = useLocalSearchParams();

  console.log(query);

  const plan = query.currectPlan;

  console.log(plan);

  return (
    <View>
      <Text>currect plan</Text>
    </View>
  );
}
