import { ButtonWrapper } from "./style";
import { LoadingButtonProps } from "@mui/lab";

type Props = LoadingButtonProps & {
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
