export interface PointStyle {
  size?: number;
  color?: string;
  outline?: boolean;
  fill?: boolean;
}

export interface IPoint {
  x: number;
  y: number;
  equals: (point: IPoint) => boolean;
  draw: (ctx: CanvasRenderingContext2D, pointStyle?: PointStyle) => void;
}
export interface SegmentDrawStyle {
  width?: number;
  color?: string;
  dash?: number[];
}

export interface ISegment {
  p1: IPoint;
  p2: IPoint;
  length: () => number;
  directionVector: () => IPoint;
  equals: (seg: ISegment) => boolean;
  includes: (point: IPoint) => boolean;
  distanceToPoint: (point: IPoint) => number;
  projectPoint: (point: IPoint) => { point: IPoint; offset: number };
  draw: (
    ctx: CanvasRenderingContext2D,
    segmentDrawStyle?: SegmentDrawStyle
  ) => void;
}

export interface IGraph {
  points: IPoint[];
  segments: ISegment[];
  addPoint: (point: IPoint) => void;
  hash: () => string;
  containsPoint: (point: IPoint) => boolean | undefined;
  tryAddPoint: (point: IPoint) => boolean;
  addSegment: (seg: ISegment) => void;
  containsSegment: (seg: ISegment) => boolean | undefined;
  tryAddSegment: (seg: ISegment) => boolean;
  removePoint: (point: IPoint) => void;
  removeSegment: (seg: ISegment) => void;
  getSegmentsWithPoint: (point: IPoint) => ISegment[];
  dispose: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export interface IViewport {
  canvas: HTMLCanvasElement;
  zoom: number;
  getMouse: (evt: MouseEvent, subtractDragOffset?: boolean) => IPoint;
}

export interface IPolygonDrawStyle {
  stroke?: string;
  lineWidth?: number;
  fill?: string;
}
export interface IPolygon {
  points: IPoint[];
  segments: ISegment[];
  intersectsPoly: (poly: IPolygon) => boolean;
  containsSegment: (seg: ISegment) => boolean;
  containsPoint: (point: IPoint) => boolean;
  distanceToPoint: (point: IPoint) => number;
  distanceToPoly: (poly: IPolygon) => number;
  drawSegments: (ctx: CanvasRenderingContext2D) => void;
  draw: (
    ctx: CanvasRenderingContext2D,
    polygonDrawStyle?: IPolygonDrawStyle
  ) => void;
}

export interface IEnvelope {
  skeleton: ISegment;
  poly: IPolygon | null;
  roundness: number;
  draw: (ctx: CanvasRenderingContext2D, options: IPolygonDrawStyle) => void;
}
