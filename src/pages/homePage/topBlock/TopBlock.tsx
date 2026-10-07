import style from './TopBlock.module.css'
import cv from '../../../../public/cv/Chernyakov_Pavel_CV.pdf'
import {VantaBackground} from "./bg/bg";
import {useTranslation} from "react-i18next";


export const TopBlock = () => {
    const {t} = useTranslation();
    return (
        <VantaBackground effect="rings" className={style.vantaBackground}>
            <section className={style.section}>
                <div className={style.wrapper}>
                    <h1 className={style.title}>
                        <strong>{t('mainPage.greeting')} <em>{t('mainPage.name')}</em>.</strong><br/>
                        {t('mainPage.title')}
                    </h1>
                    <div className={style.text}>
                        <p>{t('mainPage.details')}</p>
                        <p>{t('mainPage.stack')}</p>
                        <p>React • Next.js • TypeScript • Node.js • NestJS • SQL</p>
                        <p>{t('mainPage.cta')}</p>
                    </div>
                    <a className={style.btn}
                       href={cv} download="Chernyakov_Pavel_CV.pdf">
                        {t('mainPage.downloadResume')}
                    </a>
                </div>
            </section>
        </VantaBackground>
    )
}