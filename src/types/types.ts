export interface Point {
  x: number;
  y: number;
  equals: (point: Point) => boolean;
  draw: (ctx: CanvasRenderingContext2D, size?: number, color?: string) => void;
}
export interface Segment {
  p1: Point;
  p2: Point;
  equals: (seg: Segment) => boolean;
  includes: (point: Point) => boolean;
  draw: (ctx: CanvasRenderingContext2D, width?: number, color?: string) => void;
}

export interface Graph {
  points: Point[];
  segments: Segment[];
  addPoint: (point: Point) => void;
  containsPoint: (point: Point) => boolean;
  tryAddPoint: (point: Point) => boolean;
  addSegment: (seg: Segment) => void;
  containsSegment: (seg: Segment) => boolean;
  tryAddSegment: (seg: Segment) => boolean;
  removePoint: (point: Point) => void;
  removeSegment: (seg: Segment) => void;
  getSegmentsWithPoint: (point: Point) => Segment[];
  dispose: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}
