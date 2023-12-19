import { CanvasContext } from './ts/CanvasContext';
import './style.css';
import { Point } from './ts/primitives/Point';
import { Graph } from './ts/Graph';
import { Segment } from './ts/primitives/Segment';
import { GraphEditor } from './ts/GraphEditor';
import { Viewport } from './ts/Viewport';
import { Polygon } from './ts/primitives/Polygon';
import { Envelope } from './ts/primitives/Envelope';
import { World } from './ts/World';

const canvasContext = CanvasContext.getInstance();
const canvas = canvasContext.canvas;
const ctx = canvasContext.ctx;

if (canvas) {
  canvas.width = 600;
  canvas.height = 600;
}

const graphString = localStorage.getItem('graph');
const graphInfo = graphString ? JSON.parse(graphString) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);
const viewport = new Viewport(canvas);
const graphEditor = new GraphEditor(viewport, graph);

let oldGraphHash = graph.hash();
animate();

function animate() {
  viewport.reset();
  if (graph.hash() != oldGraphHash) {
    world.generate();
    oldGraphHash = graph.hash();
  }
  world.draw(ctx);
  ctx.globalAlpha = 0.3;
  graphEditor.display();
  requestAnimationFrame(animate);
}

// -------------------------------------
const removeAllButton = document.querySelector<HTMLButtonElement>(
  '.removeAllButton'
) as HTMLButtonElement;
const saveButton = document.querySelector<HTMLButtonElement>(
  '.saveButton'
) as HTMLButtonElement;

removeAllButton.addEventListener('click', function handleClick(event) {
  event.preventDefault();
  graphEditor.dispose();
});
saveButton.addEventListener('click', function handleClick(event) {
  event.preventDefault();
  localStorage.setItem('graph', JSON.stringify(graph));
});
