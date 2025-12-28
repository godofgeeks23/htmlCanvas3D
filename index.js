const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const BACKGROUND_COLOR = "#242424ff";
const FOREGROUND_COLOR = "#3bec0eff";
const FPS = 60;

canvas2D.width = CANVAS_WIDTH;
canvas2D.height = CANVAS_HEIGHT;

const ctx = canvas2D.getContext("2d");

const cubeModel = [
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: -0.5, y: -0.5, z: 0.5 },

  { x: -0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: -0.5 },
];

const cubeFaces = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];

function generateTorus(R, r, segmentsR, segmentsTube) {
  const vertices = [];
  const faces = [];

  for (let i = 0; i < segmentsR; i++) {
    const phi = (i / segmentsR) * Math.PI * 2;
    for (let j = 0; j < segmentsTube; j++) {
      const theta = (j / segmentsTube) * Math.PI * 2; // Fixed: using j for theta loop

      const x = (R + r * Math.cos(theta)) * Math.cos(phi);
      const y = (R + r * Math.cos(theta)) * Math.sin(phi);
      const z = r * Math.sin(theta);

      vertices.push({ x, y, z });
    }
  }

  for (let i = 0; i < segmentsR; i++) {
    for (let j = 0; j < segmentsTube; j++) {
      const nextI = (i + 1) % segmentsR;
      const nextJ = (j + 1) % segmentsTube;

      const current = i * segmentsTube + j;
      const right = nextI * segmentsTube + j;
      const top = i * segmentsTube + nextJ;
      const topRight = nextI * segmentsTube + nextJ;

      faces.push([current, right, topRight, top]);
    }
  }

  return { vertices, faces };
}

const { vertices: donutModel, faces: donutFaces } = generateTorus(
  1,
  0.5,
  30,
  15
);

const vertices = donutModel;
const faces = donutFaces;
// const vertices = cubeModel;
// const faces = cubeFaces;

function clear() {
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function point({ x, y }) {
  const POINT_SIZE = 10;
  ctx.fillStyle = FOREGROUND_COLOR;
  ctx.fillRect(x - POINT_SIZE / 2, y - POINT_SIZE / 2, POINT_SIZE, POINT_SIZE);
}

function toScreenCoordinates({ x, y }) {
  return {
    x: ((x + 1) / 2) * CANVAS_WIDTH,
    y: (1 - (y + 1) / 2) * CANVAS_HEIGHT,
  };
}

function project({ x, y, z }) {
  return {
    x: x / z,
    y: y / z,
  };
}

function translateZ({ x, y, z }, dz) {
  return {
    x: x,
    y: y,
    z: z + dz,
  };
}

function rotateXZ({ x, y, z }, angle) {
  return {
    x: x * Math.cos(angle) + z * Math.sin(angle),
    y: y,
    z: z * Math.cos(angle) - x * Math.sin(angle),
  };
}

function rotateYZ({ x, y, z }, angle) {
  return {
    x: x,
    y: y * Math.cos(angle) - z * Math.sin(angle),
    z: y * Math.sin(angle) + z * Math.cos(angle),
  };
}

function rotateXY({ x, y, z }, angle) {
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
    z: z,
  };
}

function line({ x: x1, y: y1 }, { x: x2, y: y2 }) {
  ctx.strokeStyle = FOREGROUND_COLOR;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

let dz = 1;
let angle = 0;
let dt = 1 / FPS;

function frame() {
  dz += dt;
  angle += Math.PI * dt;
  clear();
  for (const vertex of vertices) {
    point(
      toScreenCoordinates(
        project(translateZ(rotateXY(rotateYZ(vertex, angle), angle), dz))
      )
    );
  }
  for (const face of faces) {
    for (let i = 0; i < face.length; i++) {
      const v1 = vertices[face[i]];
      const v2 = vertices[face[(i + 1) % face.length]];
      line(
        toScreenCoordinates(
          project(translateZ(rotateXY(rotateYZ(v1, angle), angle), dz))
        ),
        toScreenCoordinates(
          project(translateZ(rotateXY(rotateYZ(v2, angle), angle), dz))
        )
      );
    }
  }

  requestAnimationFrame(frame);
}

frame();
