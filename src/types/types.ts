export interface PointStyle {
  size?: number;
  color?: string;
  outline?: boolean;
  fill?: boolean;
}

export interface Point {
  x: number;
  y: number;
  equals: (point: Point) => boolean;
  draw: (ctx: CanvasRenderingContext2D, pointStyle?: PointStyle) => void;
}
export interface SegmentDrawStyle {
  width?: number;
  color?: string;
  dash?: number[];
}

export interface Segment {
  p1: Point;
  p2: Point;
  equals: (seg: Segment) => boolean;
  includes: (point: Point) => boolean;
  draw: (
    ctx: CanvasRenderingContext2D,
    segmentDrawStyle?: SegmentDrawStyle
  ) => void;
}

export interface Graph {
  points: Point[];
  segments: Segment[];
  addPoint: (point: Point) => void;
  containsPoint: (point: Point) => boolean | undefined;
  tryAddPoint: (point: Point) => boolean;
  addSegment: (seg: Segment) => void;
  containsSegment: (seg: Segment) => boolean | undefined;
  tryAddSegment: (seg: Segment) => boolean;
  removePoint: (point: Point) => void;
  removeSegment: (seg: Segment) => void;
  getSegmentsWithPoint: (point: Point) => Segment[];
  dispose: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}
