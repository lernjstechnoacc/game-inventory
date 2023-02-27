import IMatrixNode from "../interface/IMatrixNode";

class MatrixNode implements IMatrixNode {
    public name: string;
    public edges: number[];
    
    constructor (name: string, length?: number) {
        this.name = name;
        this.edges = (length) ? this.fillZero(length) : [0];
    }

    private fillZero(length: number){
        let zerosArray: number[] = [];
        for (let i = 0; i < length; i++) {
            zerosArray.push(0);
        }
        return zerosArray;
    }
}
export default MatrixNode