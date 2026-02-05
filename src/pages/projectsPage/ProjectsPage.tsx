import mainStyle from './../../styles/mainStyles.module.css'
import style from './ProjectsPage.module.css'
import {Project} from "@/common/components/project/Project.tsx";
import {projectsList} from "@/common/dataArrays/projectsList.ts";
import {useTranslation} from "react-i18next";

export const ProjectsPage = () => {
    const { t } = useTranslation();

    return (
        <main className={mainStyle.section}>
            <div className={mainStyle.container}>
                <h1 className={mainStyle.title_1}>{t('projects.h1')}</h1>
                <h3 className={mainStyle.title_3}>{t('projects.h3')}</h3>
                <ul className={style.projects}>
                    {projectsList.map((project) => {
                        console.log(project, "project");
                        return <Project
                            key={project.id}
                            id={project.id}
                            titleKey={t(project.titleKey)}
                            skills={project.skills}
                            img={project.img}
                            imgBig={project.imgBig}
                            gitHubLink={project.gitHubRepoLink}/>
                    })}
                </ul>
            </div>
        </main>
    )
}