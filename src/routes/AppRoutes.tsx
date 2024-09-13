import { Children } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SuspenseWrapper } from '@/components/commons'
import NotFoundPage from '@/pages/NotFound'
import { AuthLayout, adminRoutes, authRoutes, clientRoutes, publicRoutes } from '.'
import AdminLayout from './AdminLayout'
import { ClientLayout } from './ClientLayout'
import { RequiredRole } from './RequiredRole'

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Admin routes */}
				<Route
					path='/admin'
					element={<AdminLayout />}
				>
					{Children.toArray(
						adminRoutes.map(route => (
							<Route
								{...route}
								element={
									<SuspenseWrapper>
										<RequiredRole role='admin'>{route.element}</RequiredRole>
									</SuspenseWrapper>
								}
							/>
						))
					)}
				</Route>

				{/* Auth routes */}
				<Route
					path='/auth'
					element={<AuthLayout />}
				>
					{Children.toArray(
						authRoutes.map(route => (
							<Route
								{...route}
								element={<SuspenseWrapper>{route.element}</SuspenseWrapper>}
							/>
						))
					)}
				</Route>

				{/* Client routes */}
				<Route
					path=''
					element={<ClientLayout />}
				>
					{/* Private routes for user */}
					{Children.toArray(
						clientRoutes.map(route => (
							<Route
								{...route}
								element={
									<SuspenseWrapper>
										<RequiredRole role='user'>{route.element}</RequiredRole>
									</SuspenseWrapper>
								}
							/>
						))
					)}
					{/* Public routes */}
					{Children.toArray(
						publicRoutes.map(route => (
							<Route
								{...route}
								element={<SuspenseWrapper>{route.element}</SuspenseWrapper>}
							/>
						))
					)}
				</Route>

				{/* Any Routes */}
				<Route
					path='*'
					element={<NotFoundPage />}
				/>
			</Routes>
		</BrowserRouter>
	)
}
