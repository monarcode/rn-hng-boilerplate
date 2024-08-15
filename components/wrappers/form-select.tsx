import * as SelectPrimitive from '@rn-primitives/select';
import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import Select, { SelectProps } from '../shared/select';

import { THEME } from '~/constants/theme';

interface FormSelectProps<TFieldValues extends FieldValues>
  extends Omit<SelectProps, 'onValueChange' | 'value'> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: any;
  errorMessage?: string;
  label: string;
}

/**
 * FormSelect is a custom select input component that integrates with React Hook Form.
 * It wraps the Select component and adds form control, must be used with zod.
 *
 * @template TFieldValues - The type of the form values
 * @param {FormSelectProps<TFieldValues>} props - The component props
 * @param {FieldPath<TFieldValues>} props.name - The name of the form field, must match key in zod schema
 * @param {Control<TFieldValues>} props.control - The form control object from React Hook Form
 * @param {string} [props.errorMessage] - Custom error message to display, passed from zod
 * @param {string} props.label - Label for the select input field
 * @param {SelectProps['options']} props.options - Array of options for the select input
 * @param {string} [props.placeholder] - Placeholder text for the select input
 * @param {(open: boolean) => void} [props.onOpenChange] - Callback function when the select opens or closes
 * @param {number | string} [props.width] - Width of the select input
 * @param {string} [props.iconColor] - Color of the select icon
 * @param {ViewStyle} [props.containerStyle] - Style for the select container
 * @param {Omit<SelectProps, 'onValueChange' | 'value'>} props - Other props inherited from Select component
 *
 * @returns {React.ReactElement} A controlled select input component
 *
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import FormSelect from './FormSelect';
 *
 * function MyForm() {
 *   const { control } = useForm();
 *
 *   return (
 *     <FormSelect
 *       name="country"
 *       control={control}
 *       label="Country"
 *       options={[
 *         { label: 'USA', value: 'usa' },
 *         { label: 'Canada', value: 'canada' },
 *         { label: 'UK', value: 'uk' }
 *       ]}
 *       placeholder="Select a country"
 *     />
 *   );
 * }
 * ```
 *
 * @see {@link https://react-hook-form.com/get-started#ReactNative React Hook Form with React Native}
 */
function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  errorMessage,
  options,
  placeholder,
  onOpenChange,
  width,
  iconColor,
  containerStyle,
  label,
  ...selectProps
}: FormSelectProps<TFieldValues>): React.ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOption = options.find((option) => option.value === value);

        return (
          <View style={styles.container}>
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <Select
              options={options}
              placeholder={placeholder}
              onValueChange={(selectedValue: SelectPrimitive.Option) => {
                const option = options.find((opt) => opt.value === selectedValue?.value);
                if (option) {
                  onChange(option.value);
                }
              }}
              onOpenChange={onOpenChange}
              width={width}
              iconColor={iconColor}
              containerStyle={[containerStyle, error && styles.errorInput]}
              value={selectedOption?.value}
              {...selectProps}
            />
            {(error || errorMessage) && (
              <Text style={styles.errorText}>{error?.message || errorMessage}</Text>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 10,
  },
  errorInput: {
    borderColor: THEME.colors.error,
  },
  errorText: {
    color: THEME.colors.error,
    fontSize: THEME.fontSize.sm,
    marginTop: 4,
    fontFamily: THEME.fontFamily.regular,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: THEME.fontFamily.regular,
    marginBottom: 4,
  },
});

export default FormSelect;
