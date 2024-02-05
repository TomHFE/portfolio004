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

const Data: ProjectData[] = [];
let counter = 0;

class Project {
  // Constructor
  id = counter++;
  title: string;
  number: string;
  name: string;
  info: string;
  img: string[];
  specs: string[];
  link: string;
  constructor(
    title: string,
    number: string,
    name: string,
    info: string,
    img: string[],
    specs: string[],
    link: string
  ) {
    this.title = title;
    this.number = number;
    this.name = name;
    this.info = info;
    this.img = img;
    this.specs = specs;
    this.link = link;
  }
}

const P1 = new Project(
  "movieApp",
  "5",
  "Movie App",
  "My first App!. This site uses fetch to pull data from a movie API depending on the users input. It also has React Router to handle page changes along with error boundaries, redirecting and Framer Motion for animation. This site was built with React, Javascript and CSS.",
  [
    "/images/project-images/images-portfolio/img-5.jpeg",
    "/images/project-images/images-portfolio/img-12.jpg",
  ],
  ["React", "Javascript", "Framer Motion", "CSS", "HTML"],
  "https://github.com/TomHFE/movie-app"
);
const P2 = new Project(
  "cssCv",
  "4",
  "CSS CV",
  "Heres an example I made of my understanding of CSS and grid more specifically. This online CV was built with React and has the various components of a CV built through nested Grid layouts.",
  [
    "/images/project-images/images-portfolio/img-7.jpg",
    "/images/project-images/images-portfolio/img-8.jpg",
  ],
  ["React", "Javascript", "CSS", "HTML"],
  "https://github.com/TomHFE/CV-react"
);
const P3 = new Project(
  "hyperionProjects",
  "3",
  "Hyperion Development",
  "Here you can find a list of all my projects and their grades. Follow the link above to find out more.",
  [
    "/images/project-images/images-portfolio/img-16.png",
    "/images/project-images/images-portfolio/img-10.jpg",
  ],
  ["React", "Javascript", "Framer Motion", "CSS", "HTML", "Redux", "Python"],
  "https://www.hyperiondev.com/portfolio/104617/"
);
const P4 = new Project(
  "hyperionFinalProject",
  "2",
  "Final HD Project",
  "My final project with Hyperion Development. This game fetched data from a movie API. The data was then converted into an array of blank letters which would then be updated depending on if the user managed to pick the correct letters. The site also stored highscore, number of lives and gave corresponding clues depending on how many lives where remaining, through fetching data from the API. Feel free to give it a try by clicking the link above and downloading the file from my Github!",
  [
    "/images/project-images/images-portfolio/img-15.webp",
    "/images/project-images/images-portfolio/img-11.jpg",
  ],
  ["React", "Javascript", "Framer Motion", "CSS", "HTML", "Redux"],
  "https://github.com/TomHFE/hangman-app"
);
const P5 = new Project(
  "previousWebsite",
  "1",
  "My Previous Website",
  "My previous website. This website was built with 3D animation software Spline for the homepage, along with Framer motion to handle animations and transitions. It also has React Router to handle page changes and React Javascript and CSS as the languages to build the UI/UX",
  [
    "/images/project-images/images-portfolio/img-1.jpeg",
    "/images/project-images/images-portfolio/img-2.png",
  ],
  [
    "React",
    "Javascript",
    "React Router",
    "Spline",
    "Framer Motion",
    "CSS",
    "HTML",
  ],
  "https://github.com/TomHFE/new-site"
);
const P6 = new Project(
  "newWebsite",
  "0",
  "My Website",
  "My New site uses Three Js to build a background image this image is then manipulated using GLSL shader language to manipulate it creating the effect shown. This website also uses typescript, sass for styling and GSAP for animations along with Vite as the framework.",
  [
    "/images/project-images/images-portfolio/brut-flat.png",
    "/images/project-images/images-portfolio/img-13.jpg",
  ],
  [
    "Vite",
    "React",
    "Typescript",
    "Three.js",
    "GLSL",
    "WebGL",
    "GSAP",
    "SASS",
    "HTML",
  ],
  "tom-webdev.co.uk"
);

Data.push(P1, P2, P3, P4, P5, P6);

export default Data;
