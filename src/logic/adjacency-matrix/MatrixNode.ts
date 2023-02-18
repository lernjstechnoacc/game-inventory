import IMatrixNode from "../interface/IMatrixNode";

class MatrixNode implements IMatrixNode {
    public name: string;
    public array: number[];
    
    constructor (name: string, length?: number) {
        this.name = name;
        this.array = (length) ? this.fillZero(length) : [];
    }

    private fillZero(length: number){
        let zerosAray: number[] = [];
        for (let i = 0; i < length; i++) {
            zerosAray.push(0);
        }
        return zerosAray;
    }
}
export default MatrixNode