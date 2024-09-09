import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Children } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './__global.css'
import NotFoundPage from './pages/NotFound'
import { AuthLayout } from './routes'
import AdminLayout from './routes/AdminLayout'
import { ClientLayout } from './routes/ClientLayout'
import { adminLayouts, authRoutes, clientRoutes, publicRoutes } from './routes/layouts'
import { RequiredRole } from './routes/RequiredRole'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className='app-container'>
				<BrowserRouter>
					<Routes>
						{/* Admin routes */}
						<Route
							path='/admin'
							element={<AdminLayout />}
						>
							{Children.toArray(
								adminLayouts.map(route => (
									<Route
										{...route}
										element={<RequiredRole role='admin'>{route.element}</RequiredRole>}
									/>
								))
							)}
						</Route>

						{/* Auth routes */}
						<Route
							path='/auth'
							element={<AuthLayout />}
						>
							{Children.toArray(authRoutes.map(route => <Route {...route} />))}
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
										element={<RequiredRole role='user'>{route.element}</RequiredRole>}
									/>
								))
							)}
							{/* Public routes */}
							{Children.toArray(publicRoutes.map(route => <Route {...route} />))}
						</Route>

						{/* Any Routes */}
						<Route
							path='*'
							element={<NotFoundPage />}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		</QueryClientProvider>
	)
}

export default App
