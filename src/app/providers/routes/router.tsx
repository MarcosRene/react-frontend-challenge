import { createBrowserRouter, Navigate } from "react-router-dom"
import { MainLayout } from "@/app/layouts/main-layout"
import { BookDetails } from "@/pages/book-details/ui/book-details"
import { Bookshelf } from "@/pages/bookshelf/ui/bookshelf"
import { Explore } from "@/pages/explore/ui/explore"
import { NotFound } from "@/pages/not-found/ui/not-found"
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
            element: <Bookshelf />,
          },
          {
            path: "/book/:id",
            element: <BookDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
