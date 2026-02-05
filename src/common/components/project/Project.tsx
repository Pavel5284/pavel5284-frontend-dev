import style from "./Project.module.css";
import {NavLink} from "react-router";

type PropsType = {
    id: number,
    titleKey: string,
    skills: string,
    img: string,
    imgBig: string,
    gitHubLink: string | undefined,
}

export const Project = (props: PropsType) => {
    return (
        <NavLink to={`/projectPage/${props.id}`}>
            <li className={style.project}>
                    <img src={props.img} alt={props.titleKey} className={style.project__img}/>
                    <h3 className={style.project__title}>{props.titleKey}</h3>
            </li>
        </NavLink>

    )
}