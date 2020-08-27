export class Valor{
    constructor(
        public id: number,
        public empresa_id: number,
        public moneda_id: number,
        public name: string,
        public valor: number,
        public valor_guaranies: number,
        public impuesto: number
    ){}
}
