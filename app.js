class Game{
    constructor(boardWidth, boardHeight){
        this.boardWidth = boardWidth
        this.boardHeight = boardHeight
    }

    initialize(){
        //Board setup
        const gameCont = document.querySelector('.gameCont')
        gameCont.style.width = this.boardWidth + 'px'
        gameCont.style.height = this.boardHeight + 'px'
        
        //Blocks render
        new Block({
            x:100,
            y:100,
            width:500,
            height:500,
            bg: "./backs/park.png",
            label: "Park"
        }).renderBlock()
        new Block({
            x:100,
            y:720,
            width:500,
            height:80,
            bg: "./backs/deepHole.png",
            label: "deepHole"
        }).renderBlock()
        new Block({
            x:680,
            y:640,
            width:300,
            height:160,
            bg: "./backs/deepHole.png",
            label: "deepHole"
        }).renderBlock()
        new Block({
            x:1040,
            y:640,
            width:160,
            height:160,
            bg: "./backs/deepHole.png",
            label: "deepHole"
        }).renderBlock()

        new Block({
            x:680,
            y:420,
            width:300,
            height:160,
            bg: "./backs/deepHole.png",
            label: "deepHole"
        }).renderBlock()
        new Block({
            x:1040,
            y:420,
            width:160,
            height:160,
            bg: "./backs/deepHole.png",
            label: "deepHole"
        }).renderBlock()

        //Player setup
        const player = new Player(500,680)
        player.renderPlayer()

        //Move Player setup
        document.onkeydown = (e) => {
            player.movePlayer(e.key)
        }
    }
}
class Player{
    constructor(x,y){
        this.playerAxis = [x,y]
    }
    renderPlayer(){
        const gameCont = document.querySelector('.gameCont')
        const player = document.createElement('div')
        player.className = 'player'
        player.style.left = this.playerAxis[0] + 'px'
        player.style.bottom = this.playerAxis[1] + 'px'
        gameCont.appendChild(player)

    }
    movePlayer(key){
        const moveKeys = ['w','a','s','d','W','A','S','D','ArrowUp','ArrowLeft','ArrowDown','ArrowRight']
        for(let i = 0; i < moveKeys.length; i++){
            if(key === moveKeys[i]){
                const direction = this.getControlDirection(key)
                if(direction === 'up' || direction === 'down'){
                    this.yMove(direction)
                }else{
                    this.xMove(direction)
                }
            }else{

            }
        }
    }
    getControlDirection(direction){
        const upKeys = ['w','W','ArrowUp']
        const downKeys = ['s','S','ArrowDown']
        const leftKeys = ['a','A','ArrowLeft']
        if(upKeys.includes(direction)){
            return 'up'
        }else if(downKeys.includes(direction)){
            return 'down'
        }else if(leftKeys.includes(direction)){
            return 'left'
        }else{
            return 'right'
        }
    }
    xMove(direction){
        const player  = document.querySelector('.player')
        const actualXPosition = parseInt(player.style.left.replace('px',''))
        const actualYPosition = parseInt(player.style.bottom.replace('px',''))
        const moveSize = (direction === 'left') ? -20 : 20
        const movePosition = actualXPosition + moveSize
        const boardWidth = parseInt(document.querySelector('.gameCont').style.width.replace('px',''))
        if(movePosition <= (boardWidth-20) && movePosition >= 0){
            const canMove = this.coliderSystem([movePosition,actualYPosition])
            if(canMove){
                player.style.left = movePosition + 'px'
            }else{

            }
        }else{

        }
    }
    yMove(direction){
        const player  = document.querySelector('.player')
        const actualYPosition = parseInt(player.style.bottom.replace('px',''))
        const actualXPosition = parseInt(player.style.left.replace('px',''))
        const moveSize = (direction === 'down') ? -20 : 20
        const movePosition = actualYPosition + moveSize
        const boardHeight = parseInt(document.querySelector('.gameCont').style.height.replace('px',''))
        if(movePosition <= (boardHeight-20) && movePosition >= 0){
            const canMove = this.coliderSystem([actualXPosition,movePosition])
            if(canMove){
                player.style.bottom = movePosition + 'px'
            }else{

            }
        }else{

        }
    }
    coliderSystem(playerNextPosition){
        const blocks = this.getAllBlocks()
        for(let i = 0; i < blocks.length; i++){
            if(playerNextPosition[0] >= blocks[i].xRange[0] && playerNextPosition[0] < blocks[i].xRange[1]){
                if(playerNextPosition[1] >= blocks[i].yRange[0] && playerNextPosition[1] < blocks[i].yRange[1]){
                    return false
                    break
                }
            }else{

            }
        }
        return true
    }
    getAllBlocks(){
        const blocks = document.querySelectorAll('.block')
        let blocksInfo = []
        for(let i = 0; i < blocks.length; i++){
            let x = parseInt(blocks[i].style.left.replace('px',''))
            let y = parseInt(blocks[i].style.bottom.replace('px',''))
            let width = parseInt(blocks[i].style.width.replace('px'))
            let height = parseInt(blocks[i].style.height.replace('px'))
            let xRange = [x,(x+width)]
            let yRange = [y,(y+height)]
            blocksInfo.push({xRange,yRange})
        }
        return blocksInfo
    }
}
class Block{
    constructor({x,y,width,height,bg,borderColor,borderWidth,label}){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.bg = bg
        this.borderColor = borderColor || 'none'
        this.borderWidth = borderWidth || 'none'
        this.label = label
    }
    renderBlock(){
        const board = document.querySelector('.gameCont')
        const block = document.createElement('div')
        block.className = 'block'
        block.style.left = this.x + 'px'
        block.style.bottom = this.y + 'px'
        block.style.width = this.width + 'px'
        block.style.height = this.height + 'px'
        block.style.background = `url(${this.bg})`
        block.style.backgroundPosition = `center center`
        block.style.backgroundSize = `cover`
        block.style.border = `${this.borderWidth}px solid ${this.borderColor}`
        block.setAttribute('label',this.label)
        board.appendChild(block)
    }

}
const game = new Game(1200,800)

game.initialize()