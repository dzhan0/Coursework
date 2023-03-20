import { useState } from "react";
import "./forecast.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineController
);

const ForecastApp = () => {
  const [searchCity, setSearchCity] = useState("");
  const [forecastedWeatherData, setforecastedWeatherData] = useState("");

  const handleChange = (event) => {
    const searchData = event.target.value;
    setSearchCity(searchData);
  };

  const handleSearch = async () => {
    try {
      const apiKey = "87450e0f327dc124900688c53483ebad";
      const forecastedWeatherData = await fetchforecastedWeatherData(
        searchCity,
        apiKey
      );
      console.log(forecastedWeatherData);
      setforecastedWeatherData(forecastedWeatherData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchforecastedWeatherData = async (searchCity, apiKey) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      {
        /*if data could not be fetched this is what happens*/
      }
      throw new Error("City not found");
    }
    const forecastedWeatherData = await response.json();
    return forecastedWeatherData;
  };

  const handleEnterPress = (event) => {
    //make enter available explain in documentation
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  //to calculate the day of the week
  const WEEKDAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const day = new Date().getDay();
  const forecastDays = WEEKDAYS.slice(day, WEEKDAYS.length).concat(
    WEEKDAYS.slice(0, day)
  );
  console.log(forecastDays); //test

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Temperature",
        data: [6, 3, 9],
        bacgroudColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "rgba(255, 99, 132, 1)",
        tension: 0.2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {
        min: 3,
        max: 6,
      },
    },
  };

  return (
    <>
      <Nav variant="tabs" defaultActiveKey="/WeeklyForecast/">
        <Nav.Item>
          <Nav.Link className="navigation" href="/WeeklyForecast/">
            Weekly Forecast
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <Container fluid className="searchSection">
        <input
          className="searchBar"
          type="text"
          placeholder="Search A City"
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
      </Container>

      {forecastedWeatherData && (
        <>
          <CardGroup className="forecastCardGroup">
            <Card className="forecastCard">
              <Card.Img
                className="forecastIcon"
                src={`/assets/weather_icons/${forecastedWeatherData.list[7].weather[0].icon}.png`}
              />
              <Card.Body className="cardBody">
                <Card.Title className="day">{forecastDays[0]}</Card.Title>
                <Card.Subtitle className="weatherDescription">
                  {forecastedWeatherData.list[7].weather[0].description}
                </Card.Subtitle>
                <Card.Text>
                  {" "}
                  <ListGroup>
                    <ListGroup.Item className="details">
                      Temperature:{" "}
                      {Math.round(forecastedWeatherData.list[7].main.temp)}°C
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Humidity: {forecastedWeatherData.list[7].main.humidity}%
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Precipitation Chance:{" "}
                      {Math.round(forecastedWeatherData.list[7].pop * 100)}%
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button>a</Button>
              </Card.Footer>
            </Card>
            <Card className="forecastCard">
              <Card.Img
                className="forecastIcon"
                src={`/assets/weather_icons/${forecastedWeatherData.list[15].weather[0].icon}.png`}
              />
              <Card.Body className="cardBody">
                <Card.Title className="day">{forecastDays[1]}</Card.Title>
                <Card.Subtitle className="weatherDescription">
                  {forecastedWeatherData.list[15].weather[0].description}
                </Card.Subtitle>
                <Card.Text>
                  {" "}
                  <ListGroup>
                    <ListGroup.Item className="details">
                      Temperature:{" "}
                      {Math.round(forecastedWeatherData.list[15].main.temp)}°C
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Humidity: {forecastedWeatherData.list[15].main.humidity}%
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Precipitation Chance:{" "}
                      {Math.round(forecastedWeatherData.list[15].pop * 100)}%
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button>a</Button>
              </Card.Footer>
            </Card>
            <Card className="forecastCard">
              <Card.Img
                className="forecastIcon"
                src={`/assets/weather_icons/${forecastedWeatherData.list[23].weather[0].icon}.png`}
              />
              <Card.Body className="cardBody">
                <Card.Title className="day">{forecastDays[2]}</Card.Title>
                <Card.Subtitle className="weatherDescription">
                  {forecastedWeatherData.list[23].weather[0].description}
                </Card.Subtitle>
                <Card.Text>
                  {" "}
                  <ListGroup>
                    <ListGroup.Item className="details">
                      Temperature:{" "}
                      {Math.round(forecastedWeatherData.list[23].main.temp)}°C
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Humidity: {forecastedWeatherData.list[23].main.humidity}%
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Precipitation Chance:{" "}
                      {Math.round(forecastedWeatherData.list[23].pop * 100)}%
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button>a</Button>
              </Card.Footer>
            </Card>
            <Card className="forecastCard">
              <Card.Img
                className="forecastIcon"
                src={`/assets/weather_icons/${forecastedWeatherData.list[31].weather[0].icon}.png`}
              />
              <Card.Body className="cardBody">
                <Card.Title className="day">{forecastDays[3]}</Card.Title>
                <Card.Subtitle className="weatherDescription">
                  {forecastedWeatherData.list[31].weather[0].description}
                </Card.Subtitle>
                <Card.Text>
                  {" "}
                  <ListGroup>
                    <ListGroup.Item className="details">
                      Temperature:{" "}
                      {Math.round(forecastedWeatherData.list[31].main.temp)}°C
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Humidity: {forecastedWeatherData.list[31].main.humidity}%
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Precipitation Chance:{" "}
                      {Math.round(forecastedWeatherData.list[31].pop * 100)}%
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button>a</Button>
              </Card.Footer>
            </Card>
            <Card className="forecastCard">
              <Card.Img
                className="forecastIcon"
                src={`/assets/weather_icons/${forecastedWeatherData.list[39].weather[0].icon}.png`}
              />
              <Card.Body className="cardBody">
                <Card.Title className="day">{forecastDays[4]}</Card.Title>
                <Card.Subtitle className="weatherDescription">
                  {forecastedWeatherData.list[39].weather[0].description}
                </Card.Subtitle>
                <Card.Text>
                  {" "}
                  <ListGroup>
                    <ListGroup.Item className="details">
                      Temperature:{" "}
                      {Math.round(forecastedWeatherData.list[39].main.temp)}°C
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Humidity: {forecastedWeatherData.list[39].main.humidity}%
                    </ListGroup.Item>
                    <ListGroup.Item className="details">
                      Precipitation Chance:{" "}
                      {Math.round(forecastedWeatherData.list[39].pop * 100)}%
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button>a</Button>
              </Card.Footer>
            </Card>
          </CardGroup>
          <Container className="chartContainer">
            {" "}
            <Line className="chart" data={data} options={options}></Line>
          </Container>
        </>
      )}
    </>
  );
};

export default ForecastApp;
