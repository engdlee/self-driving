import { IPoint, ISegment } from '../types/types';
import { Point } from './primitives/Point';
import { Segment } from './primitives/Segment';

export class Graph {
  points: IPoint[];
  segments: ISegment[];

  constructor(points: IPoint[] = [], segments: ISegment[] = []) {
    this.points = points;
    this.segments = segments;
  }

  static load(info: { points: IPoint[]; segments: ISegment[] }) {
    const points = info.points.map((i) => new Point(i.x, i.y));
    const segments = info.segments.map(
      (i) =>
        new Segment(
          points.find((p) => p.equals(i.p1)) as IPoint,
          points.find((p) => p.equals(i.p2)) as IPoint
        )
    );

    return new Graph(points, segments);
  }

  hash() {
    return JSON.stringify(this);
  }

  addPoint(point: IPoint) {
    this.points.push(point);
  }

  containsPoint(point: IPoint) {
    return this.points.find((p) => p.equals(point)) !== undefined;
  }

  tryAddPoint(point: IPoint) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }
    return false;
  }

  addSegment(seg: ISegment) {
    this.segments.push(seg);
  }

  containsSegment(seg: ISegment) {
    return this.segments.find((s) => s.equals(seg)) !== undefined;
  }

  tryAddSegment(seg: ISegment) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  removePoint(point: IPoint) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  removeSegment(seg: ISegment) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  getSegmentsWithPoint(point: IPoint) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}
