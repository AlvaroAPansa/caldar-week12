// https://final-form.org/docs/react-final-form/examples/field-level-validation
export const required = (value) => (value ? undefined : "Required");

export const mustBeNumber = (value) =>
  isNaN(value) ? "Must be a number" : undefined;

export const mustBeEmail = (value) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase())
    ? undefined
    : "Must be valid email";
};

export const minValue = (min) => (value) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;

export const mustBeNumString = (value) => {
  const re = /^\d+(,\d+)*$/;
  return re.test(value) 
    ? undefined 
    : "Must contain only numbers sepparated by a comma. No commas at the beginning or end"
}

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
