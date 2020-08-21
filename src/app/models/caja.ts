export class Caja{
    constructor(
        public id: number,
        public movimiento_id: number,
        public monto_apertura: string,
        public monto_cierre: string,
        public estado: string
    ){}
}
