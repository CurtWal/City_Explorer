import React, { Component } from "react";
import { Card } from "react-bootstrap";
export default class WeatherStatic extends Component {
  render() {
    return (
      <div >
        {this.props.weatherData.map((day) => {
          return (
            <div className="weather">
              <Card style={{ width: "18rem", color: "white",textAlign: "center" }}>
                <Card.Img variant="top"
            src={`https://www.weatherbit.io/static/img/icons/${day.icon}.png`} style={{ height: "150px" }}/>
                <Card.Body>
                  <Card.Title>{this.props.city}</Card.Title>
                  <Card.Subtitle >
                    {day.date}
                  </Card.Subtitle>
                  <Card.Text>
                    Lon: {this.props.lon}
                    <br></br>
                    Lat: {this.props.lat}
                    <br></br>
                    {day.description}
                    <br></br>
                    
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}
