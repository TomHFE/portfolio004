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
  specs: string;
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

  return <div></div>;
}
