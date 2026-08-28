import { FormProvider, useForm, type FieldValues } from 'react-hook-form';
import Button from '@mui/material/Button';

import type { FormProps, FormContextValues } from '../interfaces/form.types';

function Form<T extends FieldValues>({
  defaultValues,
  useFormProps,
  readOnly,

  children,
  footer,

  onSubmit = () => {},
  onError,

  slotProps = {},
  cancelButtonText = 'Cancel',
  hideCancelButton = true,
  submitButtonText = 'Submit',
  hideSubmitButton = false,
  onCancel: handleOnCancel,
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    shouldFocusError: true,
    ...useFormProps,
  });

  const { handleSubmit, reset } = methods;

  const formContextValues: FormContextValues<T> = {
    ...methods,
    readOnly,
  };

  const onReset = () => {
    handleOnCancel?.();
    reset(defaultValues);
  };

  const shouldHideBothButtons = Boolean(hideCancelButton && hideSubmitButton);

  return (
    <FormProvider {...formContextValues}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        {...slotProps?.formContainerProps}
        className="tw:space-y-4"
      >
        {children}

        {footer ||
          (readOnly || shouldHideBothButtons ? null : (
            <div className="tw:flex tw:justify-end tw:gap-2">
              {!hideCancelButton && (
                <Button
                  variant="outlined"
                  color="secondary"
                  type="button"
                  {...slotProps?.cancelButtonProps}
                  onClick={onReset}
                >
                  {cancelButtonText}
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                type="submit"
                {...slotProps?.submitButtonProps}
              >
                {submitButtonText}
              </Button>
            </div>
          ))}
      </form>
    </FormProvider>
  );
}

export { Form };
