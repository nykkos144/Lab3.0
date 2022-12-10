import Grid from './modules/Grid.js';

import { tickSvg, weightSvg, infoSvg } from './assets/jsx.js';

// let interaction = 'drag';


class Sandbox {
    constructor() {
        this.interaction = 'hand';
 
        this.algList = [
            {
                id: 0,
                name: "Breadth-first Search",
                closest: true,
                weight: false,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit.",
                // function: this.BFS()
            },
            {
                id: 1,
                name: "Dijkstra's",
                closest: true,
                weight: true,
                data: "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later. The algorithm exists in many variants. Dijkstra's original algorithm found the shortest path between two given nodes, but a more common variant fixes a single node as the 'source' node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree."
            },
            {
                id: 2,
                name: "A* Search",
                closest: true,
                weight: true,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },
            {
                id: 3,
                name: "Greedy Best-first Search",
                closest: false,
                weight: true,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },
            {
                id: 4,
                name: "Depth-first Search",
                closest: false,
                weight: false,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },
            {
                id: 5,
                name: "Bidirectional Swarm",
                closest: false,
                weight: true,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },

        ]


        this.alg = 0;
        

        // this.btns = {
        //     add: document.getElementById('add-btn'),
        //     remove: document.getElementById('remove-btn'),
        //     start: document.getElementById('start-btn'),
        //     end: document.getElementById('end-btn'),
        //     delete: document.getElementById('delete-btn'),
        //     refresh: document.getElementById('refresh-btn'),
        //     run: document.getElementById('run-btn'),
        //     alg: document.getElementById('alg-btn'),
        //     gen: document.getElementById('gen-btn'),
        //     settings: document.getElementById('settings-btn'),
        //     upload: document.getElementById('upload-btn'),
        //     download: document.getElementById('download-btn'),
        //     hand: document.getElementById('hand-btn'),
        //     pointer: document.getElementById('pointer-btn')
        // }

        this.btns = {
            interactions: {
                add: document.getElementById('add-btn'),
                remove: document.getElementById('remove-btn'),
                start: document.getElementById('start-btn'),
                end: document.getElementById('end-btn'),
                hand: document.getElementById('hand-btn'),
                pointer: document.getElementById('pointer-btn')
            },
            menus: {
                alg: document.getElementById('alg-btn'),
                gen: document.getElementById('gen-btn'),
                settings: document.getElementById('settings-btn'),
                upload: document.getElementById('upload-btn'),
                download: document.getElementById('download-btn')
            },
            gridControls: {
                delete: document.getElementById('delete-btn'),
                refresh: document.getElementById('refresh-btn'),
                run: document.getElementById('run-btn'),
                closeRun: document.getElementById('close-run-btn')
            }

        }


        this.grid = new Grid(document.getElementById('grid-canvas'), this.returnInteraction.bind(this));

        this.init();
        // this.grid.init();
    }

    init() {

        this.grid.init();

        for (let type in this.btns) {
            // this.btns[type].addEventListener('click', () => this.btnClick(x));

            for (let btn in this.btns[type]) {
                if (type == 'interactions') {
                    this.btns[type][btn].addEventListener('click', () => this.interactionBtnClick(btn));
                }
                else if (type == 'menus') {
                    this.btns[type][btn].addEventListener('click', () => this.menuBtnClick(btn));
                }
                else if (type == 'gridControls') {
                    this.btns[type][btn].addEventListener('click', () => this.gridControlBtnClick(btn));
                }
            }
        }

    }


    updateMenu(type) {

        let menu = document.getElementById('menu');
        while(menu.firstChild && menu.removeChild(menu.firstChild));

        document.getElementById('menu-container').classList.add('open');

        if (type == 'alg') {
                        
            for (let id in this.algList) {
                let alg = this.algList[id];
                let el = `<div class="menu-item ${ alg.id == this.alg ? 'selected ' : ''} ">` +
                            `<label for="" class="mi-main">${ alg.name }</label>` +
                            '<div class="mi-icons pointers">' +
                                `${ alg.closest ? tickSvg : '' }` +
                                `${ alg.weight ? weightSvg : '' }` +
                            '</div>' +
                            '<div class="mi-icons info">' +
                                `<div class="info-cont">${ infoSvg }</div>` +
                                // `${ infoSvg }` +                                   
                            '</div>' +
                            `<p>${ alg.data }</p>`
                        '</div>'
                        // '<hr/>'

                menu.insertAdjacentHTML('beforeend', el);
                menu.insertAdjacentHTML('beforeend', '<hr/>');

                let menuItem =  document.getElementsByClassName('menu-item');
                menuItem[id].addEventListener('click', (e) => {
                    
                    // document.querySelectorAll('.menu-item').forEach(item => {
                    //     item.classList.remove('open');
                    // });

                    if (e.target.classList.contains('info-cont')) {

                        console.log(menuItem[id])
                        
                        if (menuItem[id].classList.contains('open')) {
                            // console.log('-0-')
                            menuItem[id].classList.remove('open');
                            menuItem[id].style.height = '90px';
                            return;
                        }

                        
                        document.querySelectorAll('.menu-item').forEach(item => {
                            item.classList.remove('open');
                            item.style.height = '90px';
                        });
                        menuItem[id].classList.add('open');
                        menuItem[id].style.height = menuItem[id].scrollHeight + 'px';
                            // e.path[0].classList.add('open');
                    } else {

                        document.querySelectorAll('.menu-item').forEach(item => {
                            item.style.height = '90px';
                            item.classList.remove('open');
                            item.classList.remove('selected');
                        });

                        this.alg = id;

                        document.querySelectorAll('.menu-item')[id].classList.add('selected');

                    }
                    // console.log(e.target.classList.contains('info-cont'));

                }, id);
            }

        }
        else if (type == 'gen') {

        }
        else if (type == 'settings') {

        }
        else if (type == 'upload') {

        }
        else if (type == 'download') {

        }
    }

    interactionBtnClick(btn) {

        if (this.interaction == btn) {
            return;
        }

        this.btns['interactions'][this.interaction].classList.remove('selected');
        this.btns['interactions'][btn].classList.add('selected');

        this.interaction = btn;
        this.grid.changeInteraction(btn);

        console.log('interaction -> ', btn);

    }
    menuBtnClick(btn) {
        console.log('menu -> ', btn);
        this.updateMenu(btn);
    }
    gridControlBtnClick(btn) {

        // if (btn == 'run') {
        //     this.run();
        //     return;
        // }
        // this.interaction = btn;
        this.grid.gridControl(btn);

        console.log('gridControl -> ', btn);
    }

    returnInteraction() {
        this.grid.changeInteraction(this.interaction);
    }

    // BFS() {

    // }



    // run() {
    //     console.log('---')
    // }

}

let sandbox = new Sandbox();


let menu = document.getElementById('menu-container');
document.getElementById('menu-container').addEventListener('click', (e) => {
    if (e.target.id == 'menu-container') {
        menu.classList.remove('open');
    }
});

// document.getElementById('run-btn').addEventListener('click', (e) => {
//     sandbox.run();
// });

// let grid = new Grid(document.getElementById('grid-canvas'));
// grid.init();





