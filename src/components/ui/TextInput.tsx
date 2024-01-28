import "./Input.css";

interface BasicInputProps {
  placeholder?: string;
  type?: string;
  invalid?: boolean;
  number?: boolean;
  onChange?: (event: any) => void;
}

interface TextInputProps extends BasicInputProps {
  errorMsg?: string;
}

function TextInput({ errorMsg, ...rest }: TextInputProps) {
  return (
    <div className="text-input-container">
      <p className="input-error-message">{errorMsg ? errorMsg : <></>}</p>
      <BasicInput {...rest} />
    </div>
  );
}

function BasicInput({ placeholder, type, invalid, onChange }: BasicInputProps) {
  return (
    <input
      className="basic-input"
      placeholder={placeholder}
      onChange={onChange}
      type={type}
      style={
        invalid
          ? //  Move this styling to css
            {
              borderColor: "red",
              backgroundColor: "rgb(255, 200, 200)",
            }
          : {}
      }
    />
  );
}

export default TextInput;
