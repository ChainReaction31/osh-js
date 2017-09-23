/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

OSH.UI.EntityEditViewPanel = OSH.UI.Panel.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, options);
    },

    initPanel:function() {
        this.view = this.options.view;

        if(!isUndefinedOrNull(this.options.entityId)) {
            this.entityId = this.options.entityId;
        }

        OSH.Utils.addCss(this.divElt,"edit-view");

        this.buildViewProperties();

        var containerArr = this.getContainers();
        if(this.view.container !== "") {
            containerArr = this.getContainers().concat(this.view.container).filter(function(value, index, self) {
                return self.indexOf(value) === index;
            });
        }
        this.buildContainer(containerArr);

        this.buildContent();
    },

    buildViewProperties: function() {
        OSH.Helper.HtmlHelper.addHTMLTitledLine(this.divElt,"View properties");

        var inputViewNameId = OSH.Helper.HtmlHelper.addInputText(this.divElt,"Name",this.view.name);

        var self = this;
        OSH.EventManager.observeDiv(inputViewNameId,"change",function(event){

            // updates view name
            self.view.name = this.value;
        });
    },

    buildContainer: function(containerArr) {
        OSH.Helper.HtmlHelper.addHTMLTitledLine(this.divElt,"Container");
        this.containerDivId = OSH.Helper.HtmlHelper.addHTMLListBox(this.divElt,"",containerArr);

        OSH.Helper.HtmlHelper.HTMLListBoxSetSelected(document.getElementById(this.containerDivId),this.view.container);
        // add default containers
        // listener
        var self = this;

        OSH.EventManager.observeDiv(this.containerDivId,"change",function(event){

            // updates view container
            self.view.container = this.options[this.selectedIndex].value;
        });
    },

    /**
     * Abstract
     */
    buildContent:function() {},

    getView:function() {
        return this.view;
    },

    getContainers:function() {
        return [" ","Dialog"];
    }
});