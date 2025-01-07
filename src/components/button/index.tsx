import { ButtonProps } from "@mui/material";
import { ButtonWrapper } from "./style";

type Props = ButtonProps & {
  label: string;
};
const Button = ({ variant, label, onClick, ...props }: Props) => {
  return (
    <ButtonWrapper variant={variant} onClick={onClick} {...props}>
      {label}
    </ButtonWrapper>
  );
};

export default Button;
