interface InputTextProps {
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string;
    id?: string;
    value?: string;
    type?: string;
}

export const InputText: React.FC<InputTextProps> = ({
    style, type = "text", ...rest
} : InputTextProps) => {
    return (
        <input type={type}
                {...rest}
            className={`border px-5 py-2 rounded-lg text-stone-950 w-full hover:bg-stone-200`} />
    )
}