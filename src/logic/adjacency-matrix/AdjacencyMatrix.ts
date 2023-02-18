import MatrixNode from "./MatrixNode";
import IEdge from "../interface/IEdge";

class AdjacencyMatrix {
    public edges: IEdge;
    public matrix: MatrixNode[];

    constructor (edges: {} = {}, matrix:[] = []) {
        this.edges = edges;
        this.matrix = matrix;
    }

    addEdge = (edge: string, compatibility?: string[]) => {
        this.matrix = [...this.matrix, new MatrixNode(edge, this.matrix.length)];
        this.edges[edge] = this.matrix.length - 1; 

        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].array[this.matrix.length - 1] = 0;
        }

        if (compatibility) {
            compatibility.forEach(edge => {
                let edgePos = this.edges[edge];
                if (edgePos !== undefined) {
                    this.matrix[edgePos].array[this.matrix.length-1] += 1;
                }
            })
        }
        
    }

    findEdgeNameExactlyOccurrenceAllEdges = (mainEdge: string, restEdges: string[]) : string => {
        let findEdge = '';
        let isFind: boolean = false;

        if (this.edges[mainEdge] !== undefined) {
            this.matrix[this.edges[mainEdge]].array.forEach((edge, index) => {
                if (findEdge && isFind) {
                    return findEdge
                }

                if (edge) {
                    isFind = this.isMatchesAllEdgesInEdgeIndex(index, [...restEdges, mainEdge]);
                    (isFind) ? findEdge =  this.matrix[index].name : isFind = true;

                }
            })
        }
        return findEdge
    }

    isMatchesAllEdgesInEdgeIndex = (edgeIndex: number, allEdges: string[]): boolean => {
        let tempEdges: string[] = [...allEdges];
        let isMatches = true;
        this.matrix.forEach(currentEdge =>{
            if (!isMatches) {
                return false;
            }

            if (currentEdge.array[edgeIndex]) {
                if (currentEdge.array[edgeIndex] === 1) {
                     let indexEdgeInAllEdges = tempEdges.indexOf(currentEdge.name);
                    (indexEdgeInAllEdges !== -1) ? tempEdges[indexEdgeInAllEdges] = 'null' : isMatches = false;

                } else {
                    for (let i = 0; i < currentEdge.array[edgeIndex]; i++) {
                        let indexEdgeInAllEdges = tempEdges.indexOf(currentEdge.name);
                        if (indexEdgeInAllEdges === -1) {
                            isMatches = false;
                            break;
                        }
                        tempEdges[indexEdgeInAllEdges] = 'null';
                    }
                }
            
            }
            
        }) 
        
        return isMatches;
    }

    isEdgeHaveEdges = (edgeName: string): boolean => {
        let isHaveEdges = false;

        this.matrix.forEach(edge => {
            if(edge.array[this.edges[edgeName]]){
                isHaveEdges = true;
            }
        });

        return isHaveEdges;
    }

    findAllOccurrencesInEdge  = (edge: string) : string[] => {
        let indexCurrentEdge: number = this.edges[edge];
        let arrayOccurrences: string[] = [];

        if (indexCurrentEdge !== undefined) {
            this.matrix.forEach(edge => {
                if (edge.array[indexCurrentEdge] === 1) {
                    arrayOccurrences.push(edge.name);
                }

                if (edge.array[indexCurrentEdge] > 1) {
                    for (let i = 0; i < edge.array[indexCurrentEdge]; i++) {
                        arrayOccurrences.push(edge.name); 
                    }
                }
            })
        }

        return arrayOccurrences;
    }

}

/*     isConvergeAllEdges = (mainEdgeIndex: number, allEdges: string) => {

    }

    findAdjacentEdges = (edges: string[]) => {

    } */

export default AdjacencyMatrix;