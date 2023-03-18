import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import 'bootstrap/dist/css/bootstrap.min.css'
import './forecast.css'

const ForecastApp = () => {
	const [searchCity, setSearchCity] = useState('')
	const [forecastedWeatherData, setforecastedWeatherData] = useState('')

	const handleChange = event => {
		const searchData = event.target.value
		setSearchCity(searchData)
	}

	const handleSearch = async () => {
		try {
			const apiKey = '87450e0f327dc124900688c53483ebad'
			const forecastedWeatherData = await fetchforecastedWeatherData(
				searchCity,
				apiKey
			)
			console.log(forecastedWeatherData)
			setforecastedWeatherData(forecastedWeatherData)
		} catch (error) {
			console.error(error)
		}
	}

	const fetchforecastedWeatherData = async (searchCity, apiKey) => {
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=metric`
		)
		if (!response.ok) {
			{
				/*if data could not be fetched this is what happens*/
			}
			throw new Error('City not found')
		}
		const forecastedWeatherData = await response.json()
		return forecastedWeatherData
	}

	const handleEnterPress = event => {
		//make enter available explain in documentation
		if (event.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<>
			<Container fluid className='searchSection'>
				<input
					className='searchBar'
					type='text'
					placeholder='Search A City'
					onChange={handleChange}
					onKeyPress={handleEnterPress}
					value={searchCity}
				/>
				<button onClick={handleSearch} className='searchButton'>
					{' '}
					<svg
						stroke='currentColor'
						fill='currentColor'
						strokeWidth='0'
						viewBox='0 0 1024 1024'
						height='1.5em'
						width='1.5em'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z'></path>
					</svg>
				</button>
			</Container>
			<CardGroup className='forecastCardGroup'>
				<Card>
					<Card.Img variant='top' src='holder.js/100px160' />
					<Card.Body>
						<Card.Title>Day (Monday)</Card.Title>
						<Card.Text>Weather data</Card.Text>
					</Card.Body>
					<Card.Footer>
						<button>Press to see temp graph</button>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant='top' src='holder.js/100px160' />
					<Card.Body>
						<Card.Title>Day (Monday)</Card.Title>
						<Card.Text>Weather data</Card.Text>
					</Card.Body>
					<Card.Footer>
						<button>Press to see temp graph</button>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant='top' src='holder.js/100px160' />
					<Card.Body>
						<Card.Title>Day (Monday)</Card.Title>
						<Card.Text>Weather data</Card.Text>
					</Card.Body>
					<Card.Footer>
						<button>Press to see temp graph</button>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant='top' src='holder.js/100px160' />
					<Card.Body>
						<Card.Title>Day (Monday)</Card.Title>
						<Card.Text>Weather data</Card.Text>
					</Card.Body>
					<Card.Footer>
						<button>Press to see temp graph</button>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant='top' src='holder.js/100px160' />
					<Card.Body>
						<Card.Title>Day (Monday)</Card.Title>
						<Card.Text>Weather data</Card.Text>
					</Card.Body>
					<Card.Footer>
						<button>Press to see temp graph</button>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant='top' src='holder.js/100px160' />
					<Card.Body>
						<Card.Title>Day (Monday)</Card.Title>
						<Card.Text>Weather data</Card.Text>
					</Card.Body>
					<Card.Footer>
						<button>Press to see temp graph</button>
					</Card.Footer>
				</Card>
				<Card>
					<Card.Img variant='top' src='holder.js/100px160' />
					<Card.Body>
						<Card.Title>Day (Monday)</Card.Title>
						<Card.Text>Weather data</Card.Text>
					</Card.Body>
					<Card.Footer>
						<button>Press to see temp graph</button>
					</Card.Footer>
				</Card>
			</CardGroup>
		</>
	)
}

export default ForecastApp
