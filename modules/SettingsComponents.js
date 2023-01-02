import { arrDown, tickSvg_black } from "../assets/jsx.js";


export class DropDown {
    constructor(item, DOMParent, ind, ind2, updateSettings) {
        // this.id = id;
        this.options = item.options;
        this.setting = item.setting;
        this.start = item.start;
        this.identifiers = item.identifiers;
 
        this.ind = ind;
        this.ind2 = ind2;

        this.DOMParent = DOMParent;
        this.updateSettings = updateSettings;

        this.element = document.createElement('div');

    }


    createElement() {

        if (this.start > 0) {
            let tempInd = this.options.findIndex(x => x.id == this.start);
            let tempOption = this.options[tempInd];
            this.options.splice(tempInd, 1);
            this.options.sort((a, b) => a.id - b.id);
            this.options.unshift(tempOption);
        }

        this.element.classList.add('sc-dropdown', 'sc-item');

        this.element.innerHTML = `<div class="sc-dropdown-item-cont">
                                    ${this.options.map((option, ind) => {
                                        return `<div class="sc-dropdown-item" index="${ ind }" value="${ option.id }">
                                                ${ !option.extra ? option.name : `<div class="sc-dropdown-item-extra ${ ind > 0 ? 'full ' : '' }">
                                                    ${ option.extra.map((extra) => {
                                                        return `<div style="background-color: ${ extra }"></div>`
                                                    }).join('')}
                                                </div>` }
                                            </div>`
                                    }).join('')}
                                </div>
                                ${ arrDown }
                                ${ !this.identifiers ? ' ' : `<div class="sc-dropdown-item-identifiers">
                                    ${ this.identifiers.map((ident) => {
                                        return `<div>${ ident }</div>`;
                                    }).join('')}
                                </div>`}`

        this.DOMParent.appendChild(this.element);

        this.bind();
    }

    onClick(e) {

        if (!this.element.classList.contains('open')) {
            this.element.classList.add('open');
            this.element.style.height = this.options.length * 60 + 'px';

            this.element.parentNode.parentNode.parentNode.style.height = this.element.parentNode.parentNode.parentNode.offsetHeight + (this.options.length - 1) * 60 + 'px';

            return;
        }

        let index = Number(e.target.getAttribute('index'));
        let value = Number(e.target.getAttribute('value'));

        this.element.classList.remove('open');
        this.element.getElementsByClassName('sc-dropdown-item-cont')[0].style.top = index * -60 + 'px';

        // console.log(this.element.getElementsByClassName('sc-dropdown-item-cont')[0].getElementsByClassName('sc-dropdown-item')[index].getElementsByClassName('sc-dropdown-item-extra')[0])
        
        // if (this.options.extra) {
            // for(let i = 0; i < this.element.getElementsByClassName('sc-dropdown-item-cont')[0].getElementsByClassName('sc-dropdown-item').length; i++) {
            //     this.element.getElementsByClassName('sc-dropdown-item-cont')[0].getElementsByClassName('sc-dropdown-item')[i].getElementsByClassName('sc-dropdown-item-extra')[0].classList.remove('full');
            // }
        // }
        
        this.element.style.height = '60px';

        this.element.parentNode.parentNode.parentNode.style.height = this.element.parentNode.parentNode.parentNode.offsetHeight - (this.options.length - 1) * 60 + 'px';
        
        if (index == 0) {
            return;
        }

        if (this.options[0].extra) {
            for(let i = 0; i < this.element.getElementsByClassName('sc-dropdown-item-cont')[0].getElementsByClassName('sc-dropdown-item').length; i++) {
                this.element.getElementsByClassName('sc-dropdown-item-cont')[0].getElementsByClassName('sc-dropdown-item')[i].getElementsByClassName('sc-dropdown-item-extra')[0].classList.remove('full');
            }
        }
        
        let tempOption = this.options[index];
        this.options.splice(index, 1);
        this.options.sort((a, b) => a.id - b.id);
        this.options.unshift(tempOption);

        setTimeout(() => {
            this.element.getElementsByClassName('sc-dropdown-item-cont')[0].style.top = '0px';
            this.update();
        }, 200)

        this.updateSettings(this.setting, value, this.ind, this.ind2);

    }

    update() {
        // this.element.classList.add('sc-dropdown');

        this.element.innerHTML = `<div class="sc-dropdown-item-cont">
                                    ${this.options.map((option, ind) => {
                                        return `<div class="sc-dropdown-item" index="${ ind }" value="${ option.id }">
                                                ${ !option.extra ? option.name : `<div class="sc-dropdown-item-extra ${ ind > 0 ? 'full ' : '' }">
                                                    ${ option.extra.map((extra) => {
                                                        return `<div style="background-color: ${ extra }"></div>`
                                                    }).join('')}
                                                </div>` }
                                            </div>`
                                    }).join('')}
                                </div>
                                ${ arrDown }
                                ${ !this.identifiers ? ' ' : `<div class="sc-dropdown-item-identifiers">
                                    ${ this.identifiers.map((ident) => {
                                        return `<div>${ ident }</div>`;
                                    }).join('')}
                                </div>`}`

        this.DOMParent.removeChild(this.DOMParent.getElementsByClassName('sc-dropdown')[0]);
        this.DOMParent.appendChild(this.element);
    }


    bind() {
        this.element.addEventListener('click', this.onClick.bind(this));
    }


}


export class Slider {
    constructor(item, DOMParent, ind, ind2, updateSettings) {
        // this.id = id;
        this.options = item.options;
        this.setting = item.setting;
        this.start = item.start;
        this.range = item.range;
 
        this.ind = ind;
        this.ind2 = ind2;

        this.DOMParent = DOMParent;
        this.updateSettings = updateSettings;

        this.element = document.createElement('div');
    }


    createElement() {

        let uiColor = getComputedStyle(document.documentElement).getPropertyValue('--ui-color');

        this.element.classList.add('sc-slider', 'sc-item');

        this.element.innerHTML = `<input type="range" class="slider-element" min="${ this.range[0] }" value="${ this.start }" max="${ this.range[1] }" step="1" list="speedsettings" style="background: linear-gradient(90deg, ${ uiColor } ${ this.start }%, #202020 ${ this.start }%)" />
                                    <div>
                                        ${ this.options.map((option, ind) => {
                                            return `<label>${ option.name }</label>`
                                        }).join('')}
                                    </div>`

        this.DOMParent.appendChild(this.element);

        this.element = this.element.getElementsByTagName('input')[0];

        this.update();

        this.bind();
    }

    onChange(e) {

        let uiColor = getComputedStyle(document.documentElement).getPropertyValue('--ui-color');

        this.element.style.background = `linear-gradient(90deg, ${ uiColor } ${ this.element.value }%, #202020 ${ this.element.value }%)`;

        this.updateSettings(this.setting, this.element.value, this.ind, this.ind2);

        this.update();
    }

    update() {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].value <= this.element.value) {
                this.element.parentNode.getElementsByTagName('div')[0].getElementsByTagName('label')[i].classList.add('active');
            }
            else {
                this.element.parentNode.getElementsByTagName('div')[0].getElementsByTagName('label')[i].classList.remove('active');
            }
        }
    }


    bind() {
        this.element.addEventListener('input', this.onChange.bind(this));
        // this.element.addEventListener('click', this.onClick.bind(this));
    }


}


export class Toggle {
    constructor(item, DOMParent, ind, ind2, updateSettings) {
        this.checked = item.start;
        this.setting = item.setting;
        this.DOMParent = DOMParent;
        this.updateSettings = updateSettings;

        this.ind = ind;
        this.ind2 = ind2;

        this.element = document.createElement('div');
    }


    createElement() {

        this.element.classList.add('sc-toggle', 'sc-item');

        this.element.innerHTML = `<div class="toggle ${ this.checked ? 'active ' : '' }">
                                    <input type="checkbox">
                                    <div></div>
                                </div>`

        this.DOMParent.appendChild(this.element);

        this.element = this.element.getElementsByTagName('div')[0];

        this.bind();
    }

    onClick(e) {

        if (this.checked) {
            this.element.classList.remove('active');
            this.checked = false;
        }
        else {
            this.element.classList.add('active');
            this.checked = true;
        }

        this.updateSettings(this.setting, this.checked, this.ind, this.ind2);
    }

    update() {

    }


    bind() {
        this.element.addEventListener('click', this.onClick.bind(this));
    }

}


export class Picker {
    constructor(item, DOMParent, ind, ind2, updateSettings) {
        this.options = item.options;
        this.setting = item.setting;
        this.selected = item.start;

        this.DOMParent = DOMParent;
        this.updateSettings = updateSettings;

        this.ind = ind;
        this.ind2 = ind2;

        this.element = document.createElement('div');
    }


    createElement() {

        this.element.classList.add('sc-picker', 'sc-item');

        this.element.innerHTML = `<div class="sc-picker-item-cont">
                                    ${this.options.map((option, ind) => {
                                        return `<div class="sc-picker-item ${ option.id == this.selected ? 'active ' : '' }" value="${ option.id }" style='background-color: ${ option.value }'>${ tickSvg_black }</div>`
                                    }).join('')}
                                </div>`

        this.DOMParent.appendChild(this.element);

        // this.element = this.element.getElementsByTagName('div')[0];

        this.bind();
    }

    onClick(e) {
        if (!e.target.classList.contains('sc-picker-item')) {
            return;
        }

        this.element.getElementsByClassName('sc-picker-item')[this.selected].classList.remove('active');

        this.selected = e.target.getAttribute('value');

        this.element.getElementsByClassName('sc-picker-item')[this.selected].classList.add('active');

        this.updateSettings(this.setting, this.selected, this.ind, this.ind2);

        // this.update();
    }

    update() {
        this.element.innerHTML = `<div class="sc-picker-item-cont">
                                    ${this.options.map((option, ind) => {
                                        return `<div class="sc-picker-item ${ option.id == this.selected ? 'active ' : '' }" value="${ option.id }" style='background-color: ${ option.value }'>${ tickSvg_black }</div>`
                                    }).join('')}
                                </div>`

        this.DOMParent.removeChild(document.getElementsByClassName('sc-picker sc-item')[0]);
        this.DOMParent.appendChild(this.element);
    }


    bind() {
        this.element.addEventListener('click', this.onClick.bind(this));
    }

}
