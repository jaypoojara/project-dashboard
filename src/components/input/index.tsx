import { TextField, TextFieldProps, Typography } from "@mui/material";
import { InputWrapper } from "./style";
type Props = TextFieldProps & {
  label: string;
};
const Input = ({ name, label, value, onChange, ...props }: Props) => {
  return (
    <InputWrapper>
      <Typography width={150} textAlign={"end"}>
        {label}
      </Typography>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        size="small"
        slotProps={{ htmlInput: { "data-testid": name } }}
        {...props}
      />
    </InputWrapper>
  );
};

export default Input;
