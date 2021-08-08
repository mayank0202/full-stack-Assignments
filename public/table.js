// import { Model ,crud,role} from "./types";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var role;
(function (role) {
    role[role["subscriber"] = 0] = "subscriber";
    role[role["admin"] = 1] = "admin";
    role[role["superAdmin"] = 2] = "superAdmin";
})(role || (role = {}));
// Model Class
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
// decorator function for displaying date and time
function FormatDate(date) {
    return function (target, name, descriptor) {
        var datetime = document.getElementById("datetime"); //datetime id is made in html file
        setInterval(function () {
            datetime.innerHTML = new Date().toLocaleString();
        }, 1000);
    };
}
// Client which is extending Model class and implementing the interface
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //  CREATE - POST
    Client.prototype.createData = function () {
        var number = 8;
        this.Route = "POST";
        var addRow = document.getElementById("list"); // list id is created in read data function
        var newRow = addRow.insertRow();
        // let newcolumn: any;
        for (var i = 0; i < number; i++ // Adding cells in each newly created row
        )
            newRow.insertCell();
        var buttons = document.createElement("td");
        buttons.id = "button1";
        buttons.innerHTML = " <button id=\"onEditing\" onClick=\"new Client.updateData(this)\">Edit</button> <button id=\"onDeleting\"\n           onClick=\"new Client().deleteData(this)\">Delete</button> ";
        newRow.appendChild(buttons);
        var row = buttons.parentElement;
        row.setAttribute("contenteditable", 'true');
        buttons.remove();
        if (!this.inEditing(row)) {
            row.className = "in-editing";
            this.createButton(newRow);
        }
    };
    // READ - GET
    Client.prototype.readData = function () {
        var _this = this;
        document.getElementById("firstButton").innerHTML = "Refresh Data"; // convert load button to refresh button
        var text = "<div class=\"tabledata\"><table align=\"center\" id=\"list\"><tr>";
        text += "<th>User Id</th>";
        text += "<th>First Name</th>";
        text += "<th>Middle Name</th>";
        text += "<th>Last Name</th>";
        text += "<th>Email</th>";
        text += "<th>Phone No.</th>";
        text += "<th>Role</th>";
        text += "<th>Address</th>";
        text += "<th></th></tr>";
        var value = "<tr>";
        fetch("/users")
            .then(function (response) { return response.json(); })
            .then(function (result) {
            // Create a variable to store HTML
            // Loop through each data and add a table row
            result.forEach(function (user) {
                _this.userId = user.UId;
                _this.firstName = user.firstName;
                _this.middleName = user.middleName;
                _this.lastName = user.lastName;
                _this.email = user.email;
                _this.phoneNumber = user.phoneNumber;
                _this.role = user.role;
                _this.address = user.address;
                value += "<td>" + _this.userId + "</td>";
                value += "<td>" + _this.firstName + "</td>";
                value += "<td>" + _this.middleName + "</td>";
                value += "<td>" + _this.lastName + "</td>";
                value += "<td>" + _this.email + "</td>";
                value += "<td>" + _this.phoneNumber + "</td>";
                value += "<td>" + _this.role + "</td>";
                value += "<td>" + _this.address + "</td>";
                value += "<td id=\"button1\"> <button id=\"onEditing\" onClick=\"new Client().updateData(this)\">Edit</button>\n                  <button id=\"onDeleting\"\n                     onClick=\"new Client().deleteData(this)\">Delete</button> </td>"; // edit and delete buttons
                value += "</tr>";
            });
            // Display id is made in html file to display the table
            document.getElementById("Display").innerHTML = " " + text + " " + value + " </table></div>";
        });
        document.getElementById("addData").style.display = "Block"; // addata id is created in html file
    };
    // UPDATE - PATCH
    Client.prototype.updateData = function (tr) {
        var row = tr.parentElement.parentElement;
        this.Route = "PATCH";
        row.setAttribute("contenteditable", 'true');
        row.children[0].setAttribute("contenteditable", 'false'); // in editing mode uid cant be updated.
        tr.parentElement.remove();
        if (!this.inEditing(row)) {
            row.className = "in-editing";
            row.setAttribute("old-data", row.innerHTML); //Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.
            this.createButton(row);
        }
    };
    // in editing defined in the class so that it can be accessed in all CRUD functions
    Client.prototype.inEditing = function (row) {
        return row.classList.contains("in-editing"); // classname coming from update function
    };
    // DELETE
    Client.prototype.deleteData = function (td) {
        if (confirm("Are you sure to delete this record ?")) {
            var row = td.parentElement.parentElement;
            var id = row.children[0].innerHTML;
            console.log(id);
            fetch("/users/" + id, {
                method: "DELETE",
                body: JSON.stringify({
                    UId: id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (res) {
                res.json; // sends the status of deleted row with id
            });
            var tab = document.getElementById("list");
            tab.deleteRow(row.rowIndex);
            alert("Data deleted with User Id: " + id + " !!");
        }
    };
    //  Now extra features defined apart from implemented features
    // save and cancel buttons
    Client.prototype.createButton = function (row) {
        var _this = this;
        var buttons = document.createElement("td");
        buttons.className = "button-toolbar";
        buttons.innerHTML = " <button class=\"save-button\">Save</button>  <button class=\"cancel-button\">Cancel</button>  ";
        row.appendChild(buttons);
        buttons.setAttribute("contenteditable", false);
        var buttonsave = buttons.querySelector(".save-button");
        var buttoncancel = buttons.querySelector(".cancel-button");
        buttonsave.addEventListener("click", function (event) {
            event.stopPropagation();
            _this.save(row);
        });
        buttoncancel.addEventListener("click", function (event) {
            event.stopPropagation();
            _this.cancel(row);
        });
    };
    // save button function
    Client.prototype.save = function (row) {
        var _this = this;
        row.classList.remove("in-editing");
        // validation while saving the data or updating the data in the table
        var isCorrect = true;
        var firstname = /^[a-zA-Z+.]+$/;
        var letters = /^[A-Za-z]+$/;
        var phoneno = /^\d{10}$/;
        var idCheck = /^[0-9]+$/;
        var email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var address = /^[a-zA-Z0-9\s,'-]*$/;
        if (!row.children[0].innerHTML.match(idCheck)) {
            alert("Error! Please Enter valid user id");
            isCorrect = false;
        }
        if (!row.children[1].innerHTML.match(firstname)) {
            alert("Error! Please Enter valid First Name");
            isCorrect = false;
        }
        if (!row.children[2].innerHTML.match(letters)) {
            alert("Error! Please Enter valid Middle Name");
            isCorrect = false;
        }
        if (!row.children[3].innerHTML.match(letters)) {
            alert("Error! Please Enter valid Last Name");
            isCorrect = false;
        }
        if (!row.children[4].innerHTML.match(email)) {
            alert("Error! Please Enter valid Email Id");
            isCorrect = false;
        }
        if (!row.children[5].innerHTML.match(phoneno)) {
            alert("Error! Please Enter valid Phone Number");
            isCorrect = false;
        }
        if (row.children[6].innerHTML != role[0] &&
            row.children[6].innerHTML != role[1] &&
            row.children[6].innerHTML != role[2]) {
            console.log(row.children[5].innerHTML);
            alert("Error! Please Enter valid Role");
            isCorrect = false;
        }
        if (!row.children[7].innerHTML.match(address)) {
            alert("Error! Please Enter valid Address");
            isCorrect = false;
        }
        //this.newRow==1 is used in createdata Function for Creating the data
        if (isCorrect && this.Route == "POST") {
            //Now POST request using fetch API......
            fetch("/users", {
                method: "POST",
                body: JSON.stringify({
                    UId: row.children[0].innerHTML,
                    firstName: row.children[1].innerHTML,
                    middleName: row.children[2].innerHTML,
                    lastName: row.children[3].innerHTML,
                    email: row.children[4].innerHTML,
                    phoneNumber: row.children[5].innerHTML,
                    role: row.children[6].innerHTML,
                    address: row.children[7].innerHTML
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (res) {
                if (res.status != 404) {
                    res.json;
                    _this.removeButtons(row);
                    row.setAttribute("contenteditable", false);
                    alert("Data saved successfully!");
                }
                else {
                    alert("Cannot update! UserId already exists");
                }
            });
        }
        // this.newRow==0 is used in update data function
        if (isCorrect && this.Route == "PATCH") {
            //Now PATCH request using fetch API......
            fetch("/users/" + row.children[0].innerHTML, {
                // while updating the data , only id will not be able to get edited because it is unique.
                method: "PATCH",
                body: JSON.stringify({
                    firstName: row.children[1].innerHTML,
                    middleName: row.children[2].innerHTML,
                    lastName: row.children[3].innerHTML,
                    email: row.children[4].innerHTML,
                    phoneNumber: row.children[5].innerHTML,
                    role: row.children[6].innerHTML,
                    address: row.children[7].innerHTML
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(function (res) {
                _this.removeButtons(row);
                row.setAttribute("contenteditable", false);
                alert("Data saved successfully!");
            });
        }
    };
    // remove save and cancel buttons while creating the row or updating the row
    Client.prototype.removeButtons = function (row) {
        var btn = row.querySelector(".button-toolbar");
        btn.remove();
        var btns = document.createElement("td");
        btns.innerHTML = " <button id=\"onEditing\" onClick=\"new Client().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n                 onClick=\"new Client().deleteData(this)\">Delete</button> ";
        row.appendChild(btns);
    };
    Client.prototype.cancel = function (row) {
        if (this.Route == "PATCH") {
            row.innerHTML = row.getAttribute("old-data");
            row.classList.remove("in-editing");
            var btns = document.createElement("td");
            btns.innerHTML = " <button id=\"onEditing\" onClick=\"new Client().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n                 onClick=\"new Client().deleteData(this)\">Delete</button> ";
            row.appendChild(btns);
            row.setAttribute("contenteditable", 'false');
        }
        else {
            var Row = row;
            Row.remove();
        }
    };
    __decorate([
        FormatDate(new Date()) // calling decorator function
    ], Client.prototype, "Route");
    return Client;
}(Model));
