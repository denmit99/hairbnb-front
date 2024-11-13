import "./Button.css";

interface Props {
  children: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  wide?: boolean;
  red?: boolean;
}

function ConfirmButton({ children, disabled, wide, red, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={!disabled ? onClick : () => {}}
      className={`${wide ? "confirm-button-wide" : {}} ${
        disabled ? "disabled-button" : "confirm-button"
      } ${red ? "confirm-button-red" : {}} `}
    >
      {children}
    </button>
  );
}

export default ConfirmButton;
