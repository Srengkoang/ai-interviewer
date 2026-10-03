import { RouterProvider } from "react-router"
import { router } from "../pages/router"

export default function AppRouter() {
  return <RouterProvider router={router} />
}