import React from "react";
import "../styles/About.css";
import FadeInSection from "./FadeInSection";

class About extends React.Component {
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
    const one = (
      <p>
        As a  mobile app developer specializing in Flutter, have an expertise in creating high-performance, cross-platform applications for both Android and iOS. Leveraging a strong technical background, I am committed to delivering robust and engaging solutions that meet and exceed client expectations. Let’s collaborate to realize your app vision with precision and excellence.
      </p>
    );
    const two = (
      <p>
      </p>
    );

    const tech_stack = [
      "Flutter",
      "Dart",
      "Firebase",
      "Python",
    ];

    return (
      <div id="about">
        <FadeInSection>
          <div className="section-header ">
            <span className="section-title">/ about me</span>
          </div>
          <div className="about-content">
            <div className="about-description">
              {[one]}
              {"Here are some technologies I have been working with:"}
              <ul className="tech-stack">
                {tech_stack.map(function (tech_item, i) {
                  return (
                    <FadeInSection delay={`${i + 1}00ms`}>
                      <li>{tech_item}</li>
                    </FadeInSection>
                  );
                })}
              </ul>
              {[two]}
            </div>
            <div className="about-image">
              <img alt="Gazi Jarin" src={"/assets/profile.png"} />
            </div>
          </div>
        </FadeInSection>
      </div>
    );
  }
}

export default About;
