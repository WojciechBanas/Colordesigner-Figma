const ColorsLimit = 30
let selectedColors = 0
const Color = []

function parseNode(node){
    for(const fill of node.fills){
        if(fill.type == "SOLID"){
            const fillHEX = chroma.gl(...Object.values(fill.color)).hex()
            colors.push(fillHEX)
        }
    }
}

export default  function parseSelection(selection){
    for(const node of selection){
        parseNode(node)
    }
}






