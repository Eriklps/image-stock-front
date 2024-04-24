interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (event: any) => void;
    type?: "submit" | "button" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ({
    onClick, label
} : ButtonProps) => {
    return (
        <button className={`border px-4 py-2 rounded-lg text-stone-950`} onClick={onClick}>
            { label }
        </button>
    )
}
