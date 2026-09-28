import { useFormContext, type FieldValues } from 'react-hook-form';

import type { FormContextValues } from '../interfaces/form.types';

const useCustomFormContext = <TFieldValues extends FieldValues>() => {
  const context = useFormContext<TFieldValues>() as FormContextValues<TFieldValues> | undefined;

  if (!context) {
    throw new Error('useCustomFormContext must be used within a FormProvider');
  }

  return context;
};

export { useCustomFormContext };
