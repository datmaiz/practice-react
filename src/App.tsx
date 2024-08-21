import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Children } from 'react'

import './__global.css'
import AdminLayout from './routes/AdminLayout'
import { adminLayouts, authRoutes } from './routes/layouts'
import { AuthLayout } from './routes'

function App() {
	return (
		<div className='app-container'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/admin'
						element={<AdminLayout />}
					>
						{Children.toArray(adminLayouts.map(layout => <Route {...layout} />))}
					</Route>
					<Route
						path='/auth'
						element={<AuthLayout />}
					>
						{Children.toArray(authRoutes.map(route => <Route {...route} />))}
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
