import { Grid } from './modules/Grid.js';

import { tickSvg, weightSvg, infoSvg, xSvg, smallXSvg, arrDown } from './assets/jsx.js';
import { DropDown, Slider, Toggle, Picker } from './modules/SettingsComponents.js';



class Sandbox {
    constructor() {
        this.interaction = 'hand';
 
        this.algList = [
            {
                id: 0,
                name: "Breadth-first Search",
                function: 'BFS',
                closest: true,
                weight: false,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit.",
                // function: this.BFS()
            },
            {
                id: 1,
                name: "Dijkstra's",
                function: 'Dijkstra',
                closest: true,
                weight: true,
                data: "Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later. The algorithm exists in many variants. Dijkstra's original algorithm found the shortest path between two given nodes, but a more common variant fixes a single node as the 'source' node and finds shortest paths from the source to all other nodes in the graph, producing a shortest-path tree."
            },
            {
                id: 2,
                name: "A* Search",
                function: 'AStar',
                closest: true,
                weight: true,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },
            {
                id: 3,
                name: "Greedy Best-first Search",
                function: 'GBFS',
                closest: false,
                weight: true,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },
            {
                id: 4,
                name: "Depth-first Search",
                function: 'DFS',
                closest: false,
                weight: false,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },
            {
                id: 5,
                name: "Bidirectional Swarm",
                function: 'BSwarm',
                closest: false,
                weight: true,
                data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus nisl tincidunt eget nullam non nisi est. Ut tellus elementum sagittis vitae et leo duis ut diam. Turpis massa sed elementum tempus egestas. Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit."
            },

        ]

        this.settingsList = [
            {
                id: 0,
                name: 'Algorithm',
                items: [
                    {
                        id: 0,
                        name: 'Stay inbounds',
                        setting: 'stayInbounds',
                        type: 'toggle',
                        start: false
                    },
                    {
                        id: 1,
                        name: 'Run w / o possible path',
                        setting: 'runNoPath',
                        type: 'toggle',
                        start: true
                    },
                    {
                        id: 2,
                        name: 'Speed',
                        setting: 'speed',
                        type: 'slider',
                        start: 100,
                        range: [1, 100],
                        options: [
                            {
                                id: 0,
                                name: 'Slow',
                                value: 1,
                            },
                            {
                                id: 1,
                                name: 'Mid',
                                value: 50,
                            },
                            {
                                id: 2,
                                name: 'Fast',
                                value: 100,
                            },
                        ]
                    },

                ]
            },
            {
                id: 1,
                name: 'Personalization',
                items: [
                    {
                        id: 0,
                        name: 'UI color',
                        setting: 'uiColor',
                        type: 'picker',
                        start: 0,
                        options: [
                            {
                                id: 0,
                                name: 'Green',
                                value: '#00FF00'
                            },
                            {
                                id: 1,
                                name: 'Blue',
                                value: '#00D1FF'
                            },
                            {
                                id: 2,
                                name: 'Pink',
                                value: '#FFC0CB'
                            },
                            {
                                id: 3,
                                name: 'Yellow',
                                value: '#FFFF00'
                            },
                            {
                                id: 4,
                                name: 'Orange',
                                value: '#FD7F20'
                            },
                        ]
                    },
                    {
                        id: 1,
                        name: 'Theme',
                        setting: 'theme',
                        type: 'dropdown',
                        start: 2,
                        // options: ['Light', 'Dim', 'Dark']
                        options: [
                            {
                                id: 0,
                                name: 'Light',
                            },
                            {
                                id: 1,
                                name: 'Dim',
                            },
                            {
                                id: 2,
                                name: 'Dark',
                            },
                        ]
                    },
                    {
                        id: 2,
                        name: 'Palette',
                        setting: 'palette',
                        type: 'dropdown',
                        start: 0,
                        identifiers: ['W', 'CR', 'CH', 'P'],
                        options: [
                            {
                                id: 0,
                                name: 'Default',
                                extra: ['#FFFFFF', '#1400FF', '#00D1FF', '#FFFF00']
                            },
                            {
                                id: 1,
                                name: 'BG',
                                extra: ['#FFFFFF', '#00FF00', '#FF0000', '#00D1FF']
                            },
                            {
                                id: 2,
                                name: 'Idk',
                                extra: ['#FFFFFF', '#FF00D6', '#FF8A00', '#61FF00']
                            },
                        ]
                    },



                ]
            },

        ]

        this.alg = 0;

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
                closeRun: document.getElementById('close-run-btn'),
                restartRun: document.getElementById('restart-run-btn'),
                pauseRun: document.getElementById('pause-run-btn'),
                continueRun: document.getElementById('continue-run-btn'),
                skipRun: document.getElementById('skip-run-btn')
            }

        }

        this.grid = new Grid(document.getElementById('grid-canvas'), this.returnInteraction.bind(this));

        this.init();
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
                        
            for (let i = 0; i < this.algList.length; i++) {
                let alg = this.algList[i];
                let el = `<div class="menu-item full alg ${ alg.id == this.alg ? 'selected ' : ''} ">
                            <label for="" class="mi-main">${ alg.name }</label>
                            <div class="mi-icons pointers">
                                ${ alg.closest ? tickSvg : '' }
                                ${ alg.weight ? weightSvg : '' }
                            </div>
                            <div class="mi-icons info">
                                <div class="info-cont">${ infoSvg }</div>                                
                            </div>
                            <p>${ alg.data }</p>
                        </div>`


                menu.insertAdjacentHTML('beforeend', el);
                menu.insertAdjacentHTML('beforeend', '<hr/>');

                let menuItem = document.getElementsByClassName('menu-item');

                menuItem[i].addEventListener('click', (e) => {
                    
                    if (e.target.classList.contains('info-cont')) {
                        
                        if (menuItem[i].classList.contains('open')) {
                            menuItem[i].classList.remove('open');
                            menuItem[i].style.height = '90px';
                            switchInfo(menuItem[i], 'info');
                            return;
                        }
  
                        document.querySelectorAll('.menu-item').forEach(item => {
                            item.classList.remove('open');
                            item.style.height = '90px';
                            switchInfo(item, 'info');
                        });
                        menuItem[i].classList.add('open');
                        menuItem[i].style.height = menuItem[i].scrollHeight + 'px';
                        
                        switchInfo(menuItem[i], 'x');

                    } else {

                        document.querySelectorAll('.menu-item').forEach(item => {
                            item.style.height = '90px';
                            item.classList.remove('open');
                            item.classList.remove('selected');
                            switchInfo(item, 'info');
                        });

                        this.alg = i;
                        this.grid.changeAlg(i);

                        document.querySelectorAll('.menu-item')[i].classList.add('selected');

                    }

                }, i);
            }

            function switchInfo(elem, to) {

                let info = elem.getElementsByClassName('mi-icons')[1].getElementsByClassName('info-cont')[0];
                while(info.firstChild && info.removeChild(info.firstChild));
                info.insertAdjacentHTML('beforeend', to == 'x' ? smallXSvg : infoSvg);

            }

        }
        else if (type == 'gen') {

        }
        else if (type == 'settings') {

            for (let i = 0; i < this.settingsList.length; i++) {
                let setting = this.settingsList[i];
                let el = `<div class="menu-item setting ">
                            <div class="mi-main-cont">
                                <label class="mi-main">${ setting.name }</label>
                                <div class="mi-icons arrow">
                                    ${ arrDown }
                                </div>
                            </div>
                            <div class="mi-item-cont">
                            </div>
                        </div>`


                menu.insertAdjacentHTML('beforeend', el);
                menu.insertAdjacentHTML('beforeend', '<hr/>');

                let menuItem = document.getElementsByClassName('menu-item');

                for (let j = 0; j < setting.items.length; j++) {
                    let item = setting.items[j];
                

                    menuItem[i].getElementsByClassName('mi-item-cont')[0].insertAdjacentHTML('beforeend', `<div class="mi-item ${ item.type == 'toggle' ? 'line ': ''}"></div>`);
                    let itemCont = menuItem[i].getElementsByClassName('mi-item-cont')[0].getElementsByClassName('mi-item')[j];
                    itemCont.insertAdjacentHTML('beforeend', `<label class="mi-item-label">${ item.name }</label>`);

                    if (item.type == 'dropdown') {
                        new DropDown(item, itemCont, i, j, this.updateSettings.bind(this)).createElement();
                    }
                    else if (item.type == 'slider') {
                        new Slider(item, itemCont, i, j, this.updateSettings.bind(this)).createElement();
                    }
                    else if (item.type == 'toggle') {
                        new Toggle(item, itemCont, i, j, this.updateSettings.bind(this)).createElement();
                    }
                    else if (item.type == 'picker') {
                        new Picker(item, itemCont, i, j, this.updateSettings.bind(this)).createElement();
                    }

                }

                menuItem[i].addEventListener('click', (e) => {
                    
                    if (e.target.classList.contains('mi-main-cont') && menuItem[i].classList.contains('open')) {
                        menuItem[i].classList.remove('open');
                        menuItem[i].style.height = '90px';
                        return;
                    }


                    // document.querySelectorAll('.menu-item').forEach(item => {
                    //     item.classList.remove('open');
                    //     item.style.height = '90px';
                    // });
                    menuItem[i].classList.add('open');
                    menuItem[i].style.height = menuItem[i].scrollHeight + 'px';

                }, i);

                menuItem[i].addEventListener('mouseover', (e) => {
                    if (e.target.classList.contains('mi-main-cont')) {
                        menuItem[i].classList.add('hovered');
                    }
                    else {
                        menuItem[i].classList.remove('hovered');
                    }
                }, i);

                menuItem[i].addEventListener('mouseout', (e) => {
                    menuItem[i].classList.remove('hovered');
                }, i);


            }
        }
        else if (type == 'upload') {

        }
        else if (type == 'download') {

        }
    }

    updateSettings(setting, value, ind, ind2) {
        this.grid.updateSettings(setting, value);

        this.settingsList[ind].items[ind2].start = value;
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

        this.grid.gridControl(btn);

        console.log('gridControl -> ', btn);
    }

    returnInteraction() {
        this.grid.changeInteraction(this.interaction);
    }


}

let sandbox = new Sandbox();


let menu = document.getElementById('menu-container');
document.getElementById('menu-container').addEventListener('click', (e) => {
    if (e.target.id == 'menu-container') {
        menu.classList.remove('open');
    }
});

// window.addEventListener('resize', sandbox.grid.onResize);





