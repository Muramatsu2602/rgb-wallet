import React, { Component } from "react";
import Switch from "react-switch";

class ToggleButton extends Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div className="toggle-button-container">
        <Switch
          className="toggle-button"
          onChange={this.handleChange}
          checked={this.state.checked}
          onColor="#04d361"
          offColor="#e33d3d"
        />
      </div>
    );
  }
}

export { ToggleButton };
