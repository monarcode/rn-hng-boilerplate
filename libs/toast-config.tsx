import { Platform, StyleSheet } from 'react-native';
import { Check, X } from 'react-native-feather';
import { ToastConfig } from 'react-native-toast-message';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

type ToastIt = {
  title: string;
  description: string;
};

export const toastConfig: ToastConfig = {
  success: ({ props }: { props: ToastIt }) => {
    return (
      <View {...props} style={[styles.container, styles.successContainer]}>
        <View style={styles.row}>
          <Text size="lg" weight="semiBold" style={styles.sucessTitle}>
            {props.title}
          </Text>

          <Check width={20} height={20} color={THEME.colors.toastText.success} />
        </View>
        <Text size="sm" style={styles.successDesc}>
          {props.description}
        </Text>
      </View>
    );
  },
  error: ({ props }: { props: ToastIt }) => {
    return (
      <View {...props} style={[styles.container, styles.errorContainer]}>
        <View style={styles.row}>
          <Text size="lg" weight="semiBold" style={styles.errorTitle}>
            {props.title}
          </Text>

          <X width={20} height={20} color={THEME.colors.toastText.error} />
        </View>
        <Text size="sm" style={styles.errorDesc}>
          {props.description}
        </Text>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    top: Platform.OS === 'ios' ? 14 : 0,
    padding: 10,
    paddingHorizontal: 13,
    width: '90%',
    rowGap: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  successContainer: {
    backgroundColor: THEME.colors.toastBg.success,
  },
  errorContainer: {
    backgroundColor: THEME.colors.toastBg.error,
  },
  sucessTitle: {
    color: THEME.colors.toastText.success,
  },
  errorTitle: {
    color: THEME.colors.toastText.error,
  },
  successDesc: {
    color: THEME.colors.toastText.success,
  },
  errorDesc: {
    color: THEME.colors.toastText.error,
  },
});
