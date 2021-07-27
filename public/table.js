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
// model
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
var MyClass = /** @class */ (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //POST
    MyClass.prototype.createData = function () {
        this.Route = "POST";
        var addR = document.getElementById("list");
        var newR = addR.insertRow();
        var newC;
        for (var i = 0; i < 8; i++)
            newR.insertCell();
        var btns = document.createElement("td");
        btns.id = "button1";
        btns.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass.updateData(this)\">Edit</button> <button id=\"onDeleting\"\n           onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
        newR.appendChild(btns);
        var row = btns.parentElement;
        row.setAttribute("contenteditable", true);
        btns.remove();
        if (!this.inEditing(row)) {
            row.className = "in-editing";
            //   row.setAttribute("old-data", row.innerHTML);
            this.createButton(newR);
        }
    };
    // GET
    MyClass.prototype.readData = function () {
        var _this = this;
        document.getElementById("firstButton").innerHTML = "Refresh Data";
        var text = "<div class=\"tabledata\"><table align=\"center\" id=\"list\"><tr>";
        text += "<th>User Id</th>";
        text += "<th>First Name</th>";
        text += "<th>Middle Name</th>";
        text += "<th>Last Name</th>";
        text += "<th>Email</th>";
        text += "<th>Phone No.</th>";
        text += "<th>Role</th>";
        text += "<th>Address</th>";
        // text += `<th>CustomerName</th>`;
        text += "<th></th></tr>";
        var value = "<tr>";
        fetch("/users")
            .then(function (response) { return response.json(); })
            .then(function (json) {
            // Create a variable to store HTML
            // Loop through each data and add a table row
            json.forEach(function (user) {
                _this.UserId = user.uid;
                _this.First_Name = user.first_name;
                _this.Middle_Name = user.middle_name;
                _this.Last_Name = user.last_name;
                _this.Email = user.email;
                _this.Phone_Number = user.phone_number;
                _this.Role = user.role;
                _this.Address = user.address;
                value += "<td>" + _this.UserId + "</td>";
                value += "<td>" + _this.First_Name + "</td>";
                value += "<td>" + _this.Middle_Name + "</td>";
                value += "<td>" + _this.Last_Name + "</td>";
                value += "<td>" + _this.Email + "</td>";
                value += "<td>" + _this.Phone_Number + "</td>";
                value += "<td>" + _this.Role + "</td>";
                value += "<td>" + _this.Address + "</td>";
                value += "<td id=\"button1\"> <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button>\n          <button id=\"onDeleting\"\n             onClick=\"new MyClass().deleteData(this)\">Delete</button> </td>";
                value += "</tr>";
            });
            // Display result
            document.getElementById("Display").innerHTML = " " + text + " " + value + "\n \n         </table>    </div>\n         ";
        });
        document.getElementById("addData").style.display = "Block";
    };
    //POST
    MyClass.prototype.updateData = function (tr) {
        var row = tr.parentElement.parentElement;
        this.Route = "PATCH";
        row.setAttribute("contenteditable", true);
        row.children[0].setAttribute("contenteditable", false);
        // row.children[8].setAttribute("contenteditable", false);
        tr.parentElement.remove();
        if (!this.inEditing(row)) {
            row.className = "in-editing";
            row.setAttribute("old-data", row.innerHTML);
            this.createButton(row);
        }
    };
    //DELETE
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
                res.json;
            });
            var tab = document.getElementById("list");
            tab.deleteRow(row.rowIndex);
            alert("Data deleted with User Id: " + id + " !!");
        }
    };
    MyClass.prototype.inEditing = function (row) {
        return row.classList.contains("in-editing");
    };
    // Save and cancel buttons created
    MyClass.prototype.createButton = function (row) {
        var _this = this;
        var buttons = document.createElement("td");
        buttons.className = "button-toolbar";
        buttons.innerHTML = " <button class=\"save-button\">Save</button>  <button class=\"cancel-button\">Cancel</button>  ";
        row.appendChild(buttons);
        buttons.setAttribute("contenteditable", false);
        var btnsave = buttons.querySelector(".save-button");
        var btncancel = buttons.querySelector(".cancel-button");
        btnsave.addEventListener("click", function (ev) {
            ev.stopPropagation();
            _this.save(row);
        });
        btncancel.addEventListener("click", function (ev) {
            ev.stopPropagation();
            _this.cancel(row);
        });
    };
    MyClass.prototype.save = function (row) {
        var _this = this;
        // Validations
        row.classList.remove("in-editing");
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
                    _this.removeButtons(row);
                    row.setAttribute("contenteditable", false);
                    alert("Data saved successfully!");
                }
                else {
                    alert("Error in updating! User Id already exists");
                }
            });
        }
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
    /// removing save and cancel buttons
    MyClass.prototype.removeButtons = function (row) {
        var btn = row.querySelector(".button-toolbar");
        btn.remove();
        var btns = document.createElement("td");
        btns.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n         onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
        row.appendChild(btns);
    };
    // cancel button functionality
    MyClass.prototype.cancel = function (row) {
        if (this.Route == "PATCH") {
            row.innerHTML = row.getAttribute("old-data");
            row.classList.remove("in-editing");
            var btns = document.createElement("td");
            btns.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n         onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
            row.appendChild(btns);
            row.setAttribute("contenteditable", false);
        }
        else {
            var newrow = row;
            newrow.remove();
        }
    };
    __decorate([
        FormatDate(new Date())
    ], MyClass.prototype, "Route");
    return MyClass;
}(Model));
