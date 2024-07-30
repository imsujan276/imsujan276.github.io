import React from "react";

import "../styles/Intro.css";
import Typist from "react-typist";
import "react-typist/dist/Typist.css";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import FadeInSection from "./FadeInSection";

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: true,
      activeKey: "1",
      visible: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(eventKey) {
    this.setState({
      activeKey: eventKey,
    });
  }
  render() {
    return (
      <div id="intro">
        <img id="intro-profile-img" alt="Gazi Jarin" src={"/assets/profile.png"}   />
        <Typist avgTypingDelay={120}>
          <span className="intro-title">
            {"hi, "}
            <span className="intro-name">{"Sujan"}</span>
            {" here."}
          </span>
        </Typist>
        <FadeInSection>
          <div className="intro-subtitle">I create Flutter Applications.</div>
          <div className="intro-desc">
          I'm a passionate mobile app developer from Bhaktapur, Nepal, specializing in Flutter. I excel in creating sleek, high-performance cross-platform applications for both Android and iOS. With a strong computer science background, I focus on delivering robust, scalable solutions and engaging user experiences. My work spans diverse projects, from consumer apps to complex business solutions.
          </div>
          <a
            href="mailto:sujangainju01@gmail.com"
            className="intro-contact"
          >
            <EmailRoundedIcon></EmailRoundedIcon>
            {" Say hi!"}
          </a>
        </FadeInSection>
      </div>
    );
  }
}

export default Intro;
