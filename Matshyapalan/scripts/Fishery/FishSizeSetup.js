
function ExpenseHeadType(data) {

    var self = this;
    self.ExpenseHeadTypeID = ko.observable(data.ExpenseHeadTypeID);
    //self.ExpenseHeadTypeID = ko.observable("kuchb");
    self.DescriptionInNepali = ko.observable(data.DescriptionInNepali);
    self.DescriptionInEnglish = ko.observable(data.DescriptionInEnglish);
    if (data.Visibility == "true") {
        self.Visibility = ko.observable(true);
    }
    else {
        self.Visibility = ko.observable(false);

    }

    self.Status = ko.observable(data.Status);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.Action = ko.observable(data.Action);

};

function ExpenseHead(data) {

    var self = this;
    self.Action = ko.observable(data.Action);
    self.ExpenseHeadType = ko.observable(data.ExpenseHeadType);
    if (data.ExpenseHeadType.Visibility == "true") {
        data.ExpenseHeadType.Visibility = ko.observable(true);
    }
    else {
        data.ExpenseHeadType.Visibility = ko.observable(false);

    }
    // self.ExpenseHeadType= ExpenseHeadType(data.ExpenseHeadType);
    self.Amount = ko.observable(data.Amount);

};


//model view 
function FishSizeSetupViewModel() {
    var self = this;
    self.SizeId = ko.observable();
    self.fishSize = ko.observable();
    //self.DescriptionInEnglish = ko.observable();
    //self.Status = ko.observable("V");
    //self.Visibility = ko.observable(true);
    self.Action = ko.observable("A");
    self.EntryDate = ko.observable(null);
    self.role = ko.observable($("#roleid").text());
    self.EntryBy = ko.observable($("#user").text());
    self.FishSizes = ko.observableArray([]);
    //self.TestHeads = ko.observableArray([]);
    //self.ExpenseHeads = ko.observableArray([]);
    //....selected record for edit
    self.SelectedItem = ko.observable();

    //..to get the data
    self.GetFishCategoryType = function () {
        alert("welcome");
        debugger;
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            //Handler\Fishery\FishSizeSetupHandler.ashx
            url: '../Handler/Fishery/FishSizeSetupHandler.ashx',
            data: { 'method': 'GetFishCategoryType', 'ExpItmId': null, 'Visibility': null, 'p_rc': null, 'role': self.role() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                var ob = ko.toJS(result.ResponseData);
                var o = [];
                for (var i = 0; i < ob.length; i++) {
                    var ob1 = ob[i].ExpenseHeadType;
                    o.push(ob1);
                }
                var mappedTask = $.map(o, function (item) {
                    return new ExpenseHeadType(item)
                });

                self.ExpenseHeads(mappedTask);
                waitMsg.hide();
            },
            error: function (err) {
                //msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }


    self.GetFishCategoryType();

    //to add to table
    self.Add = function () {

        //  alert(self.Visibility());

        var errMsg = "";
        var add = self.SelectedItem();


        //-----------in case to edit/update----------

        if (add != undefined) {

            //validating controls      
            if (self.Validation()) {
                add.ExpenseHeadTypeID(self.ExpenseHeadTypeID());
                add.DescriptionInNepali(self.DescriptionInNepali());
                add.DescriptionInEnglish(self.DescriptionInEnglish());
                add.Visibility(self.Visibility());
                add.EntryBy(self.EntryBy());
                add.EntryDate = null;
                var action = self.Action() == "A" ? "A" : "E";
                add.Action = action;

                self.SelectedItem(null);


                self.ClearControls();

            }
        }

        //---------in case of adding new record to table----------------
        else {

            if (self.Validation()) {

                var errMsg = "";
                var objFocus = null;
                var pro;

                pro = {
                    ExpenseHeadTypeID: null,
                    DescriptionInNepali: self.DescriptionInNepali(),
                    DescriptionInEnglish: self.DescriptionInEnglish(),
                    Visibility: self.Visibility(),
                    Status: "I",
                    EntryBy: self.EntryBy(),
                    EntryDate: null,
                    Action: "A"
                };

                self.ExpenseHeads.push(pro);

                console.log(ko.toJS(self.ExpenseHeads()));
                self.ClearControls();
            }
        }
    }



    self.SaveExpenseHeadType = function () {

        // var obj = JSON.stringify(ko.toJS(self.HeadTypes()));
        var obj = ko.toJS(self.ExpenseHeads());
        //console.log(obj);
        //        var l = self.DescriptionInNepali;
        //        console.log(l);
        var obj1 = [];

        for (var i = 0; i < obj.length; i++) {
            var kd = {
                ExpenseHeadTypeID: obj[i].ExpenseHeadTypeID,
                DescriptionInNepali: obj[i].DescriptionInNepali,
                DescriptionInEnglish: obj[i].DescriptionInEnglish,
                Visibility: obj[i].Visibility == true ? "A" : "I",

                Status: obj[i].Status,
                EntryBy: obj[i].EntryBy,
                EntryDate: obj[i].EntryDate,
                Action: obj[i].Action
            };
            obj1.push(kd);
        }
        //console.log(obj1);
        var k = JSON.stringify(ko.toJS(obj1));
        //console.log(k);

        var url = '../../Handlers/CAMPAIGNMANAGEMENT/ExpenseHeadItemEntry.ashx';
        var method = "SaveExpenseHeadType";
        var data = { 'method': method, 'args': k, 'role': self.role() };
        $.post(url, data, function (result) {
            var obj = jQuery.parseJSON(result);
            if (obj.IsSucess) {
                msg(obj.Message);
                self.GetExpenseHeadType();
            }
            else {
                msg(obj.Message, "WARNING");
            }
        });
        self.ClearControls();

    }


    self.EditExpenseHeadType = function (d) {

        //console.log(expenseHeadType.ExpenseHeadTypeID);
        self.ExpenseHeadTypeID(d.ExpenseHeadTypeID());
        self.DescriptionInNepali(d.DescriptionInNepali());
        self.DescriptionInEnglish(d.DescriptionInEnglish());
        self.Visibility(d.Visibility());
        self.Status(d.Status);

        if (d.Action == "A") {
            self.Action("A");
        }
        else {
            self.Action("E");
        }
        self.SelectedItem(d);
        $("#btnAdd").text("Update");

    }


    //--------------------------------------------------------------
    // To Remove Table Data
    //--------------------------------------------------------------
    self.DeleteExpenseHeadType = function (expheadtype) {

        //var obj = ko.toJS(expheadtype);

        Confirm('के तपाईं हटाउन निश्चित हुनुहुन्छ ?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                //console.log(expheadtype);
                //console.log(expheadtype.ExpenseHeadTypeID);

                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/CAMPAIGNMANAGEMENT/ExpenseHeadItemEntry.ashx',
                    data: { 'method': 'DeleteExpenseHeadType', 'expenseHeadTypeId': expheadtype.ExpenseHeadTypeID, 'role': self.role() },
                    success: function (result) {
                        waitMsg.hide();



                        if (result.IsSucess) {
                            self.ExpenseHeads.remove(expheadtype);
                            //self.GetExpenseHeadType();
                            msg(result.ResponseData);
                        }
                        else {
                            if (!result.IsToken)
                                msg(result.Message, "WARNING", null, ClearSession);
                            else
                                msg(result.Message, "WARNING");
                        }

                    },
                    error: function (err) {
                        waitMsg.hide();
                        msg(err.status + " - " + err.statusText, "FAILURE");
                    }
                });
            }
        });
    };


    self.Validation = function () {
        var errMsg = "";
        var objFocus = null;

        if (Validate.empty(self.DescriptionInNepali())) {
            errMsg += "कृपया नेपालीमा वर्णन प्रविष्टि गर्नुहोस् !!!<br>";
        }

        if (Validate.empty(self.DescriptionInEnglish())) {
            errMsg += "कृपया अङ्ग्रेजीमा वर्णन प्रविष्टि गर्नुहोस् !!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");
            return false;
        }
        else {
            return true;
        }
    }


    self.ClearControls = function () {

        self.ExpenseHeadTypeID(null);
        self.DescriptionInNepali('');
        self.DescriptionInEnglish('');
        self.Visibility(true);
        self.Status("");
        self.SelectedItem(null);
        self.Action(null);

        $("#btnAdd").text("Add");

    }

}


$(document).ready(function () {
   // ValidateSession();
    ko.applyBindings(new FishSizeSetupViewModel());
});



