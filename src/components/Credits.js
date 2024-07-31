import React from "react";
import "../styles/Credits.css";
import FadeInSection from "./FadeInSection";
import Nav from "react-bootstrap/Nav";

class Credits extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1"
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }
  render() {
    return (
      <FadeInSection>
        <div id="credits">
          <div className="ending-credits">
            <div>All rights reserved. © 2024</div>

            <Nav.Link href="#/privacy-policy">Privacy Policy</Nav.Link>
          </div>
        </div>
      </FadeInSection>
    );
  }
}

export default Credits;
