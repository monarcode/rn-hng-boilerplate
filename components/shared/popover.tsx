import * as PopoverPrimitive from '@rn-primitives/popover';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { THEME } from '~/constants/theme';

/**
 * Flexible Popover component.
 * Api inspired by shadcn-ui
 *
 *
 * @example
 * <Popover>
 *   <PopoverTrigger>Click Me</PopoverTrigger>
 *   <PopoverContent>
 *     <Text>Popover Content</Text>
 *   </PopoverContent>
 * </Popover>
 */
const Popover = PopoverPrimitive.Root;

/**
 * PopoverTrigger component.
 *
 * @example
 * <PopoverTrigger>Click Me</PopoverTrigger>
 *
 * @link https://rn-primitives.vercel.app/popover/#trigger
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * PopoverContent component.
 *
 * @example
 * <PopoverContent>
 *   <Text>Popover Content</Text>
 * </PopoverContent>
 *
 * @link https://rn-primitives.vercel.app/popover/#content
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ children, style, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content ref={ref} {...props}>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.content, style]}>
        {children}
      </Animated.View>
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = 'PopoverContent';

const styles = StyleSheet.create({
  content: {
    backgroundColor: THEME.colors.white,
    padding: 16,
    borderRadius: 8,
    shadowColor: THEME.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export { Popover, PopoverContent, PopoverTrigger };
