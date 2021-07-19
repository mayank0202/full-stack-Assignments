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
// Enums
var Role;
(function (Role) {
    Role[Role["SuperAdmin"] = 0] = "SuperAdmin";
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["Subscriber"] = 2] = "Subscriber";
})(Role || (Role = {}));
// json data and enums are used in it
var Users = [{
        "First_Name": "Mayank",
        "Middle_Name": "NN",
        "Last_Name": "Sharma",
        "Email": "mayank2299@gmail.com",
        "Phone_Number": "9873824766",
        "Role": Role[0],
        "Address": "Sector 31 Faridabad"
    }, {
        "First_Name": "Rohit",
        "Middle_Name": "NN",
        "Last_Name": "Sharma",
        "Email": "rohit99@gmail.com",
        "Phone_Number": "9873824766",
        "Role": Role[1],
        "Address": "Sector 1 Faridabad"
    }, {
        "First_Name": "Shubham",
        "Middle_Name": "NN",
        "Last_Name": "Sharma",
        "Email": "shubham22@gmail.com",
        "Phone_Number": "9971408709",
        "Role": Role[2],
        "Address": "Sector 35 Faridabad"
    }, {
        "First_Name": "kushal",
        "Middle_Name": "NN",
        "Last_Name": "Dhiman",
        "Email": "shubham22@gmail.com",
        "Phone_Number": "9971408105",
        "Role": Role[1],
        "Address": "Sector 35 Faridabad"
    }, {
        "First_Name": "Ekta",
        "Middle_Name": "NN",
        "Last_Name": "Garg",
        "Email": "shubham22@gmail.com",
        "Phone_Number": "9971408105",
        "Role": Role[0],
        "Address": "Panipat"
    },
    {
        "First_Name": "Aniket",
        "Middle_Name": "NN",
        "Last_Name": "Garg",
        "Email": "shubham22@gmail.com",
        "Phone_Number": "9971408105",
        "Role": Role[2],
        "Address": "Panipat"
    }
];
// Model class using generics
var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());
// extending model class and implementing interface
var MyClass = /** @class */ (function (_super) {
    __extends(MyClass, _super);
    function MyClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // create function with no return type
    MyClass.prototype.createData = function () {
        var addRow = document.getElementById("list"); //list is an id of table
        var newRow = addRow.insertRow();
        var newCloumn;
        for (var value in Users[0])
            newCloumn = newRow.insertCell();
        var buttons = document.createElement("btn");
        buttons.innerHTML = "<button id =\"onediting\" onClick =\"new MyClass.updateData(this)\">Edit</button>\n         <button id = \"ondeleting\" onclick =\"new MyClass.deleteData(this)\">Delete</button>";
        newRow.appendChild(buttons);
        this.updateData(buttons.firstChild);
    };
    ;
    // read function is used for displaying data
    MyClass.prototype.Read = function () {
        document.getElementById("button").innerHTML = ("Refresh"); // load will convert into refresh
        var design = "<div class=\"tabledata\"><table table-xl align=\"center\" id=\"list\"><tr>";
        for (var key in Users[0]) {
            design += "<th>" + key + "</th>";
        }
        design += "<th></th></tr>";
        var tablerow = "<tr>";
        for (var i in Object.keys(Users)) {
            this.First_Name = Users[i]["First_Name"];
            this.Middle_Name = Users[i]["Middle_Name"];
            this.Last_Name = Users[i]["Last_Name"];
            this.Email = Users[i]["Email"];
            this.Phone_Number = Users[i]["Phone_Number"];
            this.Role = Users[i]["Role"];
            ;
            this.Address = Users[i]["Address"];
            tablerow += "<td>" + this.First_Name + "</td>";
            tablerow += "<td>" + this.Middle_Name + "</td>";
            tablerow += "<td>" + this.Last_Name + "</td>";
            tablerow += "<td>" + this.Email + "</td>";
            tablerow += "<td>" + this.Phone_Number + "</td>";
            tablerow += "<td>" + this.Role + "</td>";
            tablerow += "<td>" + this.Address + "</td>";
            tablerow += "<td id=\"button1\"> <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button>\n            <button id=\"onDeleting\"\n               onClick=\"new MyClass().deleteData(this)\">Delete</button> </td>";
            tablerow += "</tr>";
        }
        // generatedata id is made in html file
        document.getElementById("GenerateData").innerHTML = " " + design + " " + tablerow + " </table></div>";
    };
    ;
    //update function 
    MyClass.prototype.updateData = function (tr) {
        var row = tr.parentElement.parentElement;
        row.setAttribute('contenteditable', true);
        row.children[Object.keys(Users[0]).length].setAttribute('contenteditable', false);
        var tabledata = tr.parentElement.remove();
        if (!this.inEditing(row)) {
            row.className = 'in-editing';
            row.setAttribute('old-data', row.innerHTML);
            this.createButton(row);
        }
    };
    ;
    // inEditing function is made for update function
    MyClass.prototype.inEditing = function (row) {
        return row.classList.contains("in-editing");
    };
    // save and cancel button has been created 
    MyClass.prototype.createButton = function (row) {
        var _this = this;
        var buttons = document.createElement('td');
        buttons.className = "button-toolbar";
        buttons.innerHTML = " <button class=\"save-button\" id=\"save\">Save</button>  <button class=\"cancel-button\" id=\"cancel\">Cancel</button>  ";
        row.appendChild(buttons);
        buttons.setAttribute('contenteditable', false);
        var buttonsave = buttons.querySelector('.save-button');
        var buttoncancel = buttons.querySelector('.cancel-button');
        buttonsave.addEventListener('click', function (event) {
            event.stopPropagation(); //
            _this.save(row);
        });
        buttoncancel.addEventListener('click', function (event) {
            event.stopPropagation();
            _this.cancel(row);
        });
    };
    //save function for saving the editable data
    MyClass.prototype.save = function (row) {
        row.classList.remove('in-editing');
        this.removeButtons(row);
        row.setAttribute('contenteditable', false);
    };
    // cancel function for going back to edit button
    MyClass.prototype.cancel = function (row) {
        row.innerHTML = row.getAttribute('old-data'); // coming from update function
        row.classList.remove('in-editing');
        var buttons = document.createElement('td');
        buttons.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n    onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
        row.appendChild(buttons);
        row.setAttribute('contenteditable', false);
    };
    // After clicking on save button it will remove save and cancel button and edit and delete buttons will be displayed again.
    MyClass.prototype.removeButtons = function (row) {
        var btn = row.querySelector('.button-toolbar'); // class name is coming from 155 line
        btn.remove();
        var btns = document.createElement('td');
        btns.innerHTML = " <button id=\"onEditing\" onClick=\"new MyClass().updateData(this)\">Edit</button> <button id=\"onDeleting\"\n    onClick=\"new MyClass().deleteData(this)\">Delete</button> ";
        row.appendChild(btns);
    };
    // delete function for deleting the row
    MyClass.prototype.deleteData = function (td) {
        if (confirm("Are you sure to delete this entry ?")) {
            var row = td.parentElement.parentElement;
            var data = document.getElementById("list"); // list id was created for table
            data.deleteRow(row.rowIndex);
        }
    };
    __decorate([
        FormatDate(new Date()) // calling Decorator Function
        // create function with no return type
    ], MyClass.prototype, "createData");
    return MyClass;
}(Model));
// Decorator Factory (date and time formatter)
function FormatDate(date) {
    return function (target, name, descriptor) {
        var datetime = document.getElementById("datetime");
        setInterval(function () {
            datetime.innerHTML = new Date().toLocaleString();
        }, 1000);
    };
}
// load button function 
function loaddata() {
    var object = new MyClass();
    object.Read();
    document.getElementById("adddata").style.display = "Block";
}
