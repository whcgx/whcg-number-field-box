import {html,PolymerElement} from '@polymer/polymer/polymer-element.js';

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
            :host {
                display: flex;
                flex-direction: column;
            }
        </style>
       <slot id="slotid" on-input="_multiplyFields" ></slot>
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
        
        this.output = reducedArray
    };

    static get properties() {

        return {
            output: {
                type: String,
                notify: true,
                readOnly: false,
            },
        }
    };
}

window.customElements.define('whcg-number-field-box', WhcgNumberFieldBox);