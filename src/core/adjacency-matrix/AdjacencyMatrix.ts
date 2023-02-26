import MatrixNode from "./MatrixNode";
import IEdge from "../interface/IEdge";

//TODO modificators (public/protected/private)

class AdjacencyMatrix {
    public edges: IEdge;
    public matrix: MatrixNode[];

    constructor(edges: {} = {}, matrix: [] = []) {
        this.edges = edges;
        this.matrix = matrix;
    }

    //todo compatibility - change name to something understandable
    //todo make a params/options object with interface {param1: boolean, param2: string[], param3: Param3}
    public addEdge = (edge: string, compatibility?: string[]) => {
        this.matrix = [...this.matrix, new MatrixNode(edge, this.matrix.length)];
        this.edges[edge] = this.matrix.length - 1;

        for (let i = 0; i < this.matrix.length; i++) {
            //todo pay attention to imperative code, try to make it more readable
            const currentIndex = this.matrix.length - 1;
            this.matrix[i].array[currentIndex] = 0;
        }

        //todo what's compatibility
        //todo this part could be encapsulated into its own method. checkCompatibility(): boolean;
        //todo if (checkCompatibility()) {
        //   incrementEdgeByPosition(position: number): void;
        // }
        if (compatibility) {
            compatibility.forEach(edge => {
                //todo POSITION
                let edgePos = this.edges[edge];
                if (edgePos !== undefined) {
                    this.matrix[edgePos].array[this.matrix.length - 1] += 1;
                }
            })
        }

    }

    //todo separate into few readable methods
    public findEdgeNameExactlyOccurrenceAllEdges = (mainEdge: string, restEdges: string[]): string => {
        //todo when something is 'finded' then use 'found', like foundEdge, isFound;
        //todo don't forget about explicit types - findEdge: string!
        let findEdge = '';
        let isFind: boolean = false;

        if (this.edges[mainEdge] !== undefined) {
            this.matrix[this.edges[mainEdge]].array.forEach((edge, index) => {
                //todo improve readability by separating/replacing logic into its own functions, rename poor names;

                if (findEdge && isFind) {
                    return findEdge
                }

                //todo make more clear conditions (meaning not 'if edge', but 'if edge === true or if edge !== undefined);
                if (edge) {
                    isFind = this.isMatchesAllEdgesInEdgeIndex(index, [...restEdges, mainEdge]);
                    (isFind) ? findEdge = this.matrix[index].name : isFind = true;

                    //todo case for ternary
                    //const isVovaPidor: boolean = true ? true : false; true && true;

                }
            })
        }
        return findEdge
    }

    public isMatchesAllEdgesInEdgeIndex = (edgeIndex: number, allEdges: string[]): boolean => {
        let tempEdges: string[] = [...allEdges];
        let isMatches = true;

        this.matrix.forEach(currentEdge => {
            if (!isMatches) {
                return false;
            }

            //todo check statements nesting
            if (currentEdge.array[edgeIndex]) {
                if (currentEdge.array[edgeIndex] === 1) {
                    let indexEdgeInAllEdges = tempEdges.indexOf(currentEdge.name);
                    //todo don't use ternary operator to hide nesting level, improve the code
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

    //todo double check terminology and change the method according to revision
    //todo doesEdgeHaveAdjacentEdges
    public isEdgeHaveEdges = (edgeName: string): boolean => {
        let isHaveEdges = false;

        this.matrix.forEach(edge => {
            if (edge.array[this.edges[edgeName]]) {
                isHaveEdges = true;
            }
        });

        return isHaveEdges;
    }

    //todo consistency in argument naming pleassssse
    public findAllOccurrencesInEdge = (edge: string): string[] => {
        let currentEdgeIndex: number = this.edges[edge];
        let occurrences: string[] = [];


        if (currentEdgeIndex !== undefined) {
            this.matrix.forEach(edge => {
                if (edge.array[currentEdgeIndex] === 1) {
                    //todo addEdgeNameToOccurrences(edge.name);
                    occurrences.push(edge.name);
                }

                //todo someStatement() then doAction()
                if (edge.array[currentEdgeIndex] > 1) {
                    for (let i = 0; i < edge.array[currentEdgeIndex]; i++) {
                        occurrences.push(edge.name);
                    }
                }
            })
        }

        return occurrences;
    }

    public findAllOccurrencesEdgesInEdge = (edge: string): string[] => {
        //todo edgeNames: string[]
        let edgesNames: string[] = [];


        //todo try to read it this.matrix[this.edges[edge]].array
        this.matrix[this.edges[edge]].array.forEach((currentEdge, index) => {
            if (currentEdge) {
                //todo addNewEdge()
                edgesNames.push(this.matrix[index].name);
            }
        });

        return edgesNames;
    }

}

//todo console logs and commented could are to be removed

/*     isConvergeAllEdges = (mainEdgeIndex: number, allEdges: string) => {

    }

    findAdjacentEdges = (edges: string[]) => {

    } */

export default AdjacencyMatrix;