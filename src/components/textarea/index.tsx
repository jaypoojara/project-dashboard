import {
  TextareaAutosize,
  TextareaAutosizeProps,
  Typography,
} from "@mui/material";
import { TextAreaWrapper } from "./style";
type Props = TextareaAutosizeProps & {
  label: string;
};
const TextArea = ({ label, ...props }: Props) => {
  return (
    <TextAreaWrapper>
      <Typography width={150} textAlign={"end"}>
        {label}
      </Typography>
      <TextareaAutosize {...props} style={{ padding: 8 }} />
    </TextAreaWrapper>
  );
};

export default TextArea;
