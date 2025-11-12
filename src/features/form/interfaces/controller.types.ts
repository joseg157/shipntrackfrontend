import type { FieldValues, UseControllerProps, FieldPath } from 'react-hook-form';
import type {
  TextFieldProps,
  AutocompleteProps,
  CheckboxProps,
  FormControlProps,
  FormControlLabelProps,
  FormHelperTextProps,
} from '@mui/material';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';

// import { CheckboxGroup } from '../components/inputs/CheckboxGroup';
import type { OverWrite } from '@interfaces/common.types';

type ControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<UseControllerProps<TFieldValues, TName>, 'control' | 'defaultValue'>;

type ComponentTypes = 'textfield' | 'datepicker' | 'checkbox' | 'autocomplete' | 'groupcheckbox';

export type BaseRHFControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  label?: string;
  componentType?: ComponentTypes;
} & ControllerProps<TFieldValues, TName>;

// TextField RHF Controller Props
export type TextFieldRHFControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = OverWrite<
  BaseRHFControllerProps<TFieldValues, TName>,
  {
    componentType: 'textfield';
  } & TextFieldProps
>;

// Autocomplete RHF Controller Props
export type AutocompleteRHFControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  Value,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> = OverWrite<
  BaseRHFControllerProps<TFieldValues, TName>,
  {
    componentType: 'autocomplete';
    textfieldProps?: TextFieldProps;
  } & Omit<AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo>, 'renderInput'>
>;

// Checkbox RHF Controller Props
export type CheckboxRHFControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = OverWrite<
  BaseRHFControllerProps<TFieldValues, TName>,
  {
    label?: string;
    componentType: 'checkbox';
    customSlotProps?: {
      formControl?: FormControlProps;
      formControlLabel?: Omit<FormControlLabelProps, 'control' | 'label'>;
      formHelperText?: FormHelperTextProps;
    };
  } & CheckboxProps
>;

// DatePicker RHF Controller Props
export type DatePickerRHFControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = OverWrite<
  BaseRHFControllerProps<TFieldValues, TName>,
  {
    componentType: 'datepicker';
  } & DatePickerProps
>;
