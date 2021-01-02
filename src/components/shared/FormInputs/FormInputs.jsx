/**
 * @example
       <Field name="firstName_submit" validate={required}>
            {(props) => <TextInput label="Pri Nombre" placeholder="Jacintes" {...props} />}
          </Field>
 */
export const TextInput = ({ label, placeholder, input, meta, disabled }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        {...input}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
      />
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
};

/**
 * @example
          <Field name="propEnSubmit" validate={required}>
            {(props) => (
              <DropdownInput
                label="Display Name in form"
                options={[
                  { value: "val_1", displayName: "display 1" },
                  { value: "val_2", displayName: "display 2" },
                ]}
                {...props}
              />
            )}
          </Field>
 */
export const DropdownInput = ({ label, options, input, meta }) => (
  <div>
    <label>{label}</label>
    <select {...input}>
      {options &&
        options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.displayName}
          </option>
        ))}
    </select>
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </div>
);
