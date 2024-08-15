import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onExpire?: () => void;
  resetTimer?: () => void;
}

const Timer: React.FC<TimerProps> = ({
  initialMinutes = 0,
  initialSeconds = 59,
  onExpire,
  resetTimer,
}) => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else if (minutes > 0 && seconds === 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else if (minutes === 0 && seconds === 0) {
        clearInterval(timerInterval);
        onExpire?.();
        resetTimer?.();
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [minutes, seconds, onExpire, resetTimer]);

  return (
    <View style={styles.timerContainer}>
      <Text weight="semiBold" style={styles.timerText}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: THEME.colors.primary,
    fontSize: THEME.fontSize.md,
  },
});

export default Timer;
