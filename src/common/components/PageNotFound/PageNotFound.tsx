import {useNavigate} from "react-router"
import mainStyle from "@/styles/mainStyles.module.css"
import style from "./PageNotFound.module.css"
import {MainButton} from "@/common/components/mainButton/MainButton.tsx"

export const PageNotFound = () => {
    const navigate = useNavigate()

    return (
        <main className={mainStyle.section}>
            <div className={mainStyle.container}>
                <div className={style.wrapper}>
                    <h1 className={style.title}>404</h1>
                    <h2 className={style.subtitle}>page not found</h2>
                    <MainButton onClick={() => navigate("/")}>
                        Go to Main Page
                    </MainButton>
                </div>
            </div>
        </main>
    )
}
