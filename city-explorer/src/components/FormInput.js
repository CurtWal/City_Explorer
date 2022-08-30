import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import WeatherStatic from "./WeatherStatic";
import Movies from "./Movies";
import Map from "./Map"
export default class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherData: [],
      lon: "",
      lat: "",
      city: "",
      display_name: "",
      movies: [],
    };
  }
  handleMap = async (e) => {
    e.preventDefault();
    // user search goes here
    const API = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_KEY}&q=${this.state.city}&format=json`;
    //  third party api
    try {
      let res = await axios.get(API);
      this.setState(
        {
          lon: res.data[0].lon,
          lat: res.data[0].lat,
          display_name: res.data[0].display_name,
        },
        () =>
          this.handleWeather(this.state.city, this.state.lon, this.state.lat)
      );
    } catch (error) {
      alert("Error something went wrong, Location not found", error);
    }
  };
  // handleWeather = async (cityName) => {
  //   const API = `http://localhost:3001/weather?cityName=${cityName}`; //our URL with query parameters
  //   const res = await axios.get(API);
  //   this.setState({ weatherData: res.data });
  // };
  handleWeather = async (city, lon, lat) => {
    const weather = await axios
      .get(
        `${process.env.REACT_APP_URL_KEY}/weather?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_KEY}`
      )
      .catch((err) => console.log("error with location", err));
    this.setState({ weatherData: weather.data});
    console.log(this.state.weatherData);

    const movie = await axios
      .get(`${process.env.REACT_APP_URL_KEY}/movie?city=${city}`)
      .catch((err) => console.log("error with films", err));
    this.setState({ movies: movie.data });
  };
  render() {
    return (
      <div >
        <Form onSubmit={this.handleMap}>
          <Form.Group>
            <Form.Label
              className="form-data"
              style={{ fontSize: "25px", color: "white" }}
            >
              Enter Location:{" "}
            </Form.Label>
            <Form.Control
              type="text"
              value={this.state.city}
              onChange={(e) => this.setState({ city: e.target.value })}
              placeholder="City Name"
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Explore
          </Button>
        </Form>

        <div style={{ display: "flex",
          flexDirection: "row"}}>
          <WeatherStatic
            weatherData={this.state.weatherData}
            lat={this.state.lat}
            lon={this.state.lon}
            city={this.state.display_name}
          />
          <Movies movies={this.state.movies} />
          <Map lon={this.state.lon} lat={this.state.lat}/>
        </div>
      </div>
    );
  }
}
