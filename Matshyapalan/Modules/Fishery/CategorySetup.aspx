<%@ Page Title="" Language="C#" MasterPageFile="~/Main.Master" AutoEventWireup="true" CodeBehind="CategorySetup.aspx.cs" Inherits="Matshyapalan.Modules.Fishery.CategorySetup" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="wrapper row">
        <div class="col-md-10 frm pull-right animated slideInRight">

           

                <div class="row">
                    <div class="col-md-3">
                        Fish Category<span class="mandatory">*</span>
                    </div>
                    <div class="col-md-5">
                        <input type="text" class="form-control" id="txtfishCategory" data-bind="value: fishCategory " />
                    </div>
                </div>

                <br />
                <br />

                <div class="row">
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-4">
                        <button id="btnAdd" class="btn btn-primary" data-bind="click: SaveCat">Add</button>
                        <button id="btnCancel" class="btn btn-primary" data-bind="click: ClearControls">Cancel</button>
                    </div>
                </div>
                <br />

                <div class="row">
                    <div class="col-md-10">
                        <table class="table table-bordered fixed-header">
                            <thead>
                                <tr>
                                    <th style="width: 10%;">S.No
                                    </th>

                                    <th>Category
                                    </th>
                                    <th>कार्य
                                    </th>
                                </tr>
                            </thead>
                            <tbody data-bind="foreach: ExpenseHeads">
                                <tr>
                                    <td style="width: 10%;">
                                        <span data-bind="text: ($index() + 1)"><span data-bind="text: ExpenseHeadTypeID" style="width: 100px; visibility: hidden;" /></span>
                                    </td>

                                    <td>
                                        <span data-bind="text: fishCategory"></span>
                                    </td>
                                    <td>
                                        <%--<span data-bind="text: Action"></span>--%>
                                        <a data-bind="click: $root.EditExpenseHeadType" id="edit">
                                            <span class="glyphicon glyphicon-edit" title="Edit" rel="tooltip"></span></a>
                                        <a data-bind="click: $root.DeleteExpenseHeadType">
                                            <span class="glyphicon glyphicon-trash" title="Delete" rel="tooltip"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <br />

                <div class="row">
                    <div class="col-md-8">
                    </div>
                    <div class="col-md-4">
                        <button id="btnSubmit" class="btn btn-primary" data-bind="click: SaveExpenseHeadType">Save</button>



                    </div>
                </div>

                <%--<script src="../../Scripts/CAMPAIGNMANAGEMENT/ExpenseHeadItemEntry.js" type="text/javascript"></script>--%>

                <script src="../../scripts/Fishery/CategorySetup.js"></script>
           
        </div>
    </div>

</asp:Content>
