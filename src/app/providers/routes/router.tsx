import { createBrowserRouter, Navigate } from "react-router-dom"
import { MainLayout } from "@/app/layouts/main-layout"
import { Explore } from "@/pages/explore/ui/explore"
import { SignIn } from "@/pages/sign-in/ui/sign-in"
import { PrivateRouter } from "./private-route"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-in" replace />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    element: <PrivateRouter />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/bookshelf",
            element: (
              <div className="p-8">
                <h1 className="text-3xl font-bold">Estande</h1>
                <p className="mt-4">
                  Em breve, aqui você poderá gerenciar seu estande.
                </p>
              </div>
            ),
          },
        ],
      },
    ],
  },
])
