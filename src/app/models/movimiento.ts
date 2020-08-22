export class Movimiento{
    constructor(
        public id: number,
        public caja_id: number,
        public tipo: string,
        public valor: number,
        public description: string,
        public recarga_id: number
    ){}
}
