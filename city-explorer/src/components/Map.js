import React, { Component } from 'react'

export default class Map extends Component {
  render() {
    return (
      <div>
        <img
            className="maps"
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.props.lat},${this.props.lon}&zoom=18`}
            alt="City Map"
          />
      </div>
    )
  }
}
