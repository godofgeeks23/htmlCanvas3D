const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;
const BACKGROUND_COLOR = "#242424ff";
const FOREGROUND_COLOR = "#3bec0eff";

canvas2D.width = CANVAS_WIDTH;
canvas2D.height = CANVAS_HEIGHT;

const ctx = canvas2D.getContext("2d");

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

clear();
point(toScreenCoordinates({ x: 0.5, y: 0.5 }));
point(toScreenCoordinates({ x: 0.5, y: -0.5 }));
point(toScreenCoordinates({ x: -0.5, y: 0.5 }));
point(toScreenCoordinates({ x: -0.5, y: -0.5 }));
