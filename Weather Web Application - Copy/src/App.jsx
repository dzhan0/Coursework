import { useState } from "react";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
const App = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    const searchData = event.target.value;
    console.log(searchData);
    setSearchCity(searchData);
    setIsError(false);
  };

  const handleSearch = async () => {
    try {
      const apiKey = "87450e0f327dc124900688c53483ebad";
      const weatherData = await fetchWeatherData(searchCity, apiKey);
      console.log(weatherData);
      setWeatherData(weatherData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherData = async (searchCity, apiKey) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      setIsError(true);
    }
    const weatherData = await response.json();
    return weatherData;
  };

  const handleEnterPress = (event) => {
    //make enter available explain in documentation
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Row
      className="splitScreen"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?${weatherData.name}')`,
        backgroundSize: "cover",
      }}
    >
      <Col className="leftSide" lg={6}>
        {isError && <Alert>City not found</Alert>}
        {/*left side of the page*/}
        {weatherData && weatherData.cod === 200 && (
          <Container className="currentWeatherCard">
            <>
              <Row className="country">
                {weatherData.name}, {weatherData.sys.country}
              </Row>
              <Row className="weatherIcon">
                <img
                  src={`/assets/weather_icons/${weatherData.weather[0].icon}.png`}
                  alt="weather icon"
                />
              </Row>
              <Row className="description">
                {weatherData.weather[0].description}
              </Row>
              <Row className="borderBottom"></Row>
              <Row className="addSpace">
                Temperature: {Math.round(weatherData.main.temp)}°C
              </Row>
              <Row className="borderBottom"></Row>
              <Row className="addSpace">
                Feels like: {Math.round(weatherData.main.feels_like)}°C
              </Row>
              <Row className="borderBottom"></Row>
              <Row className="addSpace">
                Humidity: {weatherData.main.humidity}%
              </Row>
              <Row className="borderBottom"></Row>
              <Row className="addSpace">
                Wind Speed: {weatherData.wind.speed} m/s
              </Row>
              <Row className="borderBottom"></Row>
              <Row className="addSpace">
                Pressure: {weatherData.main.pressure} hPa
              </Row>
              <Row className="borderBottom"></Row>
              <Row className="addSpace">
                Temperature min/max: {Math.round(weatherData.main.temp_min)}
                °C/ {Math.round(weatherData.main.temp_max)}°C
              </Row>
              <Row className="borderBottom"></Row>
              <Row className="addSpace">
                Visibility: {weatherData.visibility / 1000} km
              </Row>
            </>
          </Container>
        )}
      </Col>

      <Col className="rightSide" lg={6}>
        <Container className="rightSideContainer">
          {/*right side of the page*/}
          <Row className="searchBarRow">
            <input
              className="searchBar"
              type="text"
              placeholder="Search a city"
              onChange={handleChange}
              onKeyPress={handleEnterPress}
              value={searchCity}
            />
            <button onClick={handleSearch} className="searchButton">
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
              </svg>
            </button>
          </Row>
          <Row className="menuButtonContainer">
            <Button className="menuButton" onClick={handleShow}>
              Want to learn more?
            </Button>
          </Row>
        </Container>
      </Col>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <a href="/WeeklyForecast/"> Weekly Forecast</a>
        </Offcanvas.Body>
      </Offcanvas>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
    </Row>
  );
};

export default App;
