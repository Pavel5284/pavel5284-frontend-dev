import { Navigate, Outlet } from "react-router"
import { ReactNode } from "react"
import { Path } from "@/common/routing/Routing.tsx"

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Projects }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }
  return children ? children : <Outlet />
}
