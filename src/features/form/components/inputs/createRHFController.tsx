import React from 'react';
import { type FieldValues, type FieldPath } from 'react-hook-form';

import RHFController from './RHFController';

import type {
  TextFieldRHFControllerProps,
  DatePickerRHFControllerProps,
  AutocompleteRHFControllerProps,
  CheckboxRHFControllerProps,
} from '../../interfaces/controller.types';

const createRHFController = <TFieldValues extends FieldValues>() => {
  // Overloads for different component types

  // TextField overload
  function RHFControllerComponent<TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
    props: TextFieldRHFControllerProps<TFieldValues, TName>,
  ): React.JSX.Element;

  // DatePicker overload
  function RHFControllerComponent<TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
    props: DatePickerRHFControllerProps<TFieldValues, TName>,
  ): React.JSX.Element;

  // Checkbox overload
  function RHFControllerComponent<TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
    props: CheckboxRHFControllerProps<TFieldValues, TName>,
  ): React.JSX.Element;

  // Autocomplete overload
  function RHFControllerComponent<
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    Value = unknown,
    Multiple extends boolean | undefined = undefined,
    DisableClearable extends boolean | undefined = undefined,
    FreeSolo extends boolean | undefined = undefined,
  >(
    props: AutocompleteRHFControllerProps<
      TFieldValues,
      TName,
      Value,
      Multiple,
      DisableClearable,
      FreeSolo
    >,
  ): React.JSX.Element;

  // Implementation
  function RHFControllerComponent(props = {}) {
    return <RHFController {...props} />;
  }

  RHFControllerComponent.displayName = 'RHFControllerComponent';

  return RHFControllerComponent;
};

export { createRHFController };
