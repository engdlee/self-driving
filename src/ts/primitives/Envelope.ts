import { IPolygon, IPolygonDrawStyle, ISegment } from '../../types/types';
import { angle, subtract, translate } from '../utils';
import { Polygon } from './Polygon';

export class Envelope {
  skeleton: ISegment;
  poly: IPolygon | null;
  roundness: number;

  constructor(skeleton: ISegment, width: number, roundness: number = 1) {
    this.skeleton = skeleton;
    this.poly = this.#generatePolygon(width, roundness);
    this.roundness = roundness;
  }

  #generatePolygon(width: number, roundness: number) {
    if (this.skeleton) {
      const { p1, p2 } = this.skeleton;

      const radius = width / 2;
      const alpha = angle(subtract(p1, p2));
      const alpha_cw = alpha + Math.PI / 2;
      const alpha_ccw = alpha - Math.PI / 2;

      const points = [];
      const step = Math.PI / Math.max(1, roundness);
      const eps = step / 2;
      for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
        points.push(translate(p1, i, radius));
      }
      for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
        points.push(translate(p2, Math.PI + i, radius));
      }

      return new Polygon(points);
    }
    return null;
  }

  draw(ctx: CanvasRenderingContext2D, options: IPolygonDrawStyle) {
    if (this.poly) {
      this.poly.draw(ctx, options);
      //   this.poly.drawSegments(ctx); //to see the intersections
    }
  }
}
