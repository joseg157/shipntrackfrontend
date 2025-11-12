import { useEffect } from 'react';
import { useController, type FieldValues, type FieldPath } from 'react-hook-form';
import {
  TextField,
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import type {
  BaseRHFControllerProps,
  TextFieldRHFControllerProps,
  DatePickerRHFControllerProps,
  AutocompleteRHFControllerProps,
  CheckboxRHFControllerProps,
} from '../../interfaces/controller.types';
import { useCustomFormContext } from '../../hooks/useCustomFormContext';

function RHFController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: unknown) {
  const { name, componentType, disabled, label, rules, shouldUnregister, ...rest } =
    props as BaseRHFControllerProps<TFieldValues, TName>;

  if (!name) {
    throw new Error('The "name" prop is required for RHFController.');
  }

  const { control, clearErrors, readOnly } = useCustomFormContext<TFieldValues>();

  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({ control, name, rules, shouldUnregister, disabled });

  useEffect(() => {
    if (disabled) {
      clearErrors(name);
    }
  }, [clearErrors, disabled, name]);

  if (componentType === 'textfield') {
    //  why is this needed? b/c base 'props' are included in 'rest' does not exclude them
    const { slotProps, ...textFieldProps } = rest as Omit<
      TextFieldRHFControllerProps<TFieldValues, TName>,
      keyof BaseRHFControllerProps<TFieldValues, TName>
    >;

    return (
      <TextField
        {...field}
        {...textFieldProps}
        label={label}
        inputRef={ref}
        error={!!error}
        helperText={error?.message}
        slotProps={{
          ...slotProps,
          input: {
            ...slotProps?.input,
            readOnly,
          },
        }}
      />
    );
  }

  if (componentType === 'datepicker') {
    const { slotProps, ...datePickerProps } = rest as Omit<
      DatePickerRHFControllerProps<TFieldValues, TName>,
      keyof BaseRHFControllerProps<TFieldValues, TName>
    >;

    return (
      <DatePicker
        {...field}
        {...datePickerProps}
        label={label}
        inputRef={ref}
        readOnly={readOnly}
        slotProps={{
          ...slotProps,
          textField: {
            ...slotProps?.textField,
            error: !!error,
            helperText: error?.message,
          },
        }}
        enableAccessibleFieldDOMStructure={false}
      />
    );
  }

  if (componentType === 'checkbox') {
    const { slotProps, customSlotProps, ...checkboxProps } = rest as Omit<
      CheckboxRHFControllerProps<TFieldValues, TName>,
      keyof BaseRHFControllerProps<TFieldValues, TName>
    >;

    return (
      <FormControl {...customSlotProps?.formControl} error={!!error} disabled={field.disabled}>
        <FormControlLabel
          {...customSlotProps?.formControlLabel}
          control={
            <Checkbox
              {...field}
              checked={field.value}
              onChange={(event) => field.onChange(event.target.checked)}
              {...checkboxProps}
              slotProps={{
                ...slotProps,
                input: {
                  ...slotProps?.input,
                  ref,
                  readOnly,
                },
              }}
            />
          }
          label={label}
        />
        <FormHelperText {...customSlotProps?.formHelperText}>{error?.message}</FormHelperText>
      </FormControl>
    );
  }

  if (componentType === 'groupcheckbox') {
    return <div>CheckboxGroup RHFController</div>;
  }

  if (componentType === 'autocomplete') {
    const { textfieldProps, ...autocompleteProps } = rest as Omit<
      AutocompleteRHFControllerProps<TFieldValues, TName, unknown, boolean, boolean, boolean>,
      keyof BaseRHFControllerProps<TFieldValues, TName>
    >;

    return (
      <Autocomplete
        {...field}
        onChange={(_, newValue) => field.onChange(newValue)}
        {...autocompleteProps}
        renderInput={({ InputProps, ...params }) => (
          <TextField
            {...params}
            {...textfieldProps}
            inputRef={ref}
            error={!!error}
            helperText={error?.message}
            disabled={field.disabled}
            label={label}
            slotProps={{
              ...textfieldProps?.slotProps,
              input: {
                ...textfieldProps?.slotProps?.input,
                ...InputProps,
                readOnly,
              },
            }}
          />
        )}
      />
    );
  }

  return <div className="tw:text-red-500">Unsupported component type</div>;
}

export default RHFController;
