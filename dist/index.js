'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var polymerElement_js = require('@polymer/polymer/polymer-element.js');

/**
 * `WhcgNumberFieldBox`
 * 
 * @customElement
 * @polymer
 */

class WhcgNumberFieldBox extends polymerElement_js.PolymerElement {
    static get template() {
        return polymerElement_js.html `
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
        
        this.output = reducedArray;
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

exports.WhcgNumberFieldBox = WhcgNumberFieldBox;
