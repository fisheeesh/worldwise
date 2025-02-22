import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "../pages/HomePage"
import ProductPage from "../pages/ProductPage"
import PricingPage from "../pages/PricingPage"
import PageNotFound from "../pages/PageNotFound"
import Layout from "../pages/layout/Layout"
import App from "../pages/App"

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
                    element: <ProductPage />
                },
                {
                    path: 'pricing',
                    element: <PricingPage />
                },
                {
                    path: '/app',
                    element: <App />
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
