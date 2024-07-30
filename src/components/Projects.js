import React from "react";
import "../styles/Projects.css";
import FolderOpenRoundedIcon from "@material-ui/icons/FolderOpenRounded";
import FadeInSection from "./FadeInSection";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import ExternalLinks from "./ExternalLinks";

class Projects extends React.Component {
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
    const spotlightProjects = {
      "Pub.dev packages": {
        title: "pub.dev Packages",
        desc:
          "A collection of Flutter packages that have been published on pub.dev.",
        techStack: "FLUTTER",
        link: "",
        open: "https://pub.dev/publishers/sujangainju.com.np/packages",
        image: "/assets/projects/pub.dev.png"
      },
      "Kalimati Price Nepal": {
        title: "Kalimati Price Nepal",
        desc:
          "A Flutter application that provides daily vegetable prices in Kalimati, Nepal.",
        techStack: "FLUTTER, DART, REST API",
        link: "",
        open: "https://play.google.com/store/apps/details?id=com.suga.kalimati_price",
        image: "/assets/projects/kalimati_price_nepal.png"
      },
      "IPO Results Nepal": {
        title: "IPO Results Nepal",
        desc:
          "BUlk Apply to IPOs in Nepal. ",
        techStack: "FLUTTER, DART, REST API",
        link: "",
        open: "https://play.google.com/store/apps/details?id=np.com.sujangainju.iporesultnepal",
        image: "/assets/projects/ipo_results_nepal.png"
      },
      "NTC/NCELL/SMART CELL Helplines": {
        title: "NTC/NCELL/SMART CELL Helplines",
        desc:
          " Helpline numbers for recharge, view owner info and more",
        techStack: "FLUTTER, DART",
        link: "",
        open: "https://play.google.com/store/apps/details?id=np.com.sujangainju.telecomhelplines",
        image: "/assets/projects/ntc_ncell_smart_cell_helplines.png"
      }
    };
    const projects = {
      "Shopify Flutter": {
        desc:
          "A Flutter package that provides a simple way to integrate Shopify APIs. It supports GraphQL, and Storefront API.",
        techStack: "Flutter, Dart, Graphql",
        link: "https://github.com/imsujan276/shopify_flutter",
        open: "https://pub.dev/packages/shopify_flutter"
      },
      "Easy Splash Screen": {
        desc:
          "A Flutter package that provides a simple way to create a splash screen.",
        techStack: "Flutter, Dart",
        link: "https://pub.dev/packages/easy_splash_screen",
        open: "https://github.com/imsujan276/EasySplashScreen"
      },
      "Easy Signature Pad": {
        desc:
          "A Flutter package that provides a simple way to create a signature field. You can save the signature as an image.",
        techStack: "Flutter, Dart",
        link: "https://pub.dev/packages/easy_signature_pad",
        open: "https://github.com/imsujan276/easy_signature_pad"
      },
      
    };

    return (
      <div id="projects">
        <div className="section-header ">
          <span className="section-title">/ pet projects</span>
        </div>
        <Carousel>
          {Object.keys(spotlightProjects).map((key, i) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={spotlightProjects[key]["image"]}
                alt={key}
              />
              <div className="caption-bg">
                <Carousel.Caption>
                  <h3>{spotlightProjects[key]["title"]}</h3>
                  <p>
                    {spotlightProjects[key]["desc"]}
                    <p className="techStack">
                      {spotlightProjects[key]["techStack"]}
                    </p>
                  </p>
                  <ExternalLinks
                    githubLink={spotlightProjects[key]["link"]}
                    openLink={spotlightProjects[key]["open"]}
                  ></ExternalLinks>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="project-container">
          <ul className="projects-grid">
            {Object.keys(projects).map((key, i) => (
              <FadeInSection delay={`${i + 1}00ms`}>
                <li className="projects-card">
                  <div className="card-header">
                    <div className="folder-icon">
                      <FolderOpenRoundedIcon
                        style={{ fontSize: 35 }}
                      ></FolderOpenRoundedIcon>
                    </div>
                    <ExternalLinks
                      githubLink={projects[key]["link"]}
                      openLink={projects[key]["open"]}
                    ></ExternalLinks>
                  </div>

                  <div className="card-title">{key}</div>
                  <div className="card-desc">{projects[key]["desc"]}</div>
                  <div className="card-tech">{projects[key]["techStack"]}</div>
                </li>
              </FadeInSection>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Projects;
