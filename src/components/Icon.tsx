// Icon.tsx
import React from "react";
import * as SolidIcons from "react-native-heroicons/solid";
import * as OutlineIcons from "react-native-heroicons/outline";

type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface IconProps {
    type?: "solid" | "outline";
    name: IconName;
    size?: number;
    color?: string;
}

const Icon: React.FC<IconProps> = ({ type = "outline", name, size = 24, color = "black" }) => {
    const IconComponent = type === "solid" ? SolidIcons[name as keyof typeof SolidIcons] : OutlineIcons[name as keyof typeof OutlineIcons];
    return <IconComponent size={size} color={color} />;
};

export default Icon;
