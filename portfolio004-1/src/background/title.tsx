import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// look up some tutorials on the matter

const Title: React.FC = () => {
  const TitleContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer's DOM element to the container
    if (TitleContainer.current) {
      TitleContainer.current.appendChild(renderer.domElement);
    }

    const geometry = new THREE.PlaneGeometry(5, 5); // Adjust the size as needed

    // Load image texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("images/title.png");

    // // Create a plane for the background
    // const planeGeometry = new THREE.PlaneGeometry(10, 10);
    // const planeMaterial = new THREE.MeshBasicMaterial({
    //   color: 0xeeeeee,
    //   side: THREE.DoubleSide,
    // });
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // scene.add(plane);

    // const fontLoader = new FontLoader();
    // fontLoader.load(
    //   "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json",
    //   (helvetica) => {
    //     const textGeometry = new TextGeometry(
    //       `Alyosha
    //     Portfolio 004`,
    //       {
    //         font: helvetica,
    //         size: 0.5,
    //         height: 0.05,
    //         curveSegments: 12,
    //         bevelEnabled: true,
    //         bevelThickness: 0.03,
    //         bevelSize: 0.02,
    //         bevelOffset: 0,
    //         bevelSegments: 5,
    //       }
    //     );

    //     const texture = new THREE.Texture(textGeometry);

    //     // Create 2D text with ShaderMaterial
    //     // const textGeometry = new TextGeometry("Hello, Three.js!", {
    //     //   font: new FontLoader().parse(
    //     //     "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json"
    //     //   ),
    //     //   size: 0.5,
    //     //   height: 0.05,
    //     //   curveSegments: 12,
    //     //   bevelEnabled: true,
    //     //   bevelThickness: 0.03,
    //     //   bevelSize: 0.02,
    //     //   bevelOffset: 0,
    //     //   bevelSegments: 5,
    //     // });

    const shaderMaterial = new THREE.ShaderMaterial({
      vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );	
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
      fragmentShader: `
          uniform sampler2D texture;
          uniform float time;
          uniform float alpha;
          uniform float strength;
          uniform float size;
          varying vec2 vUv;
          
          void main() {
            float speed = 1.0;
            vec2 p = -1.0 + 2.0 * vUv;
            vec2 newUV = vUv + strength * vec2(cos(time * speed + length( p * size )), sin(time * speed + length(p * size)));
            vec4 col1 = texture2D(texture, newUV);
            gl_FragColor = vec4(col1.rgb, col1.a * alpha);
          }
        `,
      uniforms: {
        texture: { value: texture },
        time: { value: 1.0 },
        alpha: { value: 1.0 },
        strength: { value: 1.0 },
        size: { value: 1.0 },
      }, // Add any additional uniforms here if needed
    });

    const textMesh = new THREE.Mesh(geometry, shaderMaterial);
    textMesh.position.set(-2, 1, 0);
    scene.add(textMesh);
    // Set camera position
    camera.position.z = 450;

    // Render the scene
    function animate() {
      requestAnimationFrame(animate);

      // Add your other animation or interaction updates here

      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);

      // Update the plane geometry dimensions
      const newGeometry = new THREE.PlaneGeometry(newWidth, newHeight);
      textMesh.geometry.dispose();
      textMesh.geometry = newGeometry;
    }

    // Initial resize
    handleResize();

    // Handle window resize
    window.addEventListener("resize", handleResize);

    // Start the animation loop
    animate();

    // Cleanup on component unmount
    return () => {
      if (TitleContainer.current) {
        window.removeEventListener("resize", handleResize);
        TitleContainer.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array to run useEffect only once

  return <div ref={TitleContainer} />;
};

export default Title;

//   const sceneRef = useRef<THREE.Scene | null>(null);

//   useEffect(() => {
//     // Set up the scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     // Create a plane for the background
//     const planeGeometry = new THREE.PlaneGeometry(10, 10);
//     const planeMaterial = new THREE.MeshBasicMaterial({
//       color: 0xeeeeee,
//       side: THREE.DoubleSide,
//     });
//     const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//     scene.add(plane);

//     const fontLoader = new FontLoader();
//     fontLoader.load(
//       "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json",
//       (helvetica) => {
//         const textGeometry = new TextGeometry(
//           `Alyosha
//       Portfolio 004`,
//           {
//             font: helvetica,
//             size: 0.5,
//             height: 0.05,
//             curveSegments: 12,
//             bevelEnabled: true,
//             bevelThickness: 0.03,
//             bevelSize: 0.02,
//             bevelOffset: 0,
//             bevelSegments: 5,
//           }
//         );

//         // Create 2D text with ShaderMaterial
//         // const textGeometry = new TextGeometry("Hello, Three.js!", {
//         //   font: new FontLoader().parse(
//         //     "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json"
//         //   ),
//         //   size: 0.5,
//         //   height: 0.05,
//         //   curveSegments: 12,
//         //   bevelEnabled: true,
//         //   bevelThickness: 0.03,
//         //   bevelSize: 0.02,
//         //   bevelOffset: 0,
//         //   bevelSegments: 5,
//         // });

//         const shaderMaterial = new THREE.ShaderMaterial({
//           vertexShader: `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
//           gl_Position = projectionMatrix * mvPosition;
//         }
//       `,
//           fragmentShader: `
//         uniform sampler2D texture;
//         uniform float time;
//         uniform float alpha;
//         uniform float strength;
//         uniform float size;
//         varying vec2 vUv;

//         void main() {
//           float speed = 1.0;
//           vec2 p = -1.0 + 2.0 * vUv;
//           vec2 newUV = vUv + strength * vec2(cos(time * speed + length( p * size )), sin(time * speed + length(p * size)));
//           vec4 col1 = texture2D(texture, newUV);
//           gl_FragColor = vec4(col1.rgb, col1.a * alpha);
//         }
//       `,
//           side: THREE.DoubleSide,
//           uniforms: {}, // Add any additional uniforms here if needed
//         });

//         const textMesh = new THREE.Mesh(textGeometry, shaderMaterial);
//         textMesh.position.set(-2, 1, 0);
//         scene.add(textMesh);
//       }
//     );
//     // Set camera position
//     camera.position.z = 5;

//     // Create a render loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//     };

//     animate();

//     sceneRef.current = scene;

//     // Cleanup on component unmount
//     return () => {
//       renderer.domElement.remove();
//     };
//   }, []);

//   return <div>{sceneRef.current}</div>; // or return some React content if needed
// };

// import * as THREE from "three";
// // import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// import { FontLoader } from "three/addons/loaders/FontLoader.js";
// import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// export default function Title() {
//   // Set up the scene, camera, and renderer
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   const renderer = new THREE.WebGLRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   // Create a plane for the background
//   const planeGeometry = new THREE.PlaneGeometry(10, 10);
//   const planeMaterial = new THREE.MeshBasicMaterial({
//     color: 0xeeeeee,
//     side: THREE.DoubleSide,
//   });
//   const plane = new THREE.Mesh(planeGeometry, planeMaterial);
//   scene.add(plane);

//   // Create 2D text with ShaderMaterial
//   const textGeometry = new TextGeometry("Hello, Three.js!", {
//     font: new FontLoader().parse(
//       "https://threejsfundamentals.org/threejs/resources/threejs/fonts/helvetiker_regular.typeface.json"
//     ),
//     size: 0.5,
//     height: 0.05,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 0.03,
//     bevelSize: 0.02,
//     bevelOffset: 0,
//     bevelSegments: 5,
//   });

//   const shaderMaterial = new THREE.ShaderMaterial({
//     vertexShader: `
//     varying vec2 vUv;

//     void main()
//     {
//       vUv = uv;

//       vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
//       gl_Position = projectionMatrix * mvPosition;
//     }`,
//     fragmentShader: `
//     uniform sampler2D texture;

//     uniform float time;
//     uniform float alpha;
//     uniform float strength;
//     uniform float size;

//     varying vec2 vUv;

//     void main()
//     {
//       //float size = 6.0;
//       float speed = 1.0;
//       vec2 p = -1.0 + 2.0 * vUv;
//       vec2 newUV = vUv + strength * vec2(cos(time * speed + length( p * size )), sin(time * speed + length(p * size)));

//       //vec4 col1 = texture2D( texture, vUv );
//       vec4 col1 = texture2D( texture, newUV );

//       gl_FragColor = vec4( col1.rgb, col1.a * alpha );
//       //gl_FragColor = mfColor;
//     }`,
//     side: THREE.DoubleSide,
//     uniforms: {}, // Add any additional uniforms here if needed
//   });

//   const textMesh = new THREE.Mesh(textGeometry, shaderMaterial);
//   textMesh.position.set(-2, 1, 0);
//   scene.add(textMesh);

//   // Set camera position
//   camera.position.z = 5;

//   // Create a render loop
//   const animate = () => {
//     requestAnimationFrame(animate);
//     renderer.render(scene, camera);
//   };

//   animate();
// }
