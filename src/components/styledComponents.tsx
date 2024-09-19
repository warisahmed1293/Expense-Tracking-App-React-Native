import styled from "styled-components/native";
import { View, Text, ScrollView, TouchableOpacity, ViewProps, TextProps, TouchableOpacityProps, ScrollViewProps } from "react-native";

interface ContainerProps extends ViewProps {
  bgColor?: string;
  className?: string;
  padding?: string;
  flex?: number;
  borderRadius?: string;
  margin?: string;
  flexDirection?: "row" | "column";
  width?: string;
  height?: string;
}

export const Container = styled(View) <ContainerProps>`
  flex: 1;
  flex-direction: ${({ flexDirection }) => flexDirection || "row"};
  border-radius: ${({ borderRadius }) => borderRadius || "0px"};
  padding: ${({ padding }) => padding || "0px"};
  background-color: ${({ bgColor }) => bgColor || "white"};
  className: ${({ className }) => className || ""};
  margin: ${({ margin }) => margin || "0px"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "auto"};
`;

interface DisplayFlexProps extends ViewProps {
  direction?: "row" | "column";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  className?: string;
}

export const DisplayFlex = styled(View) <DisplayFlexProps>`
  flex: 1;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ alignItems }) => alignItems || "center"};
  justify-content: ${({ justifyContent }) => justifyContent || "center"};
  className: ${({ className }) => className || ""};
`;

interface ViewBoxProps extends ViewProps {
  padding?: string;
  margin?: string;
  bgColor?: string;
  borderRadius?: string;
  className?: string;
}

export const ViewBox = styled(View) <ViewBoxProps>`
  padding: ${({ padding }) => padding || "10px"};
  margin: ${({ margin }) => margin || "10px"};
  background-color: ${({ bgColor }) => bgColor || "transparent"};
  border-radius: ${({ borderRadius }) => borderRadius || "0px"};
  className: ${({ className }) => className || ""};
`;

interface StyledTextProps extends TextProps {
  fontSize?: string;
  color?: string;
  textAlign?: "left" | "center" | "right";
  fontWeight?: string;
  className?: string;
}

export const StyledText = styled(Text) <StyledTextProps>`
  font-size: ${({ fontSize }) => fontSize || "16px"};
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  color: ${({ color }) => color || "white"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  className: ${({ className }) => className || ""};
`;

interface ButtonProps extends TouchableOpacityProps {
  bgColor?: string;
  padding?: string;
  className?: string;
  borderRadius?: string;
}

export const Button = styled(TouchableOpacity) <ButtonProps>`
  background-color: ${({ bgColor }) => bgColor || "blue"};
  padding: ${({ padding }) => padding || "12px"};
  border-radius: ${({ borderRadius }) => borderRadius || "4px"};
  align-items: center;
  justify-content: center;
  className: ${({ className }) => className || ""};
`;

interface ScrollContainerProps extends ScrollViewProps {
  padding?: string;
}

export const ScrollContainer = styled(ScrollView) <ScrollContainerProps>`
  padding: ${({ padding }) => padding || "16px"};
`;
