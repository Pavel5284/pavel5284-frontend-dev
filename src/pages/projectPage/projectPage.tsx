import {useNavigate, useParams} from "react-router";

import style from './projectPage.module.css'
import mainStyle from './../../styles/mainStyles.module.css'

import {BtnGitHub} from "@/common/components/btnGitHub/BtnGitHub.tsx";
import {projectsList} from "@/common/dataArrays/projectsList.ts";
import {useTranslation} from "react-i18next";
import {MainButton} from "@/common/components/mainButton/MainButton.tsx";


export const ProjectPage = () => {
    const { t } = useTranslation();
    const {id} = useParams();
    const navigate = useNavigate();
    const project = projectsList.find(el => el.id === +id!)

    return (
        <main className={mainStyle.section}>
            <div className={mainStyle.container}>
                <MainButton
                onClick={() => navigate(-1)}
                >
                    ← {t('projects.back')}
                </MainButton>
                <div className={style.project_details}>
                    <h1 className={mainStyle.title_1}>{t(project!.titleKey)}</h1>
                    <a className={style.project_details__link} href={project!.gitHubPagesLink} target='_blank' rel='noreferrer'>
                        <img src={project!.imgBig} alt={t(project!.titleKey)} className={style.project_details__linkCover} loading={"lazy"}/>
                    </a>



                        <div className={style.project_details__desc}>
                            <p>{project!.skills}</p>
                        </div>

                    {project!.gitHubRepoLink && (
                        <BtnGitHub link={project!.gitHubRepoLink}/>
                    )}


                </div>


            </div>
        </main>
    )
}