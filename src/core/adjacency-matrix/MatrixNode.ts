import IMatrixNode from "../interface/IMatrixNode";

class MatrixNode implements IMatrixNode {
    public name: string;
    public array: number[];
    
    constructor (name: string, length?: number) {
        this.name = name;
        this.array = (length) ? this.fillZero(length) : [];
    }

    //todo rename fields and methods
    //todo like initNodeArrayWithZeroValues()

    private fillZero(length: number){
        let zerosArray: number[] = [];
        for (let i = 0; i < length; i++) {
            zerosArray.push(0);
        }
        return zerosArray;
    }
}
export default MatrixNode