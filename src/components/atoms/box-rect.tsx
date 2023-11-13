export class BoxRect {
  ctx: CanvasRenderingContext2D;
  label: string;
  coords: [number, number, number, number];
  trigger: boolean;
  controlTrigger: number | undefined;

  constructor(
    ctx: CanvasRenderingContext2D,
    label: string,
    coords: number[],
    trigger: boolean,
    controlTrigger: number | undefined
  ) {
    this.ctx = ctx;
    this.label = label;
    this.coords = [coords[0], coords[1], coords[2], coords[3]];
    this.trigger = trigger;
    this.controlTrigger = controlTrigger;
  }

  controls() {
    if (!this.trigger) return;
    const color = this.trigger ? "green" : "red";
    this.ctx.fillStyle = color;
    const comb: [number, number][] = [
      [0, 1],
      [0, 3],
      [2, 1],
      [2, 3],
    ];
    comb.forEach((num, index) => {
      this.ctx.fillStyle =
        this.controlTrigger !== index
          ? this.trigger
            ? "green"
            : "red"
          : "purple";
      this.ctx.fillRect(
        this.coords[num[0]] - (this.controlTrigger !== index ? 5 : 10),
        this.coords[num[1]] - (this.controlTrigger !== index ? 5 : 10),
        this.controlTrigger !== index ? 10 : 20,
        this.controlTrigger !== index ? 10 : 20
      );
    });

    this.ctx.fillStyle = this.trigger ? "green" : "red";
    const text = "+";
    this.ctx.font = "14px Poppins";
    this.ctx.fillText(
      text,
      this.coords[0] + (this.coords[2] - this.coords[0]) / 2,
      this.coords[1] + (this.coords[3] - this.coords[1]) / 2
    );
  }

  render_label() {
    this.ctx.fillStyle = this.trigger ? "green" : "red";
    const pos0 = [this.coords[0], this.coords[1]];
    const text = this.label;
    this.ctx.font = "14px Poppins";
    const width = this.ctx.measureText(text).width;
    this.ctx.fillRect(pos0[0], pos0[1] - 20, width + 10, 20);
    this.ctx.fillStyle = "white";
    this.ctx.fillText(text, pos0[0] + 5, pos0[1] - 5);
  }

  render() {
    const color = this.trigger ? "rgba(255,255,255,0.05)" : "rgba(255,0,0,0.05)";
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.coords[0],
      this.coords[1],
      this.coords[2] - this.coords[0],
      this.coords[3] - this.coords[1]
    );
    this.ctx.strokeStyle = this.trigger ? "green" : "red";
    this.ctx.strokeRect(
      this.coords[0],
      this.coords[1],
      this.coords[2] - this.coords[0],
      this.coords[3] - this.coords[1]
    );
  }
}
