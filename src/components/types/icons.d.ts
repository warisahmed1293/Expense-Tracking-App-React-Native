// types/icons.d.ts
export interface IconType {
    solid: (props: { size: number; color: string }) => JSX.Element;
    outline: (props: { size: number; color: string }) => JSX.Element;
}
