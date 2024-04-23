interface ButtonProps {
    color?: string;
    label?: string;
    onClick?: (event: any) => void;
}

export const Button: React.FC<ButtonProps> = ({
    onClick, color, label
} : ButtonProps) => {
    return (
        <button className={`border px-4 py-2 rounded-lg text-stone-950`} onClick={onClick}>
            { label }
        </button>
    )
}
