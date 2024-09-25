import React from "react";
import * as SolidIcons from "react-native-heroicons/solid";
import * as OutlineIcons from "react-native-heroicons/outline";

type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

interface IconProps {
    type?: "solid" | "outline";
    name: IconName;  // Use IconName to restrict to valid keys
    size?: number;
    color?: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ type = "outline", name, size = 24, color = "black", className = "" }) => {
    const IconComponent = type === "solid" ? SolidIcons[name] : OutlineIcons[name];

    if (!IconComponent) {
        return null; // Handle case where icon name is invalid or undefined
    }

    return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
