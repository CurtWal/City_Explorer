import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Alert } from 'react-bootstrap'
import Footer from './components/Footer'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      city: '',
      location: '',
      lat: '',
      lon: '',
      err: '',
      show: false
    }
  }

  handleExplore = async (e) => {
    e.preventDefault();
    const API = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_CITY}&q=${this.state.city}&format=json`;
    const res = await axios.get(API).catch((err) => {
      console.error(err);
      this.setState({
        err: `${err}`,
        show: true

      })
    })
    this.setState({
      location: res.data[0].display_name,
      lat: res.data[0].lat,
      lon: res.data[0].lon,

    })
  }
  handleErr = () => {
    this.setState({
      show: false
    })
  }
  render() {
    const { city } = this.state;
    return (

      <div style={{backgroundColor: 'steelblue'}}>
        <h1>Location Search</h1>
        <Form onSubmit={this.handleExplore}>
          <Form.Group>
            <Form.Label className='form-data'>Enter Location: </Form.Label>
            <Form.Control type='text' value={city} onChange={e => this.setState({ city: e.target.value })}></Form.Control>
          </Form.Group>
          <Button onClick={this.handleMaps} variant='primary' type='submit'>Explore</Button>
        </Form>
        
        <Alert style={{width: '800px'}}show={this.state.show} variant="danger">
        <Alert.Heading >Oh NO!!!! You Got An Error</Alert.Heading>
        <p>
          {this.state.err}
          <br></br>
          LOCATION NOT FOUND
        </p>
        <div className="d-flex justify-content-end">
          <Button onClick={this.handleErr} variant="outline-primary">
            Try Again!
          </Button>
        </div>
      </Alert>

        <p>Location: {this.state.location} <br></br>
          Latitude: {this.state.lat} <br></br>
          Longitude: {this.state.lon}</p>
        <img className='maps' src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY}&center=${this.state.lat},${this.state.lon}&zoom=18`} alt='City Map' />
        <Footer />
      </div>
    )
  }
}
