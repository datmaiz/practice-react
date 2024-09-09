import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Children } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './__global.css'
import NotFoundPage from './pages/NotFound'
import { AuthLayout } from './routes'
import AdminLayout from './routes/AdminLayout'
import { ClientLayout } from './routes/ClientLayout'
import { adminLayouts, authRoutes, clientRoutes } from './routes/layouts'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className='app-container'>
				<BrowserRouter>
					<Routes>
						<Route
							path='/admin'
							element={<AdminLayout />}
						>
							{Children.toArray(adminLayouts.map(route => <Route {...route} />))}
						</Route>
						<Route
							path='/auth'
							element={<AuthLayout />}
						>
							{Children.toArray(authRoutes.map(route => <Route {...route} />))}
						</Route>
						<Route
							path=''
							element={<ClientLayout />}
						>
							{Children.toArray(clientRoutes.map(route => <Route {...route} />))}
						</Route>
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
