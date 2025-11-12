// Overwrite specific component props
// Utility type to overwrite properties in a type
// Ex: `type NewType = OverWrite<OldType, { newProp: string }>` will create a type with all properties of OldType
// except for `newProp` which will be of type string.
export type OverWrite<T, U> = Omit<T, keyof U> & U;
