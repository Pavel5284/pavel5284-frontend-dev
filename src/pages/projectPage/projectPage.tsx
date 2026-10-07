import {useNavigate, useParams} from "react-router";

import style from './projectPage.module.css'
import mainStyle from './../../styles/mainStyles.module.css'

import {BtnGitHub} from "@/common/components/btnGitHub/BtnGitHub.tsx";
import {projectsList} from "@/common/dataArrays/projectsList.ts";
import {useTranslation} from "react-i18next";
import {MainButton} from "@/common/components/mainButton/MainButton.tsx";
import {PageNotFound} from "@/common/components/PageNotFound/PageNotFound.tsx";
import {ProjectSlider} from "./ProjectSlider.tsx";


export const ProjectPage = () => {
    const { t } = useTranslation();
    const {slug} = useParams();
    const navigate = useNavigate();
    const project = projectsList.find(el => el.slug === slug)

    if (!project) {
        return <PageNotFound/>
    }

    const images = Array.isArray(project.imgBig) ? project.imgBig : [project.imgBig]
    const title = t(project.titleKey)

    return (
        <main className={mainStyle.section}>
            <div className={mainStyle.container}>
                <MainButton
                onClick={() => navigate(-1)}
                >
                    ← {t('projects.back')}
                </MainButton>
                <div className={style.project_details}>
                    <h1 className={mainStyle.title_1}>{title}</h1>
                    {images.length > 1 ? (
                        <ProjectSlider images={images} alt={title} siteUrl={project.gitHubPagesLink}/>
                    ) : project.gitHubPagesLink ? (
                        <a className={style.project_details__link} href={project.gitHubPagesLink} target='_blank' rel='noreferrer'>
                            <img src={images[0]} alt={title} className={style['project_details__link-cover']} loading={"lazy"}/>
                        </a>
                    ) : (
                        <span className={style.project_details__link}>
                            <img src={images[0]} alt={title} className={style['project_details__link-cover']} loading={"lazy"}/>
                        </span>
                    )}



                        <div className={style.project_details__desc}>
                            <p>{project.skills}</p>
                        </div>

                    {project.descriptionKey && (
                        <div className={style.project_details__demo}>
                            <p>{t(project.descriptionKey)}</p>
                        </div>
                    )}

                    {project.gitHubRepoLink && (
                        <BtnGitHub link={project.gitHubRepoLink}/>
                    )}


                </div>


            </div>
        </main>
    )
}