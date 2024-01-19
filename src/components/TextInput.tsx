import "./RegLog.css";

interface Props {
  placeholder: string;
  errorMsg?: string;
  type?: string;
  invalid?: boolean;
  onChange: (event: any) => void;
}

function TextInput({ placeholder, type, invalid, errorMsg, onChange }: Props) {
  return (
    <>
      <p className="input-error-message">{errorMsg ? errorMsg : <></>}</p>
      <input
        className="reglog-input"
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
    </>
  );
}

export default TextInput;
