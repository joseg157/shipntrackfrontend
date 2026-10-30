import React, { useEffect } from 'react';
import {
  useFormContext,
  useController,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';

import {
  TextField,
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from '@mui/material';

import type {
  TextFieldProps,
  AutocompleteProps,
  AutocompleteValue,
  CheckboxProps,
  // FormControlProps,
  // FormControlLabelProps,
  // FormHelperTextProps,
} from '@mui/material';
import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker';

const useClearFieldOnDisable = <TFieldValues extends FieldValues>(
  name: Path<TFieldValues>,
  disabled?: boolean,
) => {
  const { resetField } = useFormContext<TFieldValues>();

  useEffect(() => {
    if (disabled) {
      resetField(name);
    }
  }, [disabled, name, resetField]);
};

const createRHFController = <TFieldValues extends FieldValues>() => {
  interface GenericControllerProps<TName extends Path<TFieldValues>> {
    name: TName;
    label?: string;
    rules?: Omit<
      RegisterOptions<TFieldValues, TName>,
      'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >;
    disabled?: boolean;
  }

  // props
  type TextFieldControllerProps<TName extends Path<TFieldValues>> = GenericControllerProps<TName> &
    TextFieldProps & {
      componentType: 'textfield';
    };

  type DatePickerControllerProps<TName extends Path<TFieldValues>> = GenericControllerProps<TName> &
    DatePickerProps & {
      componentType: 'datepicker';
    };

  type CheckboxControllerProps<TName extends Path<TFieldValues>> = GenericControllerProps<TName> &
    CheckboxProps & {
      componentType: 'checkbox';
    };

  type AutocompleteControllerProps<
    TName extends Path<TFieldValues>,
    TValue,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
  > = GenericControllerProps<TName> &
    Omit<AutocompleteProps<TValue, Multiple, DisableClearable, FreeSolo>, 'renderInput'> & {
      componentType: 'autocomplete';
    };

  type RHFControllerProps<TName extends Path<TFieldValues>> =
    | TextFieldControllerProps<TName>
    | DatePickerControllerProps<TName>
    | CheckboxControllerProps<TName>
    | AutocompleteControllerProps<TName, unknown, boolean, boolean, boolean>;

  // components
  function TextFieldController<TName extends Path<TFieldValues>>({
    name,
    label,
    rules,
    disabled,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentType,
    ...textFieldProps
  }: TextFieldControllerProps<TName>) {
    const { control } = useFormContext<TFieldValues>();

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      rules: disabled ? undefined : rules,
      disabled,
    });

    useClearFieldOnDisable(name, disabled);

    return (
      <TextField
        {...textFieldProps}
        onChange={field.onChange}
        onBlur={field.onBlur}
        name={field.name}
        value={field.value}
        disabled={field.disabled}
        label={label}
        inputRef={field.ref}
        error={!!error}
        helperText={error?.message}
      />
    );
  }

  function DatePickerController<TName extends Path<TFieldValues>>({
    label,
    name,
    rules,
    disabled,
    slotProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentType,
    ...datePickerProps
  }: DatePickerControllerProps<TName>) {
    const { control } = useFormContext<TFieldValues>();

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      rules: disabled ? undefined : rules,
      disabled,
    });

    useClearFieldOnDisable(name, disabled);

    return (
      <DatePicker
        {...datePickerProps}
        onChange={field.onChange}
        name={field.name}
        value={field.value}
        disabled={field.disabled}
        label={label}
        inputRef={field.ref}
        slotProps={{
          ...slotProps,
          textField: {
            ...slotProps?.textField,
            onBlur: field.onBlur,
            error: !!error,
            helperText: error?.message,
          },
        }}
      />
    );
  }

  function CheckboxController<TName extends Path<TFieldValues>>({
    name,
    label,
    rules,
    disabled,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentType,
    ...checkboxProps
  }: CheckboxControllerProps<TName>) {
    const { control } = useFormContext<TFieldValues>();

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      rules: disabled ? undefined : rules,
      disabled,
    });

    useClearFieldOnDisable(name, disabled);

    if (!label) {
      return (
        <Checkbox
          {...checkboxProps}
          color={error ? 'error' : 'primary'}
          checked={field.value ?? false}
          onChange={(event) => field.onChange(event.target.checked)}
          onBlur={field.onBlur}
          slotProps={{ input: { ref: field.ref } }}
        />
      );
    }

    return (
      <FormControl error={!!error} disabled={field.disabled}>
        <FormControlLabel
          label={label}
          control={
            <Checkbox
              {...checkboxProps}
              checked={field.value ?? false}
              onChange={(event) => field.onChange(event.target.checked)}
              onBlur={field.onBlur}
              slotProps={{
                input: {
                  ref: field.ref,
                },
              }}
            />
          }
        />
        {/* <FormHelperText>{error?.message}</FormHelperText> */}
        {error?.message && <FormHelperText>{error?.message}</FormHelperText>}
      </FormControl>
    );
  }

  function AutocompleteController<
    TName extends Path<TFieldValues>,
    TValue,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
  >({
    label,
    name,
    rules,
    disabled,
    multiple,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentType,
    ...autocompleteProps
  }: AutocompleteControllerProps<TName, TValue, Multiple, DisableClearable, FreeSolo>) {
    const { control } = useFormContext<TFieldValues>();

    const {
      field,
      fieldState: { error },
    } = useController({
      name,
      control,
      rules: disabled ? undefined : rules,
      disabled,
    });

    useClearFieldOnDisable(name, disabled);

    const value = (multiple ? (field.value ?? []) : (field.value ?? null)) as AutocompleteValue<
      TValue,
      Multiple,
      DisableClearable,
      FreeSolo
    >;

    return (
      <Autocomplete
        {...autocompleteProps}
        multiple={multiple}
        value={value}
        onChange={(_, newValue) => field.onChange(newValue)}
        onBlur={field.onBlur}
        disabled={field.disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            name={field.name}
            inputRef={field.ref}
            label={label}
            error={!!error}
            helperText={error?.message}
          />
        )}
      />
    );
  }

  // Function overloads for the controller components
  function RHFController<TName extends Path<TFieldValues>>(
    props: TextFieldControllerProps<TName>,
  ): React.JSX.Element;
  function RHFController<TName extends Path<TFieldValues>>(
    props: DatePickerControllerProps<TName>,
  ): React.JSX.Element;

  function RHFController<TName extends Path<TFieldValues>>(
    props: CheckboxControllerProps<TName>,
  ): React.JSX.Element;

  function RHFController<
    TName extends Path<TFieldValues>,
    TValue,
    Multiple extends boolean | undefined = false,
    DisableClearable extends boolean | undefined = false,
    FreeSolo extends boolean | undefined = false,
  >(
    props: AutocompleteControllerProps<TName, TValue, Multiple, DisableClearable, FreeSolo>,
  ): React.JSX.Element;

  function RHFController<TName extends Path<TFieldValues>>(props: RHFControllerProps<TName>) {
    switch (props.componentType) {
      case 'textfield':
        return <TextFieldController {...props} />;
      case 'datepicker':
        return <DatePickerController {...props} />;
      case 'autocomplete':
        return <AutocompleteController {...props} />;
      case 'checkbox':
        return <CheckboxController {...props} />;
      default:
        return <div className="tw:text-red-500">Unsupported component type</div>;
    }
  }

  RHFController.displayName = 'RHFController';

  return RHFController;
};

export default createRHFController;
