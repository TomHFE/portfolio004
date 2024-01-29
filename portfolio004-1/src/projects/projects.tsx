import React from "react";
import "./projects.scss";
import projectData from "./project-data.tsx";

interface ProjectData {
  id: number;
  title: string;
  number: string;
  name: string;
  info: string;
  img: string[];
  specs: string[];
  link: string;
}

export default function Projects() {
  const cycledData: ProjectData[] = projectData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }

    if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  console.log(cycledData);

  return (
    <div>
      <div className="project-section">
        {" "}
        {cycledData.map((project, index) => (
          <div className="prj" key={index}>
            <img
              className="prj-main-body"
              src="/images/project-images/project-main-body.png"
            />
            <img
              className="prj-second-body"
              src="/images/project-images/secondary-menu-body.png"
            />
            <img
              className="prj-menu-button"
              src="/images/project-images/menu-project-section.png"
            />
            <img
              className="prj-build-button"
              src="/images/project-images/build-project-section.png "
            />
            <img
              className="prj-back-to-top-button"
              src="/images/project-images/back-to-top-project-section.png "
            />
            <div className="prj-view">
              <img
                className="prj-view-button"
                src="/images/project-images/view-button-project.png"
              />
              <h3 className="prj-view-title">VIEW SITE</h3>
            </div>
            <img
              className="prj-forward-button"
              src="/images/project-images/forward-project-button.png"
            />
            <img
              className="prj-backward-button"
              src="/images/project-images/back-project-button.png"
            />
            <h3 className="menu">MENU</h3>
            <h3 className="build">BUILD</h3>
            <h3 className="start">BACK TO START</h3>
            <h1 className="title">{project.name.toUpperCase()}</h1>
            <div className="horizontal-line title-line"></div>
            <img className="image-section" src={project.img[0]} />
            <div className="proj-specs">
              {project.specs.map((spec) => (
                <span id="spec">{spec} </span>
              ))}
            </div>
            <div id="spec-title">SPECS</div>
            <div className="horizontal-line " id="spec-line"></div>
            {/* <div className="info">{project.info}</div> */}
            <div className="number">
              {project.id}/{cycledData[0].id}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
