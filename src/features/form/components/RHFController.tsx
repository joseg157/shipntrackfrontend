import React, { useEffect } from 'react';

import { useController, type FieldValues, type FieldPath } from 'react-hook-form';
import {
  TextField,
  type TextFieldProps,
  Checkbox,
  type CheckboxProps,
  Autocomplete,
  type AutocompleteProps,
  FormControlLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';

import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { CheckboxGroup, type CheckboxGroupProps } from './CheckboxGroup';

import { useCustomFormContext } from '../hooks/useCustomFormContext';
import { type RHFControllerProps } from '../types/controller.types';

function RHFController<
  TFieldValues extends FieldValues,
  C extends React.ElementType,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  component: Component,
  name,
  rules,
  disabled,
  shouldUnregister,

  customSlotProps = {},
  ...rest
}: RHFControllerProps<TFieldValues, C, TName>) {
  if (!name) {
    throw new Error('The "name" prop is required for RHFController.');
  }

  const { control, clearErrors, readOnly } = useCustomFormContext<TFieldValues>();

  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({ control, name, rules, shouldUnregister });

  useEffect(() => {
    if (disabled) {
      clearErrors(name);
    }
  }, [clearErrors, disabled, name]);

  if (Component === TextField) {
    const { slotProps, ...textFieldProps } = rest as TextFieldProps;

    return (
      <TextField
        {...field}
        inputRef={ref}
        {...textFieldProps}
        slotProps={{ ...slotProps, input: { readOnly, ...slotProps?.input } }}
        error={!!error}
        helperText={error?.message}
      />
    );
  }

  if (Component === DatePicker) {
    const { slotProps, ...datePickerProps } = rest as DatePickerProps;

    return (
      <DatePicker
        {...field}
        {...datePickerProps}
        slotProps={{
          ...slotProps,
          textField: {
            ...slotProps?.textField,
            error: !!error,
            helperText: error?.message,
            inputRef: ref,
          },
        }}
      />
    );
  }

  if (Component === Checkbox) {
    const { slotProps, ...checkboxProps } = rest as CheckboxProps;

    if (!customSlotProps?.formControlLabel?.label) {
      return (
        <FormControl error={!!error}>
          <Checkbox
            {...field}
            checked={field.value}
            onChange={(event) => field.onChange(event.target.checked)}
            {...checkboxProps}
            slotProps={{
              ...slotProps,
              input: {
                ref,
                readOnly,
                ...slotProps?.input,
              },
            }}
          />

          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
      );
    }

    return (
      <FormControl error={!!error}>
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(event) => field.onChange(event.target.checked)}
              {...checkboxProps}
              slotProps={{
                ...slotProps,
                input: {
                  ref,
                  readOnly,
                  ...slotProps?.input,
                },
              }}
            />
          }
          {...customSlotProps?.formControlLabel}
        />

        <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    );
  }

  if (Component === CheckboxGroup) {
    const { options = [], ...checkboxgroupProps } = rest as CheckboxGroupProps;

    return (
      <CheckboxGroup
        {...field}
        {...checkboxgroupProps}
        options={options}
        error={!!error}
        helperText={error?.message}
      />
    );
  }

  if (Component === Autocomplete) {
    const { options = [], ...autocompleteProps } = rest as unknown as AutocompleteProps<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >;

    return (
      <Autocomplete
        value={field?.value}
        onBlur={field?.onBlur}
        disabled={disabled}
        options={options}
        onChange={(_, newValue) => {
          field?.onChange(newValue);
        }}
        {...autocompleteProps}
        renderInput={(params) => (
          <TextField
            {...params}
            {...customSlotProps?.textField}
            inputRef={ref}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    );
  }

  throw new Error(`RHFController does not support the component: ${Component}`);
}

export default RHFController;
