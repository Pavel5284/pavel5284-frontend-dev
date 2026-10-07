import project01 from '@/assets/img/projects/01.jpg'
import project01Big from '@/assets/img/projects/01-big.jpg'

import project02 from '@/assets/img/projects/02.jpg'
import project02Big from '@/assets/img/projects/02-big.jpg'

import project03 from '@/assets/img/projects/03.jpg'
import project03Big from '@/assets/img/projects/03-big.jpg'

//import project04 from '@/assets/img/projects/04.webp'
import project05 from '@/assets/img/projects/05.webp'
import project06 from '@/assets/img/projects/06.webp'

import project07_1 from '@/assets/img/projects/07-1.png'
import project07_2 from '@/assets/img/projects/07-2.png'
import project07_3 from '@/assets/img/projects/07-3.png'
import project07_4 from '@/assets/img/projects/07-4.png'



/*

export const projectsList = [
    {
        id: 1,
        title: 'Quiz-show',
        skills: 'React, TS, Redux, Formik, Axios, MaterialUI, SCSS',
        img: project01,
        imgBig: project01Big,
        gitHubPagesLink: 'https://bdodinka.github.io/quiz-show',
        gitHubRepoLink: 'https://github.com/BDODINKA/quiz-show',
    },
    {
        id: 2,
        title: 'Task Manager Desk',
        skills: 'React, Redux, TS, Formik, Axios, Storybook, TDD, RTK, MUI',
        img: project02,
        imgBig: project02Big,
        gitHubPagesLink: 'https://pavel5284.github.io/Todolist',
        gitHubRepoLink: 'https://github.com/Pavel5284/Todolist',
    },
    {
        id: 3,
        title: 'Social Network',
        skills: 'React, Redux, TS, Formik, Axios, WebSocket, Ant Design',
        img: project03,
        imgBig: project03Big,
        gitHubPagesLink: 'https://pavel5284.github.io/samurai-way/',
        gitHubRepoLink: 'https://github.com/Pavel5284/samurai-way',
    },
    {
        id: 4,
        title: 'Marketing agency site',
        skills: 'Next.js, RTK-query, TS, React-Hook form, MUI, Vanta.js, ZOD, Nodemailer',
        img: project04,
        imgBig: project04,
        gitHubPagesLink: 'https://kilkamarketing.ru',
        //gitHubRepoLink: 'https://github.com/Pavel5284/samurai-way',
    },
]*/

export type ProjectListItem = {
    id: number
    slug: string
    titleKey: string
    skills: string
    img: string
    imgBig: string[]
    descriptionKey?: string
    gitHubPagesLink?: string
    gitHubRepoLink?: string
}

export const projectsList: ProjectListItem[] = [
    {
        id: 1,
        slug: 'quiz-show',
        titleKey: 'projects.quizShow.title', // Ключ для перевода
        skills: 'React, TS, Redux, Formik, Axios, MaterialUI, SCSS',
        img: project01,
        imgBig: [project01Big],
        gitHubPagesLink: 'https://bdodinka.github.io/quiz-show',
        gitHubRepoLink: 'https://github.com/BDODINKA/quiz-show',
    },
    {
        id: 2,
        slug: 'task-manager',
        titleKey: 'projects.taskManager.title',
        skills: 'React, Redux, TS, Formik, Axios, Storybook, TDD, RTK, MUI',
        img: project02,
        imgBig: [project02Big],
        gitHubPagesLink: 'https://pavel5284.github.io/Todolist',
        gitHubRepoLink: 'https://github.com/Pavel5284/Todolist',
    },
    {
        id: 3,
        slug: 'social-network',
        titleKey: 'projects.socialNetwork.title',
        skills: 'React, Redux, TS, Formik, Axios, WebSocket, Ant Design',
        img: project03,
        imgBig: [project03Big],
        gitHubPagesLink: 'https://pavel5284.github.io/samurai-way/',
        gitHubRepoLink: 'https://github.com/Pavel5284/samurai-way',
    },
  /*  {
        id: 4,
        titleKey: 'projects.marketingAgency.title',
        skills: 'Next.js, RTK-query, TS, React-Hook form, MUI, Vanta.js, ZOD, Framer Motion, Nodemailer, Telegram integration',
        img: project04,
        imgBig: project04,
        gitHubPagesLink: 'https://kilkamarketing.ru',
    },*/
    {
        id: 5,
        slug: 'sibtel-pro',
        titleKey: 'projects.sibtelPro.title',
        skills: "Next.js, TS, Three.js, Bitrix integration",
        img: project05,
        imgBig: [project05],
        gitHubPagesLink: 'https://sibtel.pro',
    },
    {
        id: 6,
        slug: 'justcall',
        titleKey: 'projects.justcall.title',
        skills: "Next.js, TS, SCSS, Strapi, Amo-CRM integration, Yandex smart-captcha, React-Hook form, ZOD, GSAP, Keen-slider",
        img: project06,
        imgBig: [project06],
        gitHubPagesLink: 'https://justgroup.pro',
    },
    {
        id: 7,
        slug: 'crm-system',
        titleKey: 'projects.crmSystem.title',
        skills: 'Nuxt, NestJS, TS, JWT, WebSocket, Microservices',
        img: project07_1,
        imgBig: [project07_1, project07_2, project07_3, project07_4],
        descriptionKey: 'projects.crmSystem.description',
        gitHubPagesLink: 'https://crm-system-vue-customers-remote-ten.vercel.app/',
    },
]

// Slugs используются в URL страницы проекта (/projectPage/:slug),
// поэтому дубликаты сделали бы часть проектов недоступной.
// Проверка при импорте модуля: роняет dev-сервер/тесты сразу
// с сообщением, указывающим на конфликтующие записи.
// (Плюс scripts/validate-project-slugs.mjs роняет `npm run build`.)
const seenSlugs = new Map<string, number>()
const seenIds = new Map<number, number>()
projectsList.forEach((project, index) => {
    const firstIdIndex = seenIds.get(project.id)
    if (firstIdIndex !== undefined) {
        throw new Error(
            `[projectsList] Дублирующийся id ${project.id}: индекс ${index} (slug "${project.slug}") конфликтует с индексом ${firstIdIndex}. Id должны быть уникальными. Файл: src/common/dataArrays/projectsList.ts`
        )
    }
    seenIds.set(project.id, index)
    if (!project.slug) {
        throw new Error(
            `[projectsList] У проекта с индексом ${index} (titleKey: "${project.titleKey}") пустой slug. Каждый проект должен иметь уникальный URL-friendly "slug". Файл: src/common/dataArrays/projectsList.ts`
        )
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) {
        throw new Error(
            `[projectsList] Некорректный slug "${project.slug}" у проекта с индексом ${index} (titleKey: "${project.titleKey}"). Разрешены только строчные латинские буквы, цифры и дефисы (например, "my-project"). Файл: src/common/dataArrays/projectsList.ts`
        )
    }
    const firstIndex = seenSlugs.get(project.slug)
    if (firstIndex !== undefined) {
        const first = projectsList[firstIndex]
        throw new Error(
            `[projectsList] Дублирующийся slug "${project.slug}": индекс ${index} (titleKey: "${project.titleKey}") конфликтует с индексом ${firstIndex} (titleKey: "${first.titleKey}"). Slug должны быть уникальными. Файл: src/common/dataArrays/projectsList.ts`
        )
    }
    seenSlugs.set(project.slug, index)
})
