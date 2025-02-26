import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HomePage from "../pages/home/Homepage";
import Pricing from "../pages/pricing/Pricing";
import PageNotFound from "../pages/error/PageNotFound";
import Layout from "../pages/layout/Layout";
import AppLayout from "../pages/app/AppLayout";
import Product from "../pages/product/Product";
import Login from "../pages/login/Login";
import CityList from "../components/cityList/CityList";
import CountryList from "../components/countryList/CountryList";
import City from "../components/city/City";
import Form from '../components/form/Form'
import useFakeAuth from "../hooks/useFakeAuth";

export default function Router() {
    const { isAuthenticated } = useFakeAuth()

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
                    path: 'app',
                    element: isAuthenticated ? <AppLayout /> : <Navigate to='/login' />,
                    children: [
                        {
                            index: true,
                            element: <Navigate to='cities' replace />
                        },
                        {
                            path: 'cities',
                            element: <CityList />
                        },
                        {
                            path: 'cities/:id',
                            element: <City />
                        },
                        {
                            path: 'countries',
                            element: <CountryList />
                        },
                        {
                            path: 'form',
                            element: <Form />
                        }
                    ]
                },
                {
                    path: 'login',
                    element: !isAuthenticated ? <Login /> : <Navigate to='/app' />
                },
                {
                    path: '*',
                    element: <PageNotFound />
                },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}