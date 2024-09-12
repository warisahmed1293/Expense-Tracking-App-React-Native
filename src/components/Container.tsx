import React from "react";
import styled from "styled-components/native";

interface ContainerProps {
    bgColor?: string;
    padding?: string;
    children: React.ReactNode;
    justifyContent?: string;
}

const StyledContainer = styled.View<ContainerProps>`
  background-color: ${(props) => props.bgColor || "white"};
  padding: ${(props) => props.padding || "0"};
  justify-content: ${(props) => props.justifyContent || "none"};
  flex: 1;
`;

const Container: React.FC<ContainerProps> = ({ bgColor, padding, justifyContent, children }) => (
    <StyledContainer bgColor={bgColor} padding={padding} justifyContent={justifyContent}>
        {children}
    </StyledContainer>
);

export default Container;
