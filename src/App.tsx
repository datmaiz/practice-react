import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Children } from 'react'

import './__global.css'
import AdminLayout from './routes/AdminLayout'
import { adminLayouts } from './routes/layouts'

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
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
