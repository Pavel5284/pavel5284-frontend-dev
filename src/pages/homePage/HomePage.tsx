import mainStyle from './../../styles/mainStyles.module.css'
import style from './HomePage.module.css'
import {TopBlock} from "./topBlock/TopBlock";
import {useTranslation} from "react-i18next";

export const HomePage = () => {
    const {t} = useTranslation();
    return (
        <>
            <TopBlock/>

            <main className={mainStyle.section}>
                <div className={mainStyle.container}>
                    <h1 className={mainStyle.title_1}>{t('mainPage.skillsTitle')}</h1>
                    <ul className={style.content_list}>
                        <li className={style.content_list__item}>
                            <h2 className={mainStyle.title_2}>{t('mainPage.frontendLabel')}</h2>
                            <p>React.js,
                                Next.js,
                                JavaScript,
                                TypeScript,
                                Redux,
                                Redux Toolkit,
                                RTK-Query,
                                REST API,
                                HTML,
                                CSS,
                                Sass,
                                Storybook,
                                TDD,
                                MUI,
                                AntDesign,
                                RRD,
                                Rechart.js,
                                Chart.js,
                                Axios,
                                WebSocket,
                                Strapi,
                                Jira,
                                Vercel,
                                GitHub,
                                i18n,
                                Formik,
                                React-hook form</p>
                        </li>
                    </ul>


                </div>
            </main>
        </>

    )
}