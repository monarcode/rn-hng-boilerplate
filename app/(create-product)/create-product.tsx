import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BasicHeader from '~/components/basic-header';
import KeyboardAwareWrapper from '~/components/keyboard-aware-wrapper';
import { View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import CreateProductForm from '~/modules/products/components/create-product-form';

const CreateProductScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <KeyboardAwareWrapper>
      <Stack.Screen
        options={{
          header: () => <BasicHeader label={t('Add A Product')} />,
        }}
      />
      <View style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingBottom: bottom + 10,
            },
          ]}
          showsVerticalScrollIndicator={false}>
          <CreateProductForm />
        </ScrollView>
      </View>
    </KeyboardAwareWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    rowGap: THEME.spacing.xl,
    flexGrow: 1,
    paddingBottom: 30,
  },

  subtitle: {
    color: THEME.colors.neutral[300],
    marginTop: THEME.spacing.sm,
  },
  hairline: {
    height: 1,
    width: '30%',
    backgroundColor: THEME.colors.border,
  },
  alt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    justifyContent: 'center',
  },
  link: {
    color: THEME.colors.primary,
    fontFamily: THEME.fontFamily.medium,
  },
});

export default CreateProductScreen;
