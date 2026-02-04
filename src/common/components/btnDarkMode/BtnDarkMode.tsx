import style from "./BtnDarkMode.module.css";
import mainStyle from '@/styles/mainStyles.module.css'
import sun from "@/assets/img/icons/sun.svg";
import moon from "@/assets/img/icons/moon.svg";
import {useEffect} from "react";
import { useTheme } from "@/common/utils/cookies/useTheme";

export const BtnDarMode = () => {
    const [theme, setTheme] = useTheme();
    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add(`${mainStyle.dark}`)
        } else {
            document.body.classList.remove(`${mainStyle.dark}`)
        }
    }, [theme])

    useEffect(() => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (event) => {
                const newColorScheme = event.matches ? 'dark' : 'light';
                setTheme(newColorScheme)
            })
    }, [setTheme])


    const toggleDarkMode = () => {
        setTheme((currentValue: string) => {
            return currentValue === 'light' ? 'dark' : 'light'
        })
    }

    const btnNormal = style.dark_mode_btn
    const btnActive = (`${style.dark_mode_btn} ${style.dark_mode_btn__active}`)

    return (
        <button className={theme === 'dark' ? btnActive : btnNormal} onClick={toggleDarkMode}>
            <img src={sun} alt="Light mode" className={style.dark_mode_btn__icon}/>
            <img src={moon} alt="Dark mode" className={style.dark_mode_btn__icon}/>
        </button>
    )
}