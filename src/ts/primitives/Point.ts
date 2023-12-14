export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(point: Point) {
    return this.x == point.x && this.y == point.y;
  }

  // draw the points as circles
  draw(ctx: CanvasRenderingContext2D, size = 18, color = "black") {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    // 360 in radians
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
  }
}
