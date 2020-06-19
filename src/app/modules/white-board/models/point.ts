export class Point {

    posX: number;
    posY: number;

    constructor(x: number, y: number) {
        this.posX = x;
        this.posY = y;
    }
    public static clone(point: Point): Point {
        return new Point(point.posX, point.posY);
    }
}
