import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import PasswordInput, { PasswordInputProps } from '../shared/password-input';

import { THEME } from '~/constants/theme';

interface FormPasswordInputProps<TFieldValues extends FieldValues>
  extends Omit<PasswordInputProps, 'value' | 'onChangeText'> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: any;
  errorMessage?: string;
  label: string;
}

/**
 * FormPasswordInput is a custom password input component that integrates with React Hook Form.
 * It wraps the PasswordInput component and adds form control, must be used with zod.
 *
 * @template TFieldValues - The type of the form values
 * @param {FormPasswordInputProps<TFieldValues>} props - The component props
 * @param {FieldPath<TFieldValues>} props.name - The name of the form field, must match key in zod schema
 * @param {Control<TFieldValues>} props.control - The form control object from React Hook Form
 * @param {string} [props.errorMessage] - Custom error message to display, passed from zod
 * @param {string} props.label - Label for the password input field
 * @param {Omit<PasswordInputProps, 'value' | 'onChangeText'>} props - Other props inherited from PasswordInput
 *
 * @returns {React.ReactElement} A controlled password input component
 *
 * @example
 * import { useForm } from 'react-hook-form';
 * import FormPasswordInput from './FormPasswordInput';
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <FormPasswordInput
 *       name="password"
 *       control={control}
 *       label="Password"
 *       placeholder="Enter your password"
 *     />
 *   );
 * }
 *
 * @see {@link https://react-hook-form.com/get-started#ReactNative React Hook Form with React Native}
 */
function FormPasswordInput<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  errorMessage,
  label,
  ...passwordInputProps
}: FormPasswordInputProps<TFieldValues>): React.ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <PasswordInput
            {...passwordInputProps}
            label={label}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            containerStyle={
              [
                passwordInputProps.containerStyle as ViewStyle,
                error && styles.errorInput,
              ] as ViewStyle
            }
          />
          {(error || errorMessage) && (
            <Text style={styles.errorText}>{error?.message || errorMessage}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  errorInput: {
    borderColor: THEME.colors.error,
  },
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.fontSize.sm,
    marginTop: THEME.spacing.xs,
    fontFamily: THEME.fontFamily.regular,
  },
});

export default FormPasswordInput;
