import * as DialogPrimitive from '@rn-primitives/dialog';
import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown } from 'react-native-reanimated';

import { Text } from '~/components/shared';
import { THEME } from '~/constants/theme';

/**
 * Props for the Dialog component.
 */
interface DialogProps {
  /** Optional trigger element to open the dialog */
  trigger?: ReactNode;
  /** Title of the dialog */
  title?: string;
  /** Description or subtitle of the dialog */
  description?: string;
  /** Optional children to render inside the dialog */
  children?: ReactNode;
  /** Callback function called when the dialog is closed */
  onClose?: () => void;
  /** Callback function called when the open state changes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Optional style for the overlay */
  overlayStyle?: ViewStyle;
  /** Optional style for the content */
  contentStyle?: ViewStyle;
  /** Controls the open state of the dialog (for controlled usage) */
  open?: boolean;
  /** Shows a close button in the bottom right corner of the dialog */
  showCloseButton?: boolean;
}

/**
 * Ref interface for the Dialog component.
 */
export interface DialogRef {
  /** Function to programmatically open the dialog */
  open: () => void;
  /** Function to programmatically close the dialog */
  close: () => void;
}

/**
 * A flexible Dialog component.
 * Can be opened via trigger, ref, or 'open' prop.
 *
 * @component
 * @example
 * // Using trigger
 * <Dialog
 *   trigger={<Text>Open Dialog</Text>}
 *   title="Example Dialog"
 *   description="This is an example dialog."
 *   onOpenChange={(isOpen) => console.log('Dialog open:', isOpen)}
 * >
 *   <Text>Additional content here</Text>
 * </Dialog>
 *
 * @example
 * // Using ref
 * const dialogRef = useRef<DialogRef>(null);
 * ...
 * <Button title="Open Dialog" onPress={() => dialogRef.current?.open()} />
 * <Dialog
 *   ref={dialogRef}
 *   title="Ref-controlled Dialog"
 *   description="This dialog is opened using a ref."
 * >
 *  <Text>Optional content here</Text>
 * </Dialog>
 *
 * @example
 * // Using open prop (controlled)
 * const [isOpen, setIsOpen] = useState(false);
 * ...
 * <Button title="Toggle Dialog" onPress={() => setIsOpen(!isOpen)} />
 * <Dialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Controlled Dialog"
 *   description="This dialog's open state is controlled externally."
 * />
 */
const Dialog = forwardRef<DialogRef, DialogProps>(
  (
    {
      trigger,
      title,
      description,
      children,
      onClose,
      onOpenChange,
      overlayStyle,
      contentStyle,
      open: controlledOpen,
      showCloseButton = false,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    useEffect(() => {
      if (onOpenChange) {
        onOpenChange(isOpen);
      }
    }, [isOpen, onOpenChange]);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (!isControlled) {
          setUncontrolledOpen(true);
        }
      },
      close: () => {
        if (!isControlled) {
          setUncontrolledOpen(false);
        }
      },
    }));

    const handleOpenChange = (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      if (onOpenChange) {
        onOpenChange(open);
      }
    };

    return (
      <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay style={StyleSheet.absoluteFillObject}>
            <Animated.View
              style={[styles.overlay, overlayStyle]}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200).delay(250)}>
              <DialogPrimitive.Content style={styles.contentWrapper}>
                <Animated.View
                  style={[styles.content, contentStyle]}
                  entering={FadeInDown.duration(200).delay(250)}
                  exiting={FadeOutDown.duration(200)}>
                  {title && (
                    <DialogPrimitive.Title>
                      <Text style={styles.title}>{title}</Text>
                    </DialogPrimitive.Title>
                  )}
                  {description && (
                    <DialogPrimitive.Description>
                      <Text style={styles.description}>{description}</Text>
                    </DialogPrimitive.Description>
                  )}
                  {children}
                  {showCloseButton && (
                    <DialogPrimitive.Close onPress={onClose}>
                      <Text style={styles.closeButton}>Close</Text>
                    </DialogPrimitive.Close>
                  )}
                </Animated.View>
              </DialogPrimitive.Content>
            </Animated.View>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.259)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '88%',
  },
  content: {
    backgroundColor: THEME.colors.white,
    borderRadius: 6,
    padding: THEME.spacing.lg,
    width: '100%',
  },
  title: {
    fontSize: THEME.fontSize.xl,
    fontFamily: THEME.fontFamily.bold,
    marginBottom: 8,
  },
  description: {
    marginBottom: 16,
  },
  closeButton: {
    color: THEME.colors.primary,
    alignSelf: 'flex-end',
    marginTop: 16,
  },
});

export default Dialog;
