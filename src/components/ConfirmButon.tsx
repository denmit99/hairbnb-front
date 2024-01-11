import "./RegLog.css";

interface Props {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

function ConfirmButton({ children, disabled, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : () => {}}
      className={disabled ? "disabled-button" : "register-button"}
    >
      {children}
    </button>
  );
}

export default ConfirmButton;
