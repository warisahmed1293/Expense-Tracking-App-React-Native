// components/Flex.tsx
import React from "react";
import styled from "styled-components/native";

interface FlexProps {
    direction?: "row" | "column";
    justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
    align?: "flex-start" | "center" | "flex-end" | "stretch";
    children: React.ReactNode;
}

const StyledFlex = styled.View<FlexProps>`
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "flex-start"};
`;

const DisplayFlex: React.FC<FlexProps> = ({ direction, justify, align, children }) => (
    <StyledFlex direction={direction} justify={justify} align={align}>
        {children}
    </StyledFlex>
);

export default DisplayFlex;
