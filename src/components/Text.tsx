import React from "react";
import styled from "styled-components/native";

interface CustomTextProps {
    color?: string;
    fontSize?: string;
    textAlign?: "left" | "center" | "right";
    children: React.ReactNode;
    className?: string;
    fontWeight?: string;
}

const StyledText = styled.Text<CustomTextProps>`
  color: ${(props) => props.color || "black"};
  font-size: ${(props) => props.fontSize || "14px"};
  text-align: ${(props) => props.textAlign || "left"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  className: ${(props) => props.className || ""}
`;

const Text: React.FC<CustomTextProps> = ({ color, fontSize, textAlign, children, className, fontWeight }) => (
    <StyledText className={className} fontWeight={fontWeight} color={color} fontSize={fontSize} textAlign={textAlign}>
        {children}
    </StyledText>
);

export default Text;
