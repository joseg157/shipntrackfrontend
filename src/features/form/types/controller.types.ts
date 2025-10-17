import type { FieldValues, UseControllerProps, FieldPath } from 'react-hook-form';
import type { FormControlLabelProps, TextFieldProps } from '@mui/material';

export type ControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<UseControllerProps<TFieldValues, TName>, 'control' | 'defaultValue'>;

export type RHFControllerProps<
  TFieldValues extends FieldValues,
  C extends React.ElementType,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  component: C;

  customSlotProps?: {
    /**
     * Props to customize the underlying MUI checkbox label
     */
    formControlLabel?: Omit<FormControlLabelProps, 'control'>;
    /** Props to customize the underlying MUI text field for Autocomplete
     */
    textField?: Omit<TextFieldProps, 'name' | 'defaultValue' | 'inputRef'>;
  };
} & ControllerProps<TFieldValues, TName> &
  Omit<React.ComponentProps<C>, 'name' | 'defaultValue' | 'renderInput'>;
