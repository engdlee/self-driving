import { CanvasContext } from "./ts/CanvasContext";
import "./style.css";
import { Point } from "./ts/primitives/Point";
import { Graph } from "./ts/Graph";
import { Segment } from "./ts/primitives/Segment";

const canvasContext = CanvasContext.getInstance();
const canvas = canvasContext.canvas;
const ctx = canvasContext.ctx;

if (canvas) {
  canvas.width = 600;
  canvas.height = 600;
}

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p2, p3);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
graph.draw(ctx);

function removeAll() {
  graph.dispose();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
}

function removeRandomPoint() {
  if (graph.points.length == 0) {
    console.log("no points");
    return;
  }
  const index = Math.floor(Math.random() * graph.points.length);
  graph.removePoint(graph.points[index]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
}

function removeRandomSegment() {
  if (graph.segments.length == 0) {
    console.log("no segments");
    return;
  }
  const index = Math.floor(Math.random() * graph.segments.length);
  graph.removeSegment(graph.segments[index]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
}

function addRandomSegment() {
  const index1 = Math.floor(Math.random() * graph.points.length);
  const index2 = Math.floor(Math.random() * graph.points.length);
  const success = graph.tryAddSegment(
    new Segment(graph.points[index1], graph.points[index2])
  );
  // graph.addSegment(new Segment(graph.points[index1], graph.points[index2]));
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
  console.log("addRandomSegment", success);
}

function addRandomPoint() {
  const success = graph.tryAddPoint(
    new Point(Math.random() * canvas.width, Math.random() * canvas.height)
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  graph.draw(ctx);
  console.log("addRandomPoint", success);
}

const addPointButton = document.querySelector<HTMLButtonElement>(
  ".addPointButton"
) as HTMLButtonElement;
const addSegmentButton = document.querySelector<HTMLButtonElement>(
  ".addSegmentButton"
) as HTMLButtonElement;
const removePointButton = document.querySelector<HTMLButtonElement>(
  ".removePointButton"
) as HTMLButtonElement;
const removeSegmentButton = document.querySelector<HTMLButtonElement>(
  ".removeSegmentButton"
) as HTMLButtonElement;
const removeAllButton = document.querySelector<HTMLButtonElement>(
  ".removeAllButton"
) as HTMLButtonElement;

addPointButton.addEventListener("click", function handleClick(event) {
  event.preventDefault();
  addRandomPoint();
});
addSegmentButton.addEventListener("click", function handleClick(event) {
  event.preventDefault();
  addRandomSegment();
});
removePointButton.addEventListener("click", function handleClick(event) {
  event.preventDefault();
  removeRandomPoint();
});
removeSegmentButton.addEventListener("click", function handleClick(event) {
  event.preventDefault();
  removeRandomSegment();
});
removeAllButton.addEventListener("click", function handleClick(event) {
  event.preventDefault();
  removeAll();
});