interface FormTitleProps {
  children: string;
}

export default function FormTitle({ children }: FormTitleProps) {
  return <p className="reglog-title">{children}</p>;
}
