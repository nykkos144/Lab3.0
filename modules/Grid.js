



class Drag {
    constructor(canvas, onDrag, updateGridComponents, selectGridComponents, clearSelected, gridVars) {
        this.dragging = false;

        this.lastPos = {
            x: 0,
            y: 0
        }

        this.canvas = canvas;
        this.onDragCallback = onDrag;
        this.updateCallback = updateGridComponents;
        this.selectCallback = selectGridComponents;
        this.clearSelected = clearSelected;

        this.interaction = gridVars.interaction;
        this.nodeSize = gridVars.nodeSize;
        this.dist = gridVars.dist;
        this.zeroPos = gridVars.zeroPos;

        this.bind();
    }

    sendCordsUpdate(clientX, clientY) {
        let xInd = Math.floor((clientX + this.nodeSize - this.dist.x) / this.nodeSize);
        let yInd = Math.floor((clientY + this.nodeSize - this.dist.y) / this.nodeSize);

        this.updateCallback(this.zeroPos.x + xInd,this.zeroPos.y + yInd);
    }
    sendCordsSelect(clientX, clientY) {

        // let xInd = Math.floor((clientX + this.nodeSize - this.dist.x) / this.nodeSize);
        // let yInd = Math.floor((clientY + this.nodeSize - this.dist.y) / this.nodeSize);

        let sX = Math.min(this.lastPos.x, clientX);
        let sY = Math.min(this.lastPos.y, clientY);

        let eX = Math.max(this.lastPos.x, clientX);
        let eY = Math.max(this.lastPos.y, clientY);

        let start = {
            x: this.zeroPos.x + Math.floor((sX + this.nodeSize - this.dist.x) / this.nodeSize),
            y: this.zeroPos.y + Math.floor((sY + this.nodeSize - this.dist.y) / this.nodeSize)
        }

        let end = {
            x: this.zeroPos.x + Math.floor((eX + this.nodeSize - this.dist.x) / this.nodeSize),
            y: this.zeroPos.y + Math.floor((eY + this.nodeSize - this.dist.y) / this.nodeSize)
        }

        this.selectCallback(start, end, this.selType ? this.selType : null);
    }

    onMouseDown(e) {
        this.dragging = true;

        this.selType = null;

        if (this.interaction == 'pointer') {

            if (!e.shiftKey && !e.ctrlKey) {
                this.clearSelected();
            }
            else {
                if (e.shiftKey) {
                    this.selType = 'add';
                }
                else if (e.ctrlKey) {
                    this.selType = 'remove';
                }
            }


            this.selectIndicator = document.createElement('div');
            this.selectIndicator.classList.add('select-indicator');
            this.selectIndicator.style.top = e.clientY + 'px';
            this.selectIndicator.style.left = e.clientX + 'px';
            document.body.appendChild(this.selectIndicator);
            // return;
        }

        if (['add', 'remove'].includes(this.interaction)) {
            return;
        }

        this.lastPos = {
            x: e.clientX,
            y: e.clientY
        }
    }

    onMouseMove(e) {
        if (this.dragging) {

            if (this.interaction == 'pointer') {
                if (this.selectIndicator) {
                    this.selectIndicator.style.visibility = 'visible';
                }

                if (e.clientX < this.lastPos.x) {
                    // this.selectIndicator.style.top = e.clientY + 'px';
                    this.selectIndicator.style.left = e.clientX + 'px';        
                }
                else {
                    this.selectIndicator.style.left = this.lastPos.x + 'px'; 
                }
                
                if (e.clientY < this.lastPos.y) {
                    // this.selectIndicator.style.top = e.clientY + 'px';
                    this.selectIndicator.style.top = e.clientY + 'px';        
                }
                else {
                    this.selectIndicator.style.top = this.lastPos.y + 'px'; 
                }

                this.selectIndicator.style.width = Math.abs(this.lastPos.x - e.clientX) + 'px';
                this.selectIndicator.style.height = Math.abs(this.lastPos.y - e.clientY) + 'px';
                return;
            }

            if (['add', 'remove'].includes(this.interaction)) {
                this.sendCordsUpdate(e.clientX, e.clientY);
                return;
            }

            let xDelta = (e.clientX - this.lastPos.x);
            let yDelta = (e.clientY - this.lastPos.y);

            this.lastPos = {
                x: e.clientX,
                y: e.clientY
            }

            this.onDragCallback(xDelta, yDelta);
        }
    }

    onMouseUp(e) {
        this.dragging = false;

        if (this.interaction == 'pointer') {
            // document.querySelectorAll('.select-indicator');
            document.querySelectorAll('.select-indicator').forEach(selInd => {
                selInd.remove();
            });

            this.sendCordsSelect(e.clientX, e.clientY);
            return;
        }

        if (['add', 'remove'].includes(this.interaction)) {
            this.sendCordsUpdate(e.clientX, e.clientY);
            return;
        }
    }


    bind() {
        // TODO - add phone compatibility -- aka. touchstart; touchmove; touchend

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    }

}

// class addClick {
//     constructor(canvas, addClick, gridVars) {

//         this.canvas = canvas;
//         this.onClickCallback = addClick;

//         this.nodeSize = gridVars.nodeSize;
//         this.dist = gridVars.dist;
//         this.zeroPos = gridVars.zeroPos;

//         this.bind();
//     }

//     onClick(e) {
//         // console.log(e.clientX, e.clientY);

//         let xInd = Math.floor((e.clientX + this.nodeSize - this.dist.x) / this.nodeSize);
//         let yInd = Math.floor((e.clientY + this.nodeSize - this.dist.y) / this.nodeSize);

//         // console.log(xInd, yInd);
//         this.onClickCallback(this.zeroPos.x + xInd,this.zeroPos.y + yInd);
//     }

//     bind() {
//         this.canvas.addEventListener('click', this.onClick.bind(this));
//     }
// }
// class removeClick {

// }

class Click {
    constructor(canvas, updateGridComponents, gridVars) {

        this.canvas = canvas;
        this.updateCallback = updateGridComponents;

        this.interaction = gridVars.interaction;
        this.nodeSize = gridVars.nodeSize;
        this.dist = gridVars.dist;
        this.zeroPos = gridVars.zeroPos;

        this.bind();
    }

    onClick(e) {
        if (['add', 'remove', 'pointer', 'hand'].includes(this.interaction)) {
            // console.log('---')
            return;
        }

        let xInd = Math.floor((e.clientX + this.nodeSize - this.dist.x) / this.nodeSize);
        let yInd = Math.floor((e.clientY + this.nodeSize - this.dist.y) / this.nodeSize);

        this.updateCallback(this.zeroPos.x + xInd,this.zeroPos.y + yInd);
    }

    onRightClick(e) {
        // e.preventDefault();

        console.log('r click');
    }

    bind() {
        this.canvas.addEventListener('click', this.onClick.bind(this));
        this.canvas.addEventListener('contextmenu', this.onRightClick.bind(this));
    }

}

// class DragClick {
//     constructor(canvas, updateGridComponents, gridVars) {

//         this.canvas = canvas;
//         this.updateCallback = updateGridComponents;

//         this.dragging = false;

//         this.nodeSize = gridVars.nodeSize;
//         this.dist = gridVars.dist;
//         this.zeroPos = gridVars.zeroPos;

//         this.bind();
//     }

//     sendCordsUpdate(clientX, clientY) {
//         let xInd = Math.floor((clientX + this.nodeSize - this.dist.x) / this.nodeSize);
//         let yInd = Math.floor((clientY + this.nodeSize - this.dist.y) / this.nodeSize);

//         this.updateCallback(this.zeroPos.x + xInd,this.zeroPos.y + yInd);
//     }

//     onMouseDown(e) {
//         this.dragging = true;
//     }

//     onMouseMove(e) {
//         if (this.dragging) {
//             this.sendCordsUpdate(e.clientX, e.clientY);
//         }
//     }

//     onMouseUp(e) {
//         this.dragging = false;
//         this.sendCordsUpdate(e.clientX, e.clientY);
//     }


//     bind() {
//         // TODO - add phone compatibility -- aka. touchstart; touchmove; touchend

//         this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
//         this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
//         this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
//     }
    
// }


class Zoom {
    constructor(canvas, zoom) {

        this.canvas = canvas;
        this.zoomCallback = zoom;

        this.bind();
    }

    onWheel(e) {
        e.preventDefault();

        // console.log(e.wheelDelta);

        if (e.ctrlKey == true) {
            this.zoomCallback(e.wheelDelta > 0 ? 2 : -2);
            return;
        }

        this.zoomCallback(e.wheelDelta > 0 ? 1 : -1);

        
        // if ()
    }

    // onKeyDown(e) {
    //     // e.preventDefault();

    //     if (e.ctrlKey == true && e.key == '+') {
    //         this.zoomCallback(1);
    //         e.preventDefault()
    //     }
    //     if (e.ctrlKey == true && e.key == '-') {
    //         this.zoomCallback(-1);
    //         e.preventDefault()
    //     }
    // }

    bind() {
        this.canvas.addEventListener('wheel', this.onWheel.bind(this));
        // document.addEventListener('keydown', this.onKeyDown.bind(this));
    }
    // unbind() {
    //     this.canvas.removeEventListener('wheel', this.onWheel.bind(this));
    //     this.canvas.removeEventListener('keydown', this.onKeyDown.bind(this));
    // }
}

class ButtonClick {
    constructor(canvas, selectInteractions, zoom, gridVars) {

        this.canvas = canvas;

        this.zoomCallback = zoom;

        this.selectCallback = selectInteractions;
        this.selectedBool = gridVars.selectedBool;

        this.bind();
    }


    onKeyDown(e) {
        // e.preventDefault();

        if (e.ctrlKey == true && (e.which == 187 || e.key == '+')) {
            e.preventDefault();
            this.zoomCallback(1);
        }
        if (e.ctrlKey == true && (e.which == 189 || e.key == '-')) {
            e.preventDefault();
            this.zoomCallback(-1)
        }

        if (this.selectedBool) {
            if (e.key == "+" || e.which == 187 || e.which == 45) { // 45 - insert
                e.preventDefault();
                this.selectCallback('insert');
            }
            else if (e.key == "-" || e.which == 189 || e.which == 46) { // 46 - delete
                e.preventDefault();
                this.selectCallback('delete');
            }
            else if (e.which == 27) {
                e.preventDefault();
                this.selectCallback('escape');
            }   
        }
        
    }

    bind() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }
    // unbind() {
    //     this.canvas.removeEventListener('wheel', this.onWheel.bind(this));
    //     this.canvas.removeEventListener('keydown', this.onKeyDown.bind(this));
    // }

}


class Node {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

export default class Grid {
    constructor(canvas) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.nodeSize = 30;

        this.rowLen = Math.ceil(window.innerHeight / this.nodeSize);
        this.colLen = Math.ceil(window.innerWidth / this.nodeSize);

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    
        this.dist = {
            x: 0,
            y: 0
        };

        this.zeroPos = {
            x: 0,
            y: 0
        };

        this.components = {
            start: {
                x: Math.round(this.colLen / 2) - 10,
                y: Math.round(this.rowLen / 2)
            },
            end: {
                x: Math.round(this.colLen / 2) + 10,
                y: Math.round(this.rowLen / 2)
            },
            walls: []
        };

        this.selected = [];

        this.dragging = false;

        this.interaction = 'hand';

        this.startImg = document.getElementById('start-img');
        this.endImg = document.getElementById('end-img');

        this.canvasCover = document.getElementById('grid-canvas-cover');
        this.coverCtx = this.canvasCover.getContext('2d');
    }

    init() {

        this.drag = new Drag(this.canvas, this.onDrag.bind(this), this.updateGridComponents.bind(this), this.selectComponents.bind(this), this.clearSelected.bind(this), {
            interaction: this.interaction,
            nodeSize: this.nodeSize,
            dist: this.dist,
            zeroPos: this.zeroPos
        });

        this.click = new Click(this.canvas, this.updateGridComponents.bind(this), {
            interaction: this.interaction,
            nodeSize: this.nodeSize,
            dist: this.dist,
            zeroPos: this.zeroPos
        });

        this.zoom = new Zoom(this.canvas, this.changeZoom.bind(this));

        this.buttonClick = new ButtonClick(this.canvas, this.selectInteractions.bind(this), this.changeZoom.bind(this), {
            selectedBool: this.selected ? true : false,
        });

        this.canvas.width = this.width;
        this.canvas.height = this.height;


        this.drawGrid();

    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    changeInteraction(inter) {
        this.interaction = inter;
        this.drag.interaction = inter;

        this.updateListeners();
    }


    gridControl(gc) {
        if (gc == 'delete') {
            this.components.walls = [];
            this.drawGrid();
        }
        else if (gc == 'refresh') {
            this.nodeSize = 30;
            this.components = {
                start: {
                    x: Math.round(Math.ceil(window.innerWidth / this.nodeSize) / 2) - 10,
                    y: Math.round(Math.ceil(window.innerHeight / this.nodeSize) / 2)
                },
                end: {
                    x: Math.round(Math.ceil(window.innerWidth / this.nodeSize) / 2) + 10,
                    y: Math.round(Math.ceil(window.innerHeight / this.nodeSize) / 2)
                },
                walls: []
            };
            this.dist = {
                x: 0,
                y: 0
            };
    
            this.zeroPos = {
                x: 0,
                y: 0
            };
            this.selected = [];
    
            // this.components.walls = [];
            this.drawGrid();
        }
        else if (gc == 'run') {

            this.run();
            // let bounds = {
            //     minX: Number.MAX_SAFE_INTEGER,
            //     minY: Number.MAX_SAFE_INTEGER,
            //     maxX: 0,
            //     maxY: 0
            // }
        }
    }


    onDrag(x, y) {

        // this.coverCtx.clearRect(0, 0, this.width, this.height);
        
        if (this.interaction != 'hand') {
            return;
        }

        this.dist.x += x;
        this.dist.y += y;

        // console.log(this.dist.x, this.dist.y);

        if (this.dist.x < 0) {
            this.dist.x = this.nodeSize;
            this.zeroPos.x++;
            // this.startZeroPos.x--;
        }
        else if (this.dist.x > this.nodeSize) {
            this.dist.x = 0;
            this.zeroPos.x--;
            // this.startZeroPos.x++;
        }

        if (this.dist.y < 0) {
            this.dist.y = this.nodeSize;
            this.zeroPos.y++;
            // this.startZeroPos.y--;
        }
        else if (this.dist.y > this.nodeSize) {
            this.dist.y = 0;
            this.zeroPos.y--;
            // this.startZeroPos.y++;
        }
        
        this.updateListeners();

        this.drawGrid();

    }

    updateGridComponents(x, y) {

        this.clearSelected()
        // console.log(x, y)

        if (!['add', 'remove', 'start', 'end'].includes(this.interaction)) {
            return;
        }

        if ((this.components.start.x == x && this.components.start.y == y) || (this.components.end.x == x && this.components.end.y == y)) {
            return;
        }

        if (this.interaction == 'add') {
            if (!this.components.walls.some(e => e.x === x && e.y === y)) {
                this.components.walls.push({x, y});
                this.drawComponentsGrid(x, y, 'wall');
                // this.updateGridMatrix(x, y);
            }    
        }
        else if (this.interaction == 'remove') {
            if (this.components.walls.some(e => e.x === x && e.y === y)) {
                this.components.walls = this.components.walls.filter(e => !(e.x === x && e.y === y));
                this.undrawComponentsGrid(x, y);
                // this.updateGridMatrix(x, y);
            }
        }
        else if (this.interaction == 'start') {
            if (this.components.walls.some(e => e.x === x && e.y === y)) {
                this.components.walls = this.components.walls.filter(e => !(e.x === x && e.y === y));
            }
            this.components.start = {
                x: x,
                y: y
            };

            this.drawGrid();
            // this.updateGridMatrix(x, y);
        }
        else if (this.interaction == 'end') {
            if (this.components.walls.some(e => e.x === x && e.y === y)) {
                this.components.walls = this.components.walls.filter(e => !(e.x === x && e.y === y));
            }
            this.components.end = {
                x: x,
                y: y
            };

            this.drawGrid();
            // this.updateGridMatrix(x, y);
        }

    }

    clearSelected() {
        // this.coverCtx.clearRect(0, 0, this.width, this.height);
        this.selected = [];
        this.buttonClick.selectedBool = false;
        this.drawGrid();
    }

    selectComponents(start, end, type) {

        // this.selected = [];

        console.log(start, end, type)


        for (let i = start.x; i < end.x + 1; i++) {
            for (let j = start.y; j < end.y + 1; j++) {
                if (type == "remove") {
                    if (this.selected && this.selected.some(e => e.x === i && e.y === j)) {
                        this.selected = this.selected.filter(e => !(e.x === i && e.y === j));
                    }
                }
                else {
                    if (this.selected && this.selected.some(e => e.x === i && e.y === j)) {
                        continue;
                    }
                    this.selected.push({
                        x: i,
                        y: j
                    });
                }
            }
        }

        this.buttonClick.selectedBool = true;

        this.drawGrid();
        
        // let cordsX = (start.x - this.zeroPos.x) * this.nodeSize - (this.nodeSize - this.dist.x);
        // let cordsY = (start.y - this.zeroPos.y) * this.nodeSize - (this.nodeSize - this.dist.y);
        
        // if (type == 'add') {
        //     this.coverCtx.clearRect(cordsX, cordsY, (this.nodeSize * (Math.abs(end.x - start.x) + 1)) + 1, (this.nodeSize * (Math.abs(end.y - start.y) + 1)) + 1)
        // }
        // else {
        //     this.coverCtx.clearRect(0, 0, this.width, this.height);
        // }

        // this.coverCtx.fillStyle = "#1DA1F240";

        // this.coverCtx.beginPath();
        // this.coverCtx.fillRect(cordsX, cordsY, (this.nodeSize * (Math.abs(end.x - start.x) + 1)) + 1, (this.nodeSize * (Math.abs(end.y - start.y) + 1)) + 1);
        
    }

    selectInteractions(type) {

        if (type == 'escape') {
            this.clearSelected();
            return;
        }

        for (let i = 0; i < this.selected.length; i++) {
            if ((this.components.start.x == this.selected[i].x && this.components.start.y == this.selected[i].y) || (this.components.end.x == this.selected[i].x && this.components.end.y == this.selected[i].y)) {
                continue;
            }
            if (type == "delete") {
                if (this.components.walls && this.components.walls.some(e => e.x === this.selected[i].x && e.y === this.selected[i].y)) {
                    this.components.walls = this.components.walls.filter(e => !(e.x === this.selected[i].x && e.y === this.selected[i].y));
                }
            }
            else {
                if (this.components.walls && this.components.walls.some(e => e.x === this.selected[i].x && e.y === this.selected[i].y)) {
                    continue;
                }
                this.components.walls.push(this.selected[i]);
            }
        }

        // for (let i = this.selected[0].x; i < this.selected[this.selected.length - 1].x + 1; i++) {
        //     for (let j = this.selected[0].y; j < this.selected[this.selected.length - 1].y + 1; j++) {
                
        //         if ((this.components.start.x == i && this.components.start.y == j) || (this.components.end.x == i && this.components.end.y == j)) {
        //             continue;
        //         }
        //         if (type == "delete") {
        //             if (this.components.walls && this.components.walls.some(e => e.x === i && e.y === j)) {
        //                 this.components.walls = this.components.walls.filter(e => !(e.x === i && e.y === j));
        //             }
        //         }
        //         else {
        //             if (this.components.walls && this.components.walls.some(e => e.x === i && e.y === j)) {
        //                 continue;
        //             }
        //             this.components.walls.push({
        //                 x: i,
        //                 y: j
        //             });
        //         }
        //     }
        // }

        this.drawGrid();
    }
    

    changeZoom(val) {
        
        if (this.nodeSize + val < 15 || this.nodeSize + val > 60) {
            return;
        }
        
        // this.coverCtx.clearRect(0, 0, this.width, this.height);

        this.nodeSize += val;
        this.rowLen = Math.ceil(window.innerHeight / this.nodeSize);
        this.colLen = Math.ceil(window.innerWidth / this.nodeSize);

        // console.log(this.nodeSize);
        this.updateListeners();

        this.drawGrid();
    }

    updateListeners() {
        this.click.interaction = this.interaction;
        this.click.nodeSize = this.nodeSize;
        this.click.dist = this.dist;
        this.click.zeroPos = this.zeroPos;

        this.drag.interaction = this.interaction;
        this.drag.nodeSize = this.nodeSize;
        this.drag.dist = this.dist;
        this.drag.zeroPos = this.zeroPos;
    }


    drawGrid() {

        let left = this.dist.x + 0.5;
        let top = this.dist.y + 0.5;
        let right = this.canvas.width;
        let bottom = this.canvas.height;

        this.ctx.clearRect(0, 0, right, bottom);
        this.ctx.beginPath();

        for (let x = left; x < right; x += this.nodeSize) {
            this.ctx.moveTo(x, .5);
            this.ctx.lineTo(x, bottom);
        }

        for (let y = top; y < bottom; y += this.nodeSize) {
            this.ctx.moveTo(.5, y);
            this.ctx.lineTo(right, y);
        }
        
        this.ctx.lineWidth = 1.5;
        this.ctx.strokeStyle = "#252525";

        this.ctx.stroke();

        this.ctx.fillStyle = "#fff";
        for (let i = 0; i < this.components.walls.length; i++) {

            if (this.components.walls[i].x < this.zeroPos.x || this.components.walls[i].x > this.zeroPos.x + this.colLen) {
                continue;
            }
            if (this.components.walls[i].y < this.zeroPos.y || this.components.walls[i].y > this.zeroPos.y + this.rowLen) {
                continue;
            }

            let cordsX = (this.components.walls[i].x - this.zeroPos.x) * this.nodeSize - (this.nodeSize - this.dist.x);
            let cordsY = (this.components.walls[i].y - this.zeroPos.y) * this.nodeSize - (this.nodeSize - this.dist.y);

            this.ctx.fillRect(cordsX + 1, cordsY + 1, this.nodeSize - 1, this.nodeSize - 1);
        }


        // selected ///////////////////////////////////////////

        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#234459";
        this.ctx.fillStyle = "#1DA1F240";

        for (let i = 0; i < this.selected.length; i++) {
            let cordsX = (this.selected[i].x - this.zeroPos.x) * this.nodeSize - (this.nodeSize - this.dist.x);
            let cordsY = (this.selected[i].y - this.zeroPos.y) * this.nodeSize - (this.nodeSize - this.dist.y);

            this.ctx.fillRect(cordsX + 1, cordsY + 1, this.nodeSize - 1, this.nodeSize - 1);
            this.ctx.strokeRect(cordsX + .5, cordsY + .5, this.nodeSize, this.nodeSize);
        }

        // statr and end ///////////////////////////////////////////

        let startX = (this.components.start.x - this.zeroPos.x) * this.nodeSize - (this.nodeSize - this.dist.x);
        let startY = (this.components.start.y - this.zeroPos.y) * this.nodeSize - (this.nodeSize - this.dist.y);
        
        let ssizer = this.scalePreserveAspectRatio(this.startImg.width, this.startImg.height, this.nodeSize - this.nodeSize / 2.5, this.nodeSize - this.nodeSize / 2.5);

        this.ctx.lineWidth = this.nodeSize / 15 - .5;
        this.ctx.strokeStyle = "#00FF00";
        this.ctx.strokeRect(startX + 2, startY + 2, this.nodeSize - 3, this.nodeSize - 3);

        let startDeltaX = startX + (this.nodeSize - this.startImg.height * ssizer) / 2;
        let startDeltaY = startY + (this.nodeSize - this.startImg.width * ssizer) / 2;
        this.ctx.drawImage(this.startImg, startDeltaX, startDeltaY, this.startImg.width * ssizer, this.startImg.height * ssizer);
        
        let endX = (this.components.end.x - this.zeroPos.x) * this.nodeSize - (this.nodeSize - this.dist.x);
        let endY = (this.components.end.y - this.zeroPos.y) * this.nodeSize - (this.nodeSize - this.dist.y); 

        let esizer = this.scalePreserveAspectRatio(this.endImg.width, this.endImg.height, this.nodeSize - this.nodeSize / 2.5, this.nodeSize - this.nodeSize / 2.5);
        
        this.ctx.strokeStyle = "#FF0000";

        this.ctx.strokeRect(endX + 2, endY + 2, this.nodeSize - 3, this.nodeSize - 3);

        let endDeltaX = endX + (this.nodeSize - this.endImg.height * esizer) / 2;
        let endDeltaY = endY + (this.nodeSize - this.endImg.width * esizer) / 2;
        this.ctx.drawImage(this.endImg, endDeltaX, endDeltaY, this.endImg.width * esizer, this.endImg.height * esizer);

        // this.ctx.closePath();

    }
    scalePreserveAspectRatio(imgW, imgH, maxW, maxH){
        return(Math.min((maxW / imgW), (maxH / imgH)));
    }

    drawComponentsGrid(x, y, type) {
        let cordsX = (x - this.zeroPos.x) * this.nodeSize - (this.nodeSize - this.dist.x);
        let cordsY = (y - this.zeroPos.y) * this.nodeSize - (this.nodeSize - this.dist.y);

        if (type == 'wall') {
            this.ctx.fillStyle = "#fff";
        }
        else if (type == 'checked') {
            this.ctx.fillStyle = "#d90914";
        }
        else if (type == 'checked2') {
            this.ctx.fillStyle = "#00D1FF";
        }

        this.ctx.beginPath();
        this.ctx.fillRect(cordsX + 1, cordsY + 1, this.nodeSize - 1, this.nodeSize - 1);
        // this.ctx.closePath();
    }
    undrawComponentsGrid(x, y) {
        let cordsX = (x - this.zeroPos.x) * this.nodeSize - (this.nodeSize - this.dist.x);
        let cordsY = (y - this.zeroPos.y) * this.nodeSize - (this.nodeSize - this.dist.y);

        this.ctx.clearRect(cordsX + 1, cordsY + 1, this.nodeSize - 1, this.nodeSize - 1);
    }


    BFS = async (start, end, walls, bounds) => {
        
        let exitFound = false;

        let queue = [];
        queue.push({
            x: start.x,
            y: start.y,
            path: []
        });

        let checked = [start];

    
        // let ind = 1;

        while (queue.length > 0) {

            let curr = queue.shift();

            const neighbors = [
                {
                    x: curr.x + 1,
                    y: curr.y,
                    path: curr.path
                },
                {
                    x: curr.x - 1,
                    y: curr.y,
                    path: curr.path
                },
                {
                    x: curr.x,
                    y: curr.y + 1,
                    path: curr.path
                },
                {
                    x: curr.x,
                    y: curr.y - 1,
                    path: curr.path
                }
            ]

            // addNode({
            //     x: curr.x + 1,
            //     y: curr.y,
            //     path: curr.path
            // }, this.drawComponentsGrid.bind(this));
            
            // addNode({
            //     x: curr.x - 1,
            //     y: curr.y,
            //     path: curr.path
            // }, this.drawComponentsGrid.bind(this));
            // addNode({
            //     x: curr.x,
            //     y: curr.y + 1,
            //     path: curr.path
            // }, this.drawComponentsGrid.bind(this));
            // addNode({
            //     x: curr.x,
            //     y: curr.y - 1,
            //     path: curr.path
            // }, this.drawComponentsGrid.bind(this));

            if (curr.x != start.x || curr.y != start.y) {
                this.drawComponentsGrid(curr.x, curr.y, 'checked2');
            }

            for (let i = 0; i < neighbors.length; i++) {
                const x = neighbors[i].x;
                const y = neighbors[i].y;

                if (walls.some(e => e.x === x && e.y === y) || checked.some(e => e.x === x && e.y === y)) {
                    continue;
                }
    
                if (x == start.x && y == start.y) {
                    continue;
                }
                if (x == end.x && y == end.y) {
                    exitFound = true;
                    continue;
                }
                
                let newPath = neighbors[i].path.slice();
                newPath.push({
                    x: x,
                    y: y
                });
                queue.push({
                    x: x,
                    y: y,
                    path: newPath
                });
                
                checked.push({
                    x: x,
                    y: y,
                });

                this.undrawComponentsGrid(x, y);
                this.drawComponentsGrid(x, y, 'checked');

                await waitForSecs(.00000001);
    
            }
            
            setTimeout(() => {
                // console.log('--')
            }, 500)
            // await waitForSecs(.05);
            // ind ++;

            if (exitFound) {
                console.log(curr);
                break;
            }
        }

        // const addNode = (pos, drawComponentsGrid) => {
        //     // if (pos.x < bounds.minX || pos.y < bounds.minY || pos.x > bounds.maxX || pos.y > bounds.maxY) {
        //     //     return;
        //     // }
            
        //     if (walls.some(e => e.x === pos.x && e.y === pos.y) || queue.some(e => e.x === pos.x && e.y === pos.y)) {
        //         return;
        //     }

        //     if (pos.x == start.x && pos.y == start.y) {
        //         return;
        //     }
        //     if (pos.x == end.x && pos.y == end.y) {
        //         exitFound = true;
        //         return;
        //     }
            
        //     let newPath = pos.path.slice();
        //     newPath.push({
        //         x: pos.x,
        //         y: pos.y
        //     });
        //     queue.push({
        //         x: pos.x,
        //         y: pos.y,
        //         path: newPath
        //     });

        //     // (function(pos){
        //     //     setTimeout(() => {
        //     //         drawComponentsGrid(pos.x, pos.y, 'checked')
        //     //         // clearTimeout(timeout)
        //     //     }, 500)       
        //     // })(ind);

        //     // setTimeout(() => {
        //         drawComponentsGrid(pos.x, pos.y, 'checked');
        //         // clearTimeout(timeout)
        //     // }, ind * 500)

        //     await waitForSecs(1);

        //     // clearTimeout(timeout)
        // }

        function waitForSecs(secs) {
            return new Promise(resolve => {
                setTimeout(resolve, secs * 1000);
            });
        }


    }

    run() {

        let bounds = {
            minX: Math.min(this.components.start.x, this.components.end.x),
            minY: Math.min(this.components.start.y, this.components.end.y),
            maxX: Math.max(this.components.start.x, this.components.end.x),
            maxY: Math.max(this.components.start.y, this.components.end.y)
        }

        this.components.walls.forEach((wall) => {
            if (wall.x < bounds.minX) {
                bounds.minX = wall.x;
            }
            if (wall.x > bounds.maxX) {
                bounds.maxX = wall.x;
            }

            if (wall.y < bounds.minY) {
                bounds.minY = wall.y;
            }
            if (wall.y > bounds.maxY) {
                bounds.maxY = wall.y;
            }
        });

        bounds = {
            minX: bounds.minX - 1,
            minY: bounds.minY - 1,
            maxX: bounds.maxX + 1,
            maxY: bounds.maxY + 1,
        }

        console.log(bounds)


        this.BFS(this.components.start, this.components.end, this.components.walls, bounds);

    }
    
    createGridMatrix() {
        let tempGrid = [];
        for (let i = 0; i < 3; i++) {
            tempGrid.push(Array(this.components.end.x - this.components.start.x + 3).fill(null));
        }
        tempGrid[1][1] = 's';
        tempGrid[1][tempGrid[1].length - 2] = 'e';
        
        console.log(tempGrid);

        return tempGrid;
    }

    // updateGridMatrix(x, y) {
        
    //     if (this.components.walls.length == 0) {
    //         return;
    //     }

    //     let minX = this.components.walls[0].x;
    //     let minY = this.components.walls[0].y;

    //     for (let i = 0; i < this.components.walls.length; i++) {
    //         if (this.components.walls[i].x < minX) {
    //             minX = this.components.walls[i].x;
    //         }
    //         if (this.components.walls[i].y < minY) {
    //             minY = this.components.walls[i].y;
    //         }
    //     }


    //     console.log(minX, minY);
    // }

}









