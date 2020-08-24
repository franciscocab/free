export class Caja{
    constructor(
        public id: number,
        public movimiento_id: number,
        public monto_apertura: number,
        public monto_cierre: number,
        public estado: string
    ){}
}
