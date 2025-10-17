import { type FieldValues, type FieldPath } from 'react-hook-form';

import { type RHFControllerProps } from '../types/controller.types';
import RHFController from './RHFController';

const createRHFController = <TFieldValues extends FieldValues>() => {
  const RHFControllerComponent = <
    C extends React.ElementType,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: RHFControllerProps<TFieldValues, C, TName>,
  ) => <RHFController {...props} />;

  RHFControllerComponent.displayName = 'RHFControllerComponent';

  return RHFControllerComponent;
};

export { createRHFController };
