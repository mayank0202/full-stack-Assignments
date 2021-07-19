var usersList = [];
let userObj = [{
        type: 'text',
        name: 'FirstName'
    },
    {
        type: 'text',
        name: 'MiddleName'
    },
    {
        type: 'text',
        name: 'LastName'
    },
    {
        type: 'text',
        name: 'email'
    },
    {
        type: 'number',
        name: 'phoneNumber'
    },
    {
        type: 'text',
        name: 'Role'
    },
    {
        type: 'text',
        name: 'Address'
    }
]

function loadData() {
    const fetchPromise = fetch("data.json");
    fetchPromise.then(response => {
        return response.json();
    }).then(response => {
        usersList = response['Users'];
        renderData();
    })
    document.getElementById("myTable").style.display = "inline-block";
    document.getElementById("refreshData").style.display = "inline-block";
    document.getElementById("loadData").style.display = "none";
}

function refreshData() {
    let table = document.getElementById("myTable")
    console.log(usersList.length);
    console.log(usersList);
    for (let ele of usersList) {
        table.deleteRow(1); // deleting the row from index 1.
    }
    this.renderData(); // displaying the json table in the html table
}

// edit function
function edit(index) {
    usersList.contentEditable = true;
    let table = document.getElementById("myTable")
    var cells = table.rows.item(Number(index) + 1).cells;
    for (let [i, ele] of userObj.entries()) {
        var input = document.createElement("input");
        input.setAttribute("type", ele.type);
        input.setAttribute("name", ele.name);
        input.setAttribute("id", "input" + index);
        input.setAttribute("value", usersList[index][ele.name]);
        cells.item(i).innerHTML = '';
        cells.item(i).append(input);
    }
    document.getElementById('cancel' + index).style.display = "inline";
    document.getElementById('save' + index).style.display = "inline";
    document.getElementById('del' + index).style.display = "none";
    document.getElementById('edit' + index).style.display = "none";

}
// delete function
function del(index) {
    console.log(index);
    let table = document.getElementById("myTable");
    table.rows.item(Number(index) + 1).style.display = "none";
}
// save function
function save(index) {
    let table = document.getElementById("myTable");
    for (let [i, ele] of userObj.entries()) {
        usersList[index][ele.name] = document.getElementById("input" + index).value;
        table.rows.item(Number(index) + 1).cells.item(i).innerHTML = document.getElementById("input" + index).value;
    }
    document.getElementById('cancel' + index).style.display = "none";
    document.getElementById('save' + index).style.display = "none";
    document.getElementById('del' + index).style.display = "inline";
    document.getElementById('edit' + index).style.display = "inline";
}
// cancel function
function cancel(index) {
    let table = document.getElementById("myTable");
    for (let [i, ele] of userObj.entries()) {
        table.rows.item(Number(index) + 1).cells.item(i).innerHTML = usersList[index][ele.name];
    }
    document.getElementById('cancel' + index).style.display = "none";
    document.getElementById('save' + index).style.display = "none";
    document.getElementById('del' + index).style.display = "inline";
    document.getElementById('edit' + index).style.display = "inline";
}
// renderdata function
function renderData() {
    let object = document.getElementById("myTable");
    for (let [i, ele] of usersList.entries()) { //Returns an iterable of key, value pairs for every entry in the array
        let row = object.insertRow(i + 1);
        for (let [index, elec] of userObj.entries()) {
            let cell = row.insertCell(index);
            cell.innerHTML = ele[elec.name];
        }
        console.log(userObj.length + 1);
        let cell = row.insertCell(userObj.length);
        createButtons(cell, i);
        createButtons1(cell, i);
        createButtons2(cell, i);
        createButtons3(cell, i);

    }
}

function createButtons(cell, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Save';
    button.id = 'save' + index;

    button.onclick = function() {
        console.log("button clicked" + index);
        save(index);
    };
    cell.appendChild(button);
    document.getElementById('save' + index).style.display = "none";
}

function createButtons1(cell, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'Delete';
    button.id = 'del' + index;

    button.onclick = function() {
        console.log("button clicked" + index);
        del(index);
    };
    cell.appendChild(button);
}

function createButtons2(cell, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'cancel';
    button.id = 'cancel' + index;

    button.onclick = function() {
        console.log("button clicked" + index);
        cancel(index);
    };
    cell.appendChild(button);
    document.getElementById('cancel' + index).style.display = "none";

}

function createButtons3(cell, index) {
    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'edit';
    button.id = 'edit' + index;

    button.onclick = function() {
        console.log("button clicked" + index);
        edit(index);

    };
    cell.appendChild(button);
}