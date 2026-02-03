import {Route, Routes} from "react-router"
import {PageNotFound} from "@/common/components/PageNotFound/PageNotFound.tsx"
import {ProjectPage} from "@/pages/projectPage/projectPage.tsx";
import {ProjectsPage} from "@/pages/projectsPage/ProjectsPage.tsx";
import {ContactsPage} from "@/pages/contactsPage/ContactsPage.tsx";
import {HomePage} from "@/pages/homePage/HomePage.tsx";

export const Path = {
    Main: "/",
    Projects: "/projectsPage",
    ProjectPageId: "/projectPage/:id",
    Contacts: "/contactsPage",
    NotFound: "*",
} as const

export const Routing = () => {
    return (
        <Routes>
            <Route path={Path.Main} element={<HomePage/>}/>
            <Route path={Path.Projects} element={<ProjectsPage/>}/>
            <Route path={Path.ProjectPageId} element={<ProjectPage/>}/>
            <Route path={Path.Contacts} element={<ContactsPage/>}/>

            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}
