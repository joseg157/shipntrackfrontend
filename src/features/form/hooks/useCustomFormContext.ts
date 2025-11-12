import { useFormContext } from 'react-hook-form';

import type { FormContextValues } from '../interfaces/form.types';

const useCustomFormContext = <T extends Record<string, unknown>>() => {
  const context = useFormContext<T>() as FormContextValues<T> | undefined;

  if (!context) {
    throw new Error('useCustomFormContext must be used within a FormProvider');
  }

  return context;
};

export { useCustomFormContext };
