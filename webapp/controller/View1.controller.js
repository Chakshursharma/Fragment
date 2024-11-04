sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel", 
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, Fragment, JSONModel, MessageBox, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("fragment.controller.View1", {
        onInit: function () {
            var oMaterialData = {
                materials: [
                    { matnr: "M001", materialName: "Material A", materialDescription: "Description A" },
                    { matnr: "M002", materialName: "Material B", materialDescription: "Description B" },
                    { matnr: "M003", materialName: "Material C", materialDescription: "Description C" },
                    { matnr: "M004", materialName: "Material D", materialDescription: "Description D" },
                    { matnr: "M005", materialName: "Material E", materialDescription: "Description E" },
                    { matnr: "M006", materialName: "Material F", materialDescription: "Description F" },
                    { matnr: "M007", materialName: "Material G", materialDescription: "Description G" },
                    { matnr: "M008", materialName: "Material H", materialDescription: "Description H" },
                    { matnr: "M009", materialName: "Material I", materialDescription: "Description I" },
                    { matnr: "M010", materialName: "Material J", materialDescription: "Description J" }
                ]
            };

            var oModel = new JSONModel(oMaterialData);
            this.getView().setModel(oModel);
        },

        onOpenFragment: function () {
            var oView = this.getView();

            if (!this.byId("materialDialog")) {
                Fragment.load({
                    id: oView.getId(),
                    name: "fragment.view.Fragment", 
                    controller: this
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);

                    // var oList = oDialog.byId("materialList");
                    // console.log("List Binding:", oList.getBinding("items"));  
                });
            } else {
                this.byId("materialDialog").open();
            }
        },

        onSearchMaterials: function (oEvent) {
            var sQuery = oEvent.getParameter("newValue");
            var oList = this.byId("materialList");
            var aFilters = [];
            if (sQuery && sQuery.length > 0) {
                var oFilter = new Filter("matnr", FilterOperator.Contains, sQuery);
                aFilters.push(oFilter);
            }

            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters);
        },

        onReleaseToManufacture: function () {
            var oDialog = this.byId("materialDialog");
            MessageBox.confirm("Material released", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK && oDialog) {
                        oDialog.close();  
                    }
                }
            });
        },

        onCloseDialog: function () {
            this.byId("materialDialog").close();  
        }
    });
});
