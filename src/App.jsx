import React from 'react'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import ForecastApp from './Pages/WeeklyForecast'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path='/' element={<Layout />}> */}
				<Route index element={<Home />} />
				{/* <Route path='contact' element={<Contact />} /> */}
				<Route path='forecast' element={<ForecastApp />} />

				{/* </Route> */}
			</Routes>
		</BrowserRouter>
	)
}

export default App
