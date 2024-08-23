import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import App from './App.tsx'
import './index.css'
import { GlobalPopup } from './components/commons/Popup/GlobalPopup.tsx'
import { PopupProvider } from './context/PopupContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PopupProvider>
			<App />
			<GlobalPopup />
		</PopupProvider>
		<ToastContainer pauseOnFocusLoss={false} />
	</React.StrictMode>
)
