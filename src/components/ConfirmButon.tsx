import "./RegLog.css";

interface Props {
  children: string;
  onClick: () => void;
}

function ConfirmButton({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className="register-button">
      {children}
    </button>
  );
}

export default ConfirmButton;
