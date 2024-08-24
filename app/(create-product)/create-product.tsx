import { Stack } from 'expo-router';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicHeader from '~/components/basic-header';

import GoBack from '~/components/go-back';
import KeyboardAwareWrapper from '~/components/keyboard-aware-wrapper';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import CreateProductForm from '~/modules/products/components/create-product-form';

const CreateProductScreen = () => {
  return (
    <>
      <BasicHeader label="Add a Product" />
      <KeyboardAwareWrapper>
        <SafeAreaView
          edges={['top', 'bottom']}
          style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}>
            <CreateProductForm />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAwareWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    rowGap: THEME.spacing.xl,
    flexGrow: 1,
    paddingBottom: 10,
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
