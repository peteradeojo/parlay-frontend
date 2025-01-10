/**
 * @param {{className: string}}
 */
const Container = ({ children, className }) => {
  return (
    <div className={`px-12 py-8 text-justify ${className}`}>{children}</div>
  );
};

/**
 * @type {React.ElementType<React.InputHTMLAttributes>}
 * @returns {React.JSX.Element}
 */
const TextInput = ({
  className,
  type = "text",
  required = false,
  value = undefined,
  onChange,
  name,
  placeholder = undefined,
}) => {
  return (
    <input
      className={`${className} block border bg-slate-600 p-2 rounded`}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};

/**
 * @type {React.ElementType<React.InputHTMLAttributes>}
 * @returns {React.JSX.Element}
 */
export const DateInput = ({
  className,
  type,
  min,
  max,
  required,
  value,
  onChange,
}) => (
  <input
    type={type}
    min={min}
    max={max}
    className={`${className} block border bg-slate-600 p-2 rounded`}
    required={required}
    value={value}
    onChange={onChange}
  />
);

export const Currency = () => <>{"\u20a6"}</>;

export { Container, TextInput };
