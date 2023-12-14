/**
 * The CanvasContext class defines the `getInstance` method that lets clients access
 * the unique CanvasContext instance.
 */
export class CanvasContext {
  private static instance: CanvasContext;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  /**
   * The CanvasContext's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.canvas = document.querySelector<HTMLCanvasElement>(
      "#app"
    ) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
  }

  /**
   * The static method that controls the access to the CanvasContext instance.
   *
   * This implementation let you subclass the CanvasContext class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): CanvasContext {
    if (!CanvasContext.instance) {
      CanvasContext.instance = new CanvasContext();
    }

    return CanvasContext.instance;
  }

  /**
   * Finally, any CanvasContext should define some business logic, which can be
   * executed on its instance.
   */
  public setC() {
    // canvas = document.querySelector<HTMLCanvasElement>("#app");
  }
}
