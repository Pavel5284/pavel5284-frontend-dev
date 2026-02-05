import style from "./MainButton.module.css";

interface IProps {
    onClick?: () => void;
    children: React.ReactNode;
    disabled?: boolean;
}

export const MainButton = ({onClick, children, disabled}: IProps) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={style.btn}
        >
            {children}
        </button>
    )
}