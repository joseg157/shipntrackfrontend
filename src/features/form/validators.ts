import moment from 'moment';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTEGER_RE = /^\d+$/;

export const required =
  (msg = 'Required') =>
  (value: unknown): true | string => {
    if (value === null || value === undefined) return msg;

    if (typeof value === 'string') return value.trim() !== '' || msg;

    if (Array.isArray(value)) return value.length > 0 || msg;

    if (moment.isMoment(value)) return value.isValid() || msg;

    if (value instanceof Date) return !isNaN(value.getTime()) || msg;

    if (typeof value === 'number') return !isNaN(value) || msg;
    // booleans & objects count as "present"; use a dedicated rule for "must be true"
    return true;
  };

export const minLength =
  (min: number, msg?: string) =>
  (value: unknown): true | string => {
    // Let empty values pass; use `required` to enforce presence
    if (value === null || value === undefined) return true;

    if (typeof value === 'string')
      return value.trim().length >= min || msg || `Must be at least ${min} characters`;

    if (Array.isArray(value)) return value.length >= min || msg || `Must be at least ${min} items`;

    return true; // Let other types pass
  };

export const maxLength =
  (max: number, msg?: string) =>
  (value: unknown): true | string => {
    // Let empty values pass; use `required` to enforce presence
    if (value === null || value === undefined) return true;

    if (typeof value === 'string')
      return value.trim().length <= max || msg || `Must be at most ${max} characters`;

    if (Array.isArray(value)) return value.length <= max || msg || `Must be at most ${max} items`;

    return true; // Let other types pass
  };

export const email =
  (msg = 'Invalid email') =>
  (value: unknown): true | string => {
    // Let empty values pass; use `required` to enforce presence
    if (value === null || value === undefined) return true;

    if (typeof value !== 'string') return msg;

    return EMAIL_RE.test(value.trim()) || msg;
  };

export const minValue =
  (min: number, msg?: string) =>
  (value: unknown): true | string => {
    // Let empty values pass; use `required` to enforce presence
    if (value === null || value === undefined) return true;

    if (typeof value === 'number') return value >= min || msg || `Must be at least ${min}`;

    // b/c a string could represent a number, we might want to parse it
    if (typeof value === 'string') {
      const num = Number(value.trim());

      return (!isNaN(num) && num >= min) || msg || `Must be at least ${min}`;
    }

    return true; // Let other types pass
  };

export const maxValue =
  (max: number, msg?: string) =>
  (value: unknown): true | string => {
    // Let empty values pass; use `required` to enforce presence
    if (value === null || value === undefined) return true;

    if (typeof value === 'number') return value <= max || msg || `Must be at most ${max}`;

    // b/c a string could represent a number, we might want to parse it
    if (typeof value === 'string') {
      const num = Number(value.trim());

      return (!isNaN(num) && num <= max) || msg || `Must be at most ${max}`;
    }

    return true; // Let other types pass
  };

export const integer =
  (msg = 'Must be an integer') =>
  (value: unknown): true | string => {
    // Let empty values pass; use `required` to enforce presence
    if (value === null || value === undefined) return true;

    if (typeof value === 'number') return Number.isInteger(value) || msg;

    if (typeof value === 'string') {
      const trimmed = value.trim();
      const num = Number(trimmed);
      return (!isNaN(num) && Number.isInteger(num) && INTEGER_RE.test(trimmed)) || msg;
    }

    return true; // Let other types pass
  };

export const float =
  (opts: { msg?: string; decimalPlaces?: number; decimalPlaceMsg?: string } = {}) =>
  (value: unknown): true | string => {
    // Let empty values pass; use `required` to enforce presence
    const errMsg = opts?.msg ?? 'Must be a number';

    if (value === null || value === undefined) return true;

    // Technically, value type can be number or string, so we need to check both
    if (opts?.decimalPlaces !== undefined && opts?.decimalPlaces !== null) {
      const decimalPlacesErrMsg =
        opts?.decimalPlaceMsg ?? `Must have at most ${opts.decimalPlaces} decimal places`;

      const num = typeof value === 'number' ? String(value) : String(value).trim();

      const numRegex = new RegExp(`^\\d+(\\.\\d{1,${opts.decimalPlaces}})?$`);
      if (!numRegex.test(num)) return decimalPlacesErrMsg;
    }

    if (typeof value === 'number') return !isNaN(value) || errMsg;

    if (typeof value === 'string') {
      const num = Number(value.trim());
      return !isNaN(num) || errMsg;
    }

    return true; // Let other types pass
  };

export const momentRules = {
  isValid:
    (format: string | typeof moment.ISO_8601 = moment.ISO_8601, msg = 'Invalid date') =>
    (value: unknown): true | string => {
      // Let empty values pass; use `required` to enforce presence
      if (value === null || value === undefined || value === '') return true;

      const m = moment.isMoment(value) ? value : moment(value, format, true);

      return m.isValid() || msg;
    },

  isAfter:
    (refDate: string, msg?: string) =>
    (value: unknown): true | string => {
      // Let empty values pass; use `required` to enforce presence
      if (value === null || value === undefined || value === '') return true;

      const m = moment.isMoment(value) ? value : moment(value);

      return (m.isValid() && m.isAfter(refDate)) || msg || `Must be after ${refDate}`;
    },

  isBefore:
    (refDate: string, msg?: string) =>
    (value: unknown): true | string => {
      // Let empty values pass; use `required` to enforce presence
      if (value === null || value === undefined || value === '') return true;

      const m = moment.isMoment(value) ? value : moment(value);

      return (m.isValid() && m.isBefore(refDate)) || msg || `Must be before ${refDate}`;
    },

  isAfterField:
    (fieldName: string, msg?: string) =>
    (value: unknown, formValues: Record<string, unknown>): true | string => {
      // Let empty values pass; use `required` to enforce presence
      if (value === null || value === undefined || value === '') return true;

      const refValue = formValues[fieldName];

      // We skip validation if the referenced field is not present in formValues
      if (refValue === null || refValue === undefined || refValue === '') return true;

      const m = moment.isMoment(value) ? value : moment(value);
      const refMoment = moment.isMoment(refValue) ? refValue : moment(refValue);

      return (
        (m.isValid() && refMoment.isValid() && m.isAfter(refMoment)) ||
        msg ||
        `End date must be after start date`
      );
    },

  isBeforeField:
    (fieldName: string, msg?: string) =>
    (value: unknown, formValues: Record<string, unknown>): true | string => {
      // Let empty values pass; use `required` to enforce presence
      if (value === null || value === undefined || value === '') return true;

      const refValue = formValues[fieldName];

      // We skip validation if the referenced field is not present in formValues
      if (refValue === null || refValue === undefined || refValue === '') return true;

      const m = moment.isMoment(value) ? value : moment(value);
      const refMoment = moment.isMoment(refValue) ? refValue : moment(refValue);

      return (
        (m.isValid() && refMoment.isValid() && m.isBefore(refMoment)) ||
        msg ||
        `Start date must be before end date`
      );
    },
};
