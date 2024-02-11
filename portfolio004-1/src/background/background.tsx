import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { CustomPass } from "../shaders/CustomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import gsap from "gsap";

import projectData from "../projects/project-data.tsx";

interface Props {
  isAnim: boolean;
}

const Background = ({ isAnim }: Props) => {
  const rendererContainer = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState<boolean>(false);

  useEffect(() => {
    console.log(isAnim);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      2 *
        Math.atan(
          window.innerWidth /
            (window.innerWidth / window.innerHeight) /
            (2 * 450)
        ) *
        (180 / Math.PI),
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (rendererContainer.current) {
      rendererContainer.current.appendChild(renderer.domElement);
    }

    // Set camera position
    camera.position.z = 450;

    // Load your image
    // const imagePath = projectData[0].img[0]; // Change this to your image path
    const imagePath = "/images/clouds-1.webp";
    const textureLoader = new THREE.TextureLoader();
    const imageTexture = textureLoader.load(imagePath);

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        imageTexture: { value: imageTexture },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D imageTexture;
        varying vec2 vUv;
        void main() {
          vec4 imageColor = texture2D(imageTexture, vUv);
          gl_FragColor = imageColor;
        }
      `,
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const effect1 = new ShaderPass(CustomPass);
    effect1.uniforms["scale"].value = 1.8;
    effect1.uniforms["progress"].value = 0;

    composer.addPass(effect1);

    const effect3 = new OutputPass();
    composer.addPass(effect3);

    const clock = new THREE.Clock();

    const geometry = new THREE.PlaneGeometry(16, 6); // Aspect ratio 16:9
    const plane = new THREE.Mesh(geometry, shaderMaterial);
    // plane.position.y = -350;
    scene.add(plane);

    function Animate() {
      requestAnimationFrame(Animate);

      effect1.uniforms["time"].value = clock.getElapsedTime() / 20;

      composer.render();
    }
    // document.addEventListener("scroll", () => {
    const handleAnimation = (isAnim: boolean) => {
      if (!isAnim) {
        // gsap.to(camera.position, {

        //   y: 1000,
        //   ease: "expo.inOut",
        //   duration: 2,
        // });
        gsap.to(effect1.uniforms["progress"], {
          value: 0,
          ease: "expo.inOut",
          duration: 2,
        });
        // gsap.to(camera.position, {
        //   z: 1000,
        //   ease: "expo.inOut",
        //   duration: 2,
        //   delay: 2,
        // });
      } else {
        // gsap.to(camera.position, {
        //   // y: 450,
        //   z: 450,
        //   ease: "expo.inOut",
        //   duration: 2,
        // });
        gsap.to(effect1.uniforms["progress"], {
          value: 0.6,
          ease: "expo.inOut",
          duration: 4,
        });
      }
    };
    handleAnimation(isAnim);

    function handleResize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.fov =
        2 *
        Math.atan(
          window.innerWidth /
            (window.innerWidth / window.innerHeight) /
            (2 * 450)
        ) *
        (180 / Math.PI);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);

      const newGeometry = new THREE.PlaneGeometry(newWidth, newHeight);
      plane.geometry.dispose();
      plane.geometry = newGeometry;
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    Animate();

    return () => {
      if (rendererContainer.current) {
        window.removeEventListener("resize", handleResize);
        rendererContainer.current.removeChild(renderer.domElement);
      }
    };
  }, [isAnim]);

  // useEffect(() => {
  //   function handleChange(inView: boolean) {
  //     if (!inView) {
  //       gsap.to(effect1.uniforms["progress"], {
  //         value: 0.6,
  //         ease: "expo.inOut",
  //         duration: 1,
  //       });
  //     } else {
  //       gsap.to(effect1.uniforms["progress"], {
  //         value: 0,
  //         ease: "expo.inOut",
  //         duration: 1,
  //       });
  //     }
  //   }

  //   handleChange(inView);
  // }, [inView]); // Add 'inView' as a dependency

  return <div ref={rendererContainer} />;
};

export default Background;

// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
// import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
// import { CustomPass } from "../shaders/CustomPass.js";

// // import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";
// // import { DotScreenShader } from "three/addons/shaders/DotScreenShader.js";
// import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
// import gsap from "gsap";
// import projectData from "../projects/project-data.tsx";
// // import glass from "assets/videos/glass.webm";

// const Background: React.FC = () => {
//   const rendererContainer = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // Set up scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       2 *
//         Math.atan(
//           window.innerWidth /
//             (window.innerWidth / window.innerHeight) /
//             (2 * 450)
//         ) *
//         (180 / Math.PI),
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Append the renderer's DOM element to the container
//     if (rendererContainer.current) {
//       rendererContainer.current.appendChild(renderer.domElement);
//     }

//     console.log(projectData[0].img[0]);

//     // Set camera position
//     camera.position.z = 450;

//     // Create a video element
//     const video = document.createElement("video");
//     // video.src = projectData[0].img[0]; // Adjust the path based on your project structure
//     video.src = "/videos/glass.mp4";
//     video.loop = true;
//     video.muted = true; // Ensure video is muted to autoplay on some browsers
//     video.pause();
//     // video.playbackRate = 0.5;

//     // Create a video texture
//     const videoTexture = new THREE.VideoTexture(video);
//     videoTexture.minFilter = THREE.LinearFilter;
//     videoTexture.magFilter = THREE.LinearFilter;
//     videoTexture.format = THREE.RGBAFormat;

//     // postprocessing

//     const composer = new EffectComposer(renderer);
//     composer.addPass(new RenderPass(scene, camera));

//     const effect1 = new ShaderPass(CustomPass);
//     effect1.uniforms["scale"].value = 1.8;
//     effect1.uniforms["progress"].value = 0;

//     composer.addPass(effect1);
//     // const effect1 = new ShaderPass(DotScreenShader);
//     // effect1.uniforms["scale"].value = 4;
//     // composer.addPass(effect1);

//     // const effect2 = new ShaderPass(RGBShiftShader);
//     // effect2.uniforms["amount"].value = 0;
//     // composer.addPass(effect2);

//     const effect3 = new OutputPass();
//     composer.addPass(effect3);

//     //

//     // Custom vertex shader
//     const vertexShader = `
//       varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `;

//     // Custom fragment shader
//     const fragmentShader = `
//       uniform sampler2D videoTexture;
//       varying vec2 vUv;
//       void main() {
//         vec4 videoColor = texture2D(videoTexture, vUv);
//         gl_FragColor = videoColor;
//       }
//     `;

//     // Create ShaderMaterial
//     const shaderMaterial = new THREE.ShaderMaterial({
//       uniforms: {
//         videoTexture: { value: videoTexture },
//         time: { value: 0 },
//       },
//       vertexShader,
//       fragmentShader,
//     });

//     // Create a clock
//     const clock = new THREE.Clock();

//     // Create a plane geometry
//     const geometry = new THREE.PlaneGeometry(16, 6); // Aspect ratio 16:9
//     const plane = new THREE.Mesh(geometry, shaderMaterial);

//     plane.position.y = -1;

//     // Add the plane to the scene
//     scene.add(plane);

//     // Render the scene
//     function animate() {
//       requestAnimationFrame(animate);

//       // Add your other animation or interaction updates here

//       if (video.readyState === video.HAVE_ENOUGH_DATA) {
//         videoTexture.needsUpdate = true;
//       }

//       // renderer.render(scene, camera);
//       effect1.uniforms["time"].value = clock.getElapsedTime() / 20;

//       composer.render();
//     }
//     // hello world
//     // Handle scroll

//     function handleScroll() {
//       const scrollPosition = window.scrollY;
//       // console.log(scrollPosition);

//       if (scrollPosition !== 0) {
//         video.pause();

//         gsap.to(effect1.uniforms["progress"], {
//           value: 0.6,
//           ease: "expo.inOut",
//           duration: 1,
//         });
//       } else {
//         gsap.to(effect1.uniforms["progress"], {
//           value: 0,
//           ease: "expo.inOut",
//           duration: 1,
//         });
//         video.play();
//       }
//     }
//     document.addEventListener("scroll", () => {
//       handleScroll();
//     });
//     // Handle window resize
//     function handleResize() {
//       const newWidth = window.innerWidth;
//       const newHeight = window.innerHeight;
//       camera.fov =
//         2 *
//         Math.atan(
//           window.innerWidth /
//             (window.innerWidth / window.innerHeight) /
//             (2 * 450)
//         ) *
//         (180 / Math.PI);
//       camera.aspect = newWidth / newHeight;
//       camera.updateProjectionMatrix();

//       renderer.setSize(newWidth, newHeight);

//       // Update the plane geometry dimensions
//       const newGeometry = new THREE.PlaneGeometry(newWidth, newHeight);
//       plane.geometry.dispose();
//       plane.geometry = newGeometry;
//     }

//     // Initial resize
//     handleResize();

//     // Handle window resize
//     window.addEventListener("resize", handleResize);

//     // Start the animation loop
//     animate();

//     // Cleanup on component unmount
//     return () => {
//       if (rendererContainer.current) {
//         window.removeEventListener("resize", handleResize);
//         rendererContainer.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []); // Empty dependency array to run useEffect only once

//   return <div ref={rendererContainer} />;
// };

// export default Background;
