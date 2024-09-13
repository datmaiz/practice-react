import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './__global.css'
import { AppRoutes } from './routes/AppRoutes'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className='app-container'>
				<AppRoutes />
			</div>
		</QueryClientProvider>
	)
}

export default App
