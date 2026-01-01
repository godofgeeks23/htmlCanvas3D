# 3D on HTML Canvas

A minimal 3D rendering engine built from scratch using vanilla JavaScript and the HTML5 Canvas API. This project demonstrates the fundamental mathematical concepts behind 3D graphics, including 3D-to-2D projection, geometric transformations, and wireframe rendering.

## Features

- **No External Libraries**: Pure JavaScript implementation of 3D math and rendering.
- **3D Primitives**: Includes procedural generation for:
  - Cube
  - Torus (Donut)
- **Rendering Pipeline**:
  - Rotation (XY, YZ, XZ matrices)
  - Translation
  - Perspective Projection
  - Viewport Scaling
- **Wireframe Rendering**: Draws both vertices and connecting edges.
- **Animation**: Real-time rotating visualization loop.

## How it Works

The rendering pipeline transforms 3D coordinates into 2D screen coordinates through a series of mathematical operations:

1.  **Rotation**: Points are rotated around axes using trigonometric functions.
2.  **Translation**: Objects are moved into the viewing frustum (translated along the Z-axis).
3.  **Projection**: 3D points `(x, y, z)` are projected to 2D normalized coordinates `(x/z, y/z)` to simulate perspective.
4.  **Screen Mapping**: Normalized coordinates are mapped to the canvas pixel dimensions.

## Getting Started

### Prerequisites

You only need a modern web browser (Chrome, Firefox, Safari, Edge) that supports the HTML5 Canvas API.

### Running the Project

1.  Clone the repository or download the source code.
2.  Open `index.html` file directly in your web browser.

## Customization

You can modify `index.js` to switch between models or adjust rendering parameters:

- **Switch Models**:
  To switch between the Torus and Cube models, change the `vertices` and `faces` assignment in `index.js`:

  ```javascript
  // For Torus
  const vertices = donutModel;
  const faces = donutFaces;

  // For Cube
  // const vertices = cubeModel;
  // const faces = cubeFaces;
  ```

- **Adjust Torus Dimensions**:
  Modify the `generateTorus` parameters:
  ```javascript
  generateTorus(MajorRadius, TubeRadius, RadialSegments, TubeSegments);
  ```

## License

This project is open for educational purposes. Feel free to use and modify it.
