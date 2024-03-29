// shader for future use

const HoverShader = {
  vertex: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,

  fragment: `
    varying vec2 vUv;

    uniform float dispFactor;
    uniform float dpr;
    uniform sampler2D disp;

    uniform sampler2D texture1;
    uniform sampler2D texture2;
    uniform float angle1;
    uniform float angle2;
    uniform float intensity1;
    uniform float intensity2;
    uniform vec4 res;
    uniform vec2 parent;

    mat2 getRotM(float angle) {
      float s = sin(angle);
      float c = cos(angle);
      return mat2(c, -s, s, c);
    }

    void main() {
      vec4 disp = texture2D(disp, vUv);
      vec2 dispVec = vec2(disp.r, disp.g);

      vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy);
      vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);

      vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;
      vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
      vec4 _texture1 = texture2D(texture1, distortedPosition1);
      vec4 _texture2 = texture2D(texture2, distortedPosition2);
      gl_FragColor = mix(_texture1, _texture2, dispFactor);
    }
  `,

  // Please respect authorship and do not remove
  logAuthor: () => {
    console.log(
      "%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ",
      "color: #bada55; font-size: 0.8rem"
    );
  },
};

export default HoverShader;
