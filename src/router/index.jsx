import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import CityList from "../components/cityList/CityList";
import CountryList from "../components/countryList/CountryList";
import City from "../components/city/City";
import Form from '../components/form/Form'
import useFakeAuth from "../hooks/useFakeAuth";
import SpinnerFullPage from '../components/spinnerFullPage/SpinnerFullPage'
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import('../pages/home/Homepage'))
const Pricing = lazy(() => import('../pages/pricing/Pricing'))
const Product = lazy(() => import('../pages/product/Product'))
const Login = lazy(() => import('../pages/login/Login'))
const Layout = lazy(() => import('../pages/layout/Layout'))
const AppLayout = lazy(() => import('../pages/app/AppLayout'))
const PageNotFound = lazy(() => import('../pages/error/PageNotFound'))


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

    return <Suspense fallback={<SpinnerFullPage />}>
        <RouterProvider router={router} />;
    </Suspense>
}