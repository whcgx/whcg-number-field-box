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

    //TODO: Takes alot time

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('childrenattached', e => {
            this._multiplyFields();
            e.stopPropagation();
        });
    };

//     disconnectedCallback() {
// //TODO: remove events
//     }

    static get properties() {

        return {
            outputString: {
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
            jsondata: {
                type: String,
                notify: true,
                readOnly: false,
            },
        }
    };

    _multiplyFields() {

        let assignednodes = this.$.slotid.assignedNodes();
        

        let filteredArr = assignednodes.filter(element => {

            return element.nodeName === "WHCG-NUMBER-FIELD";
        });
        let dataArr = filteredArr.map(element => element.__data);
        console.log(dataArr);

        let undefinedElement = false;

        dataArr.forEach(element => {
            if (element === undefined) {
                undefinedElement = true;
            }
        }) 

        if (!undefinedElement) {
            this.outputString = this.arrayMultiplier(dataArr);
            this.jsonBuilder(dataArr);
        }
        
    };

    jsonBuilder(dataArr) {
        let obj = {};
        obj.result = [];
        obj.result.push({});
        dataArr.forEach(element => {
            obj.result[0][element.label] = element.value;
        });
        this.jsondata = JSON.stringify(obj);
    };

    arrayMultiplier(arr) {
        return arr.reduce((acc, cur) => {
            return acc * Number(cur.value);
        }, 1);
    };

    _setDirection() {
        this.$.flexbox.classList.remove('row');
        this.$.flexbox.classList.add('column');
    };
}

window.customElements.define('whcg-number-field-box', WhcgNumberFieldBox);
