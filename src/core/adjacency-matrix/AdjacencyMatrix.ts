import MatrixNode from "./MatrixNode";
import INode from "../interface/INode";

class AdjacencyMatrix {
    public nodes: INode;
    public matrix: MatrixNode[];

    constructor (nodes: {} = {}, matrix:[] = []) {
        this.nodes = nodes;
        this.matrix = matrix;
    }

    public addNode = (node: string, adjacency: string[] = []) => {
        this.matrix = [...this.matrix, new MatrixNode(node, this.matrix.length)];
        const currentPositionNode = this.matrix.length - 1;
        this.nodes[node] = currentPositionNode; 
        this.fillZerosEdgesInNodes(currentPositionNode);
        this.addAdjacencyEdgesToNode(node, adjacency);
    }

    public findNodeNameExactlyAdjacencyToAllEdges = (mainNode: string, restNode: string[]) : string => {
        let findedEdge: string = '';
        let isFinded: boolean = false;
        let mainNodePosition: number = this.nodes[mainNode];

        if (mainNodePosition === undefined) {
            return findedEdge;
        }

        this.matrix[mainNodePosition].edges.forEach((edge, index) => {
            if (findedEdge && isFinded) {
                return findedEdge;
            }

            if (edge  !== 0) {
                isFinded = this.isMatchesAllEdgesInNodeIndex(index, [...restNode, mainNode]);
                isFinded ? findedEdge =  this.matrix[index].name : isFinded = false;
                
                

            }
        })
            
        return findedEdge;
    }

    public isNodeHaveEdges = (nodeName: string): boolean => {
        let isHaveEdges = false;

        this.matrix.forEach(node => {
            if(node.edges[this.nodes[nodeName]]){
                isHaveEdges = true;
            }
        });

        return isHaveEdges;
    }

    public findNodeNamesByAdjacencyEdge = (edge: string) : string[] => {
        let indexCurrentEdge: number = this.nodes[edge];
        let nodes: string[] = [];

        if (indexCurrentEdge === undefined) { 
            return nodes;
        }
       
        this.matrix.forEach(node => {
            if (node.edges[indexCurrentEdge] === 1) {
                nodes.push(node.name);
            }

            if (node.edges[indexCurrentEdge] > 1) {
                for (let i = 0; i < node.edges[indexCurrentEdge]; i++) {
                    nodes.push(node.name); 
                }
            }
        })
        

        return nodes;
    }

    public findAdjacencyEdgeNamesInNode = (node: string) : string[] => {
        let edges: string[] = [];
        const currentPositionNode: number = this.nodes[node];

        this.matrix[currentPositionNode].edges.forEach((currentEdge, index) =>{
            if(currentEdge !== 0){
                edges.push(this.matrix[index].name);
            }
        });

        return edges;
    }

    private addAdjacencyEdgesToNode = (node: string, adjacency: string[]) => {
        const edgePosition = this.nodes[node];

        adjacency.forEach(edge => {
            let nodePositon = this.nodes[edge];
            if (nodePositon !== undefined) {
                this.matrix[nodePositon].edges[edgePosition] += 1;
            }
        });
    }

    private fillZerosEdgesInNodes = (edgeNumber: number): void => {
        for (let i = 0; i < this.matrix.length; i++) {
            this.matrix[i].edges[edgeNumber] = 0;
        }
    }

    private isMatchesAllEdgesInNodeIndex = (nodeIndex: number, allEdges: string[]): boolean => {
        let tempEdges: string[] = [...allEdges];
        let isMatches = true;
        
        this.matrix.forEach(currentNode =>{
            if (!isMatches) {
                return false;
            }

            if (currentNode.edges[nodeIndex] &&  currentNode.edges[nodeIndex] === 1 ) {
                let indexEdgeInAllEdges = tempEdges.indexOf(currentNode.name);
                (indexEdgeInAllEdges !== -1) ? tempEdges[indexEdgeInAllEdges] = 'null' : isMatches = false;

            } 
            
            if (currentNode.edges[nodeIndex] &&  currentNode.edges[nodeIndex] > 1 ) {
                for (let i = 0; i < currentNode.edges[nodeIndex]; i++) {
                    let indexEdgeInAllEdges = tempEdges.indexOf(currentNode.name);
                    if (indexEdgeInAllEdges === -1) {
                        isMatches = false;
                        break;
                    }
                    tempEdges[indexEdgeInAllEdges] = 'null';
                }
            }
            
        }); 
        
        return isMatches;
    }

}

export default AdjacencyMatrix;