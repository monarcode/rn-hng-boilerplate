import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import TextInput, { TextInputProps } from '../shared/input';

import { THEME } from '~/constants/theme';

interface FormTextInputProps<TFieldValues extends FieldValues>
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: any;
  errorMessage?: string;
  label: string;
}

/**
 * FormInput is a custom input component that integrates with React Hook Form.
 * It wraps the TextInput component and adds form control, must be used with zod.
 *
 * @template TFieldValues - The type of the form values
 * @param {FormTextInputProps<TFieldValues>} props - The component props
 * @param {FieldPath<TFieldValues>} props.name - The name of the form field, must match key in zod schema
 * @param {Control<TFieldValues>} props.control - The form control object from React Hook Form
 * @param {string} [props.errorMessage] - Custom error message to display, passed from zod
 * @param {string} props.label - Label for the input field
 * @param {Omit<TextInputProps, 'value' | 'onChangeText'>} props - Other props inherited from TextInput
 *
 * @returns {React.ReactElement} A controlled input component
 *
 * @example
 * import { useForm } from 'react-hook-form';
 * import FormInput from './FormInput';
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <FormInput
 *       name="email"
 *       control={control}
 *       label="Email"
 *       placeholder="Enter your email"
 *     />
 *   );
 * }
 *
 * @see {@link https://react-hook-form.com/get-started#ReactNative React Hook Form with React Native}
 */
function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  errorMessage,
  ...textInputProps
}: FormTextInputProps<TFieldValues>): React.ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TextInput
            {...textInputProps}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            containerStyle={
              [textInputProps.containerStyle as ViewStyle, error && styles.errorInput] as ViewStyle
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

export default FormInput;
