import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "../pages/home/Homepage"
import Pricing from "../pages/pricing/Pricing"
import PageNotFound from "../pages/error/PageNotFound"
import Layout from "../pages/layout/Layout"
import AppLayout from "../pages/app/AppLayout"
import Product from "../pages/product/Product"
import Login from '../pages/login/Login'

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <HomePage />
                },
                {
                    path: 'product',
                    element: <Product />
                },
                {
                    path: 'pricing',
                    element: <Pricing />
                },
                {
                    path: '/app',
                    element: <AppLayout />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '*',
                    element: <PageNotFound />
                },
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}
