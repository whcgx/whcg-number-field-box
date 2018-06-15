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

        //added a comment;

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

exports.WhcgNumberFieldBox = WhcgNumberFieldBox;
