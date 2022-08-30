import React, { Component } from "react";
import { Card, Carousel } from "react-bootstrap";
export default class Movies extends Component {
  render() {
    return (
      <div>
        <Carousel
          fade
          style={{
            alignItems: "center",
            marginLeft: "10px",
            textAlign: "center",
            width: "450px",
            color: "white",
            boxShadow: "5px 5px 5px white",
          }}
        >
          {this.props.movies !== [{ error: "No movies found" }] &&
            this.props.movies.map((movie) => {
              return (
                <Carousel.Item key={movie.id}>
                  <Card
                    style={{
                      backgroundColor: "grey",
                    }}
                  >
                    <Card.Img
                      className="poster"
                      variant="top"
                      src={movie.image}
                      alt={`${movie.title} movie poster`}
                    />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>
                        Rating: {movie.vote_average}
                        <br></br>
                        {movie.overview}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </div>
    );
  }
}
