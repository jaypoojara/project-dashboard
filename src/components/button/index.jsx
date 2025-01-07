import React from "react";
import { ButtonWrapper } from "./style";

const CustomButton = ({ variant = "conatined", label, onClick, ...props }) => {
  return (
    <ButtonWrapper variant={variant} onClick={onClick} {...props}>
      {label}
    </ButtonWrapper>
  );
};

export default CustomButton;
