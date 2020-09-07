// Props Type
export type FormProps = {} & React.HTMLProps<HTMLFormElement>;

// Component
export default function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}

// Initial Props
Form.defaultProps = {};
