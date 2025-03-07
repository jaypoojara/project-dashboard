import { ButtonProps, CircularProgress } from "@mui/material";
import { ButtonWrapper } from "./style";

type Props = ButtonProps & {
  label: string;
  loading?: boolean;
};
const Button = ({ variant, label, onClick, loading, ...props }: Props) => {
  return (
    <ButtonWrapper variant={variant} onClick={onClick} {...props}>
      {loading ? <CircularProgress size={20} /> : label}
    </ButtonWrapper>
  );
};

export default Button;
