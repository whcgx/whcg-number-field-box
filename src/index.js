import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';

/**
 * `WhcgNumberFieldBox`
 * 
 * @customElement
 * @polymer
 */

export class WhcgNumberFieldBox extends PolymerElement {
    static get template() {
        return html `
        <style>
            
            #flexbox {
                display: flex;
            }
            .column {
                flex-direction: column;
            }
            .row {
                flex-direction: row; 
            }
            ::slotted(*) {
                padding-right: 15px;
            }

        </style>
        <div id="flexbox" class="row">
            <slot id="slotid" on-input="_multiplyFields" ></slot>
        </div>  
    `
};

    _multiplyFields(e) {

        let assignednodes = this.$.slotid.assignedNodes();

        let filteredArr = assignednodes.filter(element => {

            return element.nodeName === "WHCG-NUMBER-FIELD";
        });
        let reducedArray = filteredArr.reduce((acc, cur) => {
            return acc * Number(cur.__data.value);
        }, 1);
        
        this.output = reducedArray;
    };

    static get properties() {

        return {
            output: {
                type: String,
                notify: true,
                readOnly: false,
            },
            column: {
                type: Boolean,
                notify: true,
                readOnly: false,
                observer: '_setDirection'
            },
        }
    };

    _setDirection() {
        this.$.flexbox.classList.remove('row');
        this.$.flexbox.classList.add('column');
    }
}

window.customElements.define('whcg-number-field-box', WhcgNumberFieldBox);
