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
var Role;
(function (Role) {
    Role[Role["Subscriber"] = 0] = "Subscriber";
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["SuperAdmin"] = 2] = "SuperAdmin";
})(Role || (Role = {}));
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
// MyClass which is extending Model class and implementing the interface 
var MyClass = /** @class */ (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //  CREATE - POST
    MyClass.prototype.createData = function () {
        var number = 8;
        this.Route = "POST";
        var addRow = document.getElementById("list"); // list id is created in read data function
        var newRow = addRow.insertRow();
        var newcolumn;
        for (var i = 0; i < number; i++)
            newRow.insertCell();
        var buttons = document.createElement("td");
        buttons.id = "button1";
        buttons.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass.updateData(this)\">Edit</button> <button id=\"onDeleting\"\n           onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
        newRow.appendChild(buttons);
        var row = buttons.parentElement;
        row.setAttribute("contenteditable", true);
        buttons.remove();
        if (!this.inEditing(row)) {
            row.className = "in-editing";
            this.createButton(newRow);
        }
    };
    // READ - GET
    MyClass.prototype.readData = function () {
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
            .then(function (json) {
            // Create a variable to store HTML
            // Loop through each data and add a table row
            json.forEach(function (user) {
                _this.UserId = user.UId;
                _this.First_Name = user.First_Name;
                _this.Middle_Name = user.Middle_Name;
                _this.Last_Name = user.Last_Name;
                _this.Email = user.Email;
                _this.Phone_Number = user.Phone_Number;
                _this.Role = user.Role;
                _this.Address = user.Address;
                value += "<td>" + _this.UserId + "</td>";
                value += "<td>" + _this.First_Name + "</td>";
                value += "<td>" + _this.Middle_Name + "</td>";
                value += "<td>" + _this.Last_Name + "</td>";
                value += "<td>" + _this.Email + "</td>";
                value += "<td>" + _this.Phone_Number + "</td>";
                value += "<td>" + _this.Role + "</td>";
                value += "<td>" + _this.Address + "</td>";
                value += "<td id=\"button1\"> <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button>\n                  <button id=\"onDeleting\"\n                     onClick=\"new MyClass().deleteData(this)\">Delete</button> </td>"; // edit and delete buttons
                value += "</tr>";
            });
            // Display id is made in html file to display the table 
            document.getElementById("Display").innerHTML = " " + text + " " + value + "\n\n                 </table>    </div>\n                 ";
        });
        document.getElementById("addData").style.display = "Block"; // addata id is created in html file
    };
    // UPDATE - PATCH
    MyClass.prototype.updateData = function (tr) {
        var row = tr.parentElement.parentElement;
        this.Route = "PATCH";
        row.setAttribute("contenteditable", true);
        row.children[0].setAttribute("contenteditable", false); // in editing mode uid cant be updated.
        tr.parentElement.remove();
        if (!this.inEditing(row)) {
            row.className = "in-editing";
            row.setAttribute("old-data", row.innerHTML); //Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.
            this.createButton(row);
        }
    };
    // in editing defined in the class so that it can be accessed in all CRUD functions
    MyClass.prototype.inEditing = function (row) {
        return row.classList.contains("in-editing"); // classname coming from update function
    };
    // DELETE 
    MyClass.prototype.deleteData = function (td) {
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
            })
                .then(function (res) {
                res.json; // sends the status of deleted row with id
            });
            var tab = document.getElementById("list");
            tab.deleteRow(row.rowIndex);
            alert("Data deleted with User Id: " + id + " !!");
        }
    };
    //  Now extra features defined apart from implemented features
    // save and cancel buttons 
    MyClass.prototype.createButton = function (row) {
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
    MyClass.prototype.save = function (row) {
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
        if (row.children[6].innerHTML != Role[0] &&
            row.children[6].innerHTML != Role[1] &&
            row.children[6].innerHTML != Role[2]) {
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
                    First_Name: row.children[1].innerHTML,
                    Middle_Name: row.children[2].innerHTML,
                    Last_Name: row.children[3].innerHTML,
                    Email: row.children[4].innerHTML,
                    Phone_Number: row.children[5].innerHTML,
                    Role: row.children[6].innerHTML,
                    Address: row.children[7].innerHTML
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(function (res) {
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
                method: "PATCH",
                body: JSON.stringify({
                    First_Name: row.children[1].innerHTML,
                    Middle_Name: row.children[2].innerHTML,
                    Last_Name: row.children[3].innerHTML,
                    Email: row.children[4].innerHTML,
                    Phone_Number: row.children[5].innerHTML,
                    Role: row.children[6].innerHTML,
                    Address: row.children[7].innerHTML
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(function (res) {
                _this.removeButtons(row);
                row.setAttribute("contenteditable", false);
                alert("Data saved successfully!");
            });
        }
    };
    // remove save and cancel buttons while creating the row or updating the row
    MyClass.prototype.removeButtons = function (row) {
        var btn = row.querySelector(".button-toolbar");
        btn.remove();
        var btns = document.createElement("td");
        btns.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n                 onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
        row.appendChild(btns);
    };
    MyClass.prototype.cancel = function (row) {
        if (this.Route == "PATCH") {
            row.innerHTML = row.getAttribute("old-data");
            row.classList.remove("in-editing");
            var btns = document.createElement("td");
            btns.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n                 onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
            row.appendChild(btns);
            row.setAttribute("contenteditable", false);
        }
        else {
            var Row = row;
            Row.remove();
        }
    };
    __decorate([
        FormatDate(new Date()) // calling decorator function
    ], MyClass.prototype, "Route");
    return MyClass;
}(Model));
