import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Children } from 'react'

import './__global.css'
import AdminLayout from './routes/AdminLayout'
import { adminLayouts, authRoutes, clientRoutes } from './routes/layouts'
import { AuthLayout } from './routes'
import { ClientLayout } from './routes/ClientLayout'
import NotFoundPage from './pages/NotFound'

function App() {
	return (
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
	)
}

export default App
