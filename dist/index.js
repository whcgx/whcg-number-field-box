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
        <h3>{{name}}</h3>
        <div id="flexbox" class="row">
            <slot id="slotid" on-input="_collectChildren" ></slot>
        </div>  
    `
    };

    //TODO: Takes alot time

    connectedCallback() {
        super.connectedCallback();
            this._collectChildren();
        this.addEventListener('childrenattached', e => {
            this._collectChildren();
            e.stopPropagation();
        });
    };

//     disconnectedCallback() {
// //TODO: remove events
//     }

    static get properties() {

        return {
            outputValue: {
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
            whcgjsonoutput: {
                type: String,
                notify: true,
                readOnly: false,
            },
            type: {
                type: String,
                notify: true,
                readOnly: false,
            },
            kind: {
                type: String,
                notify: true,
                readOnly: false,
            },
            period: {
                type: String,
                notify: true,
                readOnly: false,
            },
            name: {
                type: String,
                notify: true,
                readOnly: false,
            }
        }
    };

    _collectChildren() {
        let assignednodes = this.$.slotid.assignedNodes();
        

        let filteredArr = assignednodes.filter(element => {

            return element.nodeName === "WHCG-NUMBER-FIELD";
        });

        console.log('filteredArr');
        console.log(filteredArr);
        let childrenArr = filteredArr.map(element => element.__data);
        

        let undefinedElement = false;

        childrenArr.forEach(element => {
            if (element === undefined) {
                undefinedElement = true;
            }
        }); 

        if (!undefinedElement) {
            this.outputValue = this.arrayMultiplier(childrenArr);
            console.log('this.outputString!');
            console.log(this.outputValue);
            this.jsonBuilder(childrenArr);
        }
        
    };

    jsonBuilder(childrenArr) {

        console.log('childrenArr');
        console.log(childrenArr);
        let whcgObj = {};
        whcgObj.result = [];

        function dataFactory(item) {
            let dataobj = {};
            for (let i = 0; i < Number(item); i++) {
                Object.assign(dataobj, {
                    [childrenArr[i].kind]: {
                        label: childrenArr[i].label,
                        dataset: {
                            [childrenArr[i].period]: Number(childrenArr[i].value)
                        }
                    }
                });
            }

            Object.assign(dataobj, {
                [this.kind]: {
                    label: this.kind,
                    dataset: {
                        [this.period]: Number(this.outputValue)
                    }
                }
            });

            return dataobj;
        }

        function resultElementObjFactory() {
            return {
                object: this.name,
                data: dataFactory.call(this, childrenArr.length)
            }
        }

        whcgObj.result.push(resultElementObjFactory.call(this));



        console.log('whcgObj');
        console.log(whcgObj);
        this.whcgjsonoutput = JSON.stringify(whcgObj);

        console.log(this.whcgjsonoutput);
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

exports.WhcgNumberFieldBox = WhcgNumberFieldBox;
