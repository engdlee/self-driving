import { IEnvelope, IGraph, IPoint, IPolygon, ISegment } from '../types/types';
import { Envelope } from './primitives/Envelope';
import { Polygon } from './primitives/Polygon';

export class World {
  graph: IGraph;
  roadWidth: number;
  roadRoundness: number;
  envelopes: IEnvelope[];
  roadBorders: ISegment[];
  //   intersections: IPoint[];

  constructor(
    graph: IGraph,
    roadWidth: number = 100,
    roadRoundness: number = 10
  ) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;

    this.envelopes = [];
    this.roadBorders = [];
    // this.intersections = [];

    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const seg of this.graph.segments) {
      this.envelopes.push(
        new Envelope(seg, this.roadWidth, this.roadRoundness)
      );
    }

    this.roadBorders = Polygon.union(
      this.envelopes.map((e) => e.poly) as IPolygon[]
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const env of this.envelopes) {
      env.draw(ctx, { fill: '#BBB', stroke: '#BBB' });
    }
    for (const seg of this.graph.segments) {
      seg.draw(ctx, { color: 'white', width: 4, dash: [10, 10] });
    }
    for (const seg of this.roadBorders) {
      seg.draw(ctx, { color: 'white', width: 4 });
    }
  }
}
