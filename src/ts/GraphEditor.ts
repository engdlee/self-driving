import { IGraph, IPoint, IViewport } from '../types/types';
import { Segment } from './primitives/Segment';
import { getNearestPoint } from './utils';

export class GraphEditor {
  canvas: HTMLCanvasElement;
  graph: IGraph;
  ctx: CanvasRenderingContext2D;
  selected: IPoint | null;
  hovered: IPoint | null;
  dragging: boolean;
  mouse: IPoint | null;
  viewport: IViewport;

  constructor(viewport: IViewport, graph: IGraph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this));
    // show hovered point
    this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this));
    this.canvas.addEventListener('contextmenu', (evt) => evt.preventDefault());
    this.canvas.addEventListener('mouseup', () => (this.dragging = false));
  }

  #handleMouseDown(evt: MouseEvent) {
    //right click
    if (evt.button == 2) {
      if (this.selected) {
        this.selected = null;
      } else {
        if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      }
    }
    //left click
    if (evt.button == 0) {
      if (this.hovered) {
        // we add a segment between the selected and the hovered point
        this.#select(this.hovered);
        this.dragging = true;
        return;
      }
      if (this.mouse) {
        this.graph.addPoint(this.mouse);
        //we add a segment between the selected and the new point
        this.#select(this.mouse);
      }
      this.hovered = this.mouse;
    }
  }

  #handleMouseMove(evt: MouseEvent) {
    this.mouse = this.viewport.getMouse(evt, true);
    this.hovered = getNearestPoint(
      this.mouse,
      this.graph.points,
      10 * this.viewport.zoom
    );
    //if we are moving
    if (this.dragging && this.selected) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  #select(point: IPoint) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point: IPoint) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }

  dispose() {
    this.graph.dispose();
    this.selected = null;
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
    if (this.selected) {
      if (this.mouse) {
        const intent = this.hovered ? this.hovered : this.mouse;
        new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
      }
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}
