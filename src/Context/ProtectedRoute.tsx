import { Navigate, Outlet } from 'react-router-dom'
import { SideBar } from '../Components/SideBar/sidebar'
import SidebarHeaderProvider from './SidebarHeaderContext'
import { BreadcrumbComponent } from '@/Components/BreadCrumbs/BreadCrumbs'
import Header from '@/Components/Header/header'

const PrivateRoute = () => {
    const isAuthenticated = !!localStorage.getItem('access_token')

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <>
            <SidebarHeaderProvider>
                <div className="flex h-screen overflow-hidden bg-slate-50">
                    <SideBar />
                    <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                        <Header />
                        <main className="flex-1 overflow-y-auto p-6">
                            <BreadcrumbComponent />
                            <Outlet />
                        </main>
                    </div>
                </div>
            </SidebarHeaderProvider>
        </>
    )
}

export default PrivateRoute
