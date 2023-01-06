export default function Checkbox({className, text, ...rest}) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={className}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input type="checkbox" {...rest} />
      <span> {text}</span>
    </label>
  );
}
