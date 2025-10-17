import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  type FormControlProps,
  type FormLabelProps,
  type FormGroupProps,
  type FormHelperTextProps,
} from '@mui/material';

interface CheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options?: CheckboxGroupOption[];
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  readOnly?: boolean;

  slotProps?: {
    formControl?: FormControlProps;
    formLabel?: FormLabelProps;
    formGroup?: FormGroupProps;
    formHelperText?: FormHelperTextProps;
  };
}

function CheckboxGroup({
  options = [],
  label,
  value = [],
  onChange,
  onBlur,
  error = false,
  helperText,
  disabled = false,
  readOnly = false,
  slotProps,
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    const newValue = checked ? [...value, optionValue] : value.filter((val) => val !== optionValue);
    onChange?.(newValue);
  };

  return (
    <FormControl error={error} disabled={disabled} {...slotProps?.formControl}>
      {label && <FormLabel {...slotProps?.formLabel}>{label}</FormLabel>}
      <FormGroup row {...slotProps?.formGroup}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={value?.includes(option.value)}
                onChange={(event) => handleChange(option.value, event.target.checked)}
                onBlur={onBlur}
                disabled={option.disabled || disabled || readOnly}
              />
            }
            label={option.label}
            disabled={option.disabled}
          />
        ))}
      </FormGroup>
      {helperText && <FormHelperText {...slotProps?.formHelperText}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export { CheckboxGroup, type CheckboxGroupProps, type CheckboxGroupOption };
