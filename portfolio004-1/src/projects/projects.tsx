import React from "react";
import "./projects.scss";
import projectData from "./project-data.tsx";
import { useRef } from "react";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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
  gsap.registerPlugin(ScrollTrigger);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  // const parent = document.querySelector("#scroll-section-inner");
  // const child = gsap.utils.toArray("#scroll-section-inner section");

  const cycledData: ProjectData[] = projectData.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    }

    if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  const xValue = cycledData[0].id * 100 + 100;

  // useGSAP(() => {
  // if (parent instanceof HTMLElement) {
  //   const tl = gsap.timeline({
  //     defaults: {
  //       ease: "none",
  //     },
  //     scrollTrigger: {
  //       trigger: parent,
  //       pin: true,
  //       // scrub: 2,
  //       end: "+=" + xValue * 40, //speed of scroll
  //     },
  //   });
  //   tl.to(parent, {
  //     translateX: `-${xValue}vw`,
  //   });

  // child.forEach((elem, i) => {
  //   // @ts-ignore
  //   const prjElement: HTMLElement | null = elem.querySelector(".prj");

  //   if (prjElement) {
  //     const tl = gsap.timeline();
  //     tl.from(prjElement, {
  //       y: -50,
  //       opacity: 0,
  //       scrollTrigger: {
  //         trigger: prjElement,
  //         start: "left center",
  //         end: "center center",
  //         containerAnimation: tl,
  //         scrub: true,
  //         markers: true,
  //       },
  //     });
  //   }
  // });
  //   }
  // }, []);

  console.log(triggerRef.current);

  useGSAP(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: `-${xValue}vw`,
        ease: "easeInOut",
        // duration: 10,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top ",
          // end: `bottom top`,
          // markers: true,
          scrub: 0.1,
          pin: true,
          anticipatePin: 3,
          end: "+=" + xValue * 40, //speed of scroll
          // end: () =>
          //   "+=" + document.querySelector("#scroll-section-inner")?.offsetWidth,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  //   console.log(triggerRef.current);
  //   if (triggerRef.current) {
  //     const sections = gsap.utils.toArray<HTMLDivElement>(".prj");

  //     sections.forEach((elem, i) => {
  //       const anim = gsap.fromTo(
  //         elem,
  //         {
  //           x: -50,
  //           opacity: 0,
  //         },
  //         {
  //           x: 0,
  //           opacity: 1,

  //           scrollTrigger: {
  //             trigger: sections,
  //             start: "left left", // Adjust start property
  //             end: "left right",
  //             horizontal: true,

  //             // end: `bottom bottom`,
  //             containerAnimation: pin,

  //             markers: true,
  //             scrub: 0.9,
  //             pin: true,
  //             // end: "+=" + xValue * 40, //speed of scroll
  //           },
  //         }
  //       );
  //     });
  //   }
  //   // const sections: NodeListOf<HTMLElement> = document.querySelectorAll(".prj");

  //   // sections.forEach((stop, i) => {
  //   //   tl.fromTo(
  //   //     stop.querySelector(".prj-main-body"),
  //   //     {
  //   //       yPercent: -50,
  //   //       opacity: 0,
  //   //     },
  //   //     {
  //   //       yPercent: 0,
  //   //       opacity: 1,
  //   //       duration: 1,
  //   //       ease: "linear",
  //   //       scrollTrigger: {
  //   //         trigger: stop,
  //   //         start: "left left",
  //   //         end: "right right",
  //   //         // containerAnimation: tl,
  //   //         scrub: true,
  //   //         markers: true,
  //   //       },
  //   //     }
  //   //   );
  //   // });

  //   return () => {
  //     {
  //       /* A return function for killing the animation on component unmount */
  //     }
  //     pin.kill();
  //   };
  // }, []);

  return (
    <div id="scroll-section-outer">
      <div className="project-section">
        <div>
          <div
            ref={sectionRef}
            id="scroll-section-inner"
            style={{ width: `${+cycledData[0].id * 100 + 100}vw` }}
          >
            <div id="project-start"></div>
            {cycledData.map((project) => (
              <div ref={triggerRef} key={project.number}>
                <section className="prj" key={project.number}>
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
                  {/* <div className="prj-view"> */}
                  {/* <img
              className="prj-view"
              src="/images/project-images/view-button-project.png"
            /> */}
                  <h3 className="prj-view-title">VIEW SITE</h3>
                  {/* </div> */}
                  {/* <img
              className="prj-forward-button"
              src="/images/project-images/forward-project-button.png"
            />
            <img
              className="prj-backward-button"
              src="/images/project-images/back-project-button.png"
            /> */}
                  <h3 className="menu">MENU</h3>
                  <h3 className="build">BUILD</h3>
                  <h3 className="start">BACK TO START</h3>
                  <h1 className="title">{project.name.toUpperCase()}</h1>
                  <div className="horizontal-line title-line"></div>
                  <img className="image-section" src={project.img[0]} />
                  <div className="proj-specs">
                    {project.specs.map((spec, i) => (
                      <span key={i} id="spec">
                        {spec}{" "}
                      </span>
                    ))}
                  </div>
                  <div id="spec-title">SPECS</div>
                  <div className="horizontal-line " id="spec-line"></div>
                  <div id="info">BRIEF</div>
                  <div className="number">
                    {project.id}/{cycledData[0].id}
                  </div>
                </section>
              </div>
            ))}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
