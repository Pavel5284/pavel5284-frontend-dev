import {useState} from "react";
import style from './TopBlock.module.css'
import {VantaBackground} from "./bg/bg";
import {useTranslation} from "react-i18next";


export const TopBlock = () => {
    const {t} = useTranslation();
    const [showResumeOptions, setShowResumeOptions] = useState(false);

    const cvRu = encodeURI('/cv/Pavel Chernyakov CV.pdf');
    const cvEn = encodeURI('/cv/Pavel Chernyakov CV EN.pdf');

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
                        <p>React • Next.js • Vue.js • Nuxt.js • TypeScript • Node.js • NestJS • SQL</p>
                        <p>{t('mainPage.cta')}</p>
                    </div>
                    <div className={style.resumeWrapper}>
                        <div className={`${style.resumeSlot} ${showResumeOptions ? style.resumeSlotHidden : ''}`}>
                            <a className={style.btn}
                               href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setShowResumeOptions(true);
                               }}>
                                {t('mainPage.downloadResume')}
                            </a>
                        </div>
                        <div className={`${style.resumeSlot} ${style.resumeOptions} ${showResumeOptions ? style.resumeSlotVisible : ''}`}>
                            <div className={style.resumeOptionsInner}>
                                <a className={style.btn}
                                   href={cvRu} download="Pavel_Chernyakov_CV_RU.pdf">
                                    {t('mainPage.downloadResumeRu')}
                                </a>
                                <a className={style.btn}
                                   href={cvEn} download="Pavel_Chernyakov_CV_EN.pdf">
                                    {t('mainPage.downloadResumeEn')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </VantaBackground>
    )
}