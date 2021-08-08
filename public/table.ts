
// import { Model ,crud,role} from "./types";

enum role { //enum defined for Roles
  subscriber,
  admin,
  superAdmin,
}
// interface For Crud functions
interface crud<T> {
  createData<T>();
  readData<T>();
  updateData<T>(tr: HTMLElement);
  deleteData<T>(td: HTMLElement);
}
// Model Class
class Model<T, U> {
  userId: T;
  firstName: T;
  middleName: T;
  lastName: T;
  email: T;
  phoneNumber: U;
  role: string;
  address: T;
}
// decorator function for displaying date and time
function FormatDate(date: Date): any {
  return function (
    target: string,
    name: string,
    descriptor: PropertyDescriptor
  ) {
    const datetime = document.getElementById("datetime") as HTMLInputElement; //datetime id is made in html file
    setInterval(function () {
      datetime.innerHTML = new Date().toLocaleString();
    }, 1000);
  };
}
// Client which is extending Model class and implementing the interface
class Client extends Model<string, number> implements crud<void> {
  @FormatDate(new Date()) // calling decorator function
  Route: string; //used in create and update function

  //  CREATE - POST
  createData<T>() {
    let number: Number = 8;
    this.Route = "POST";
    let addRow = document.getElementById("list") as HTMLTableElement; // list id is created in read data function
    let newRow = addRow.insertRow();
    // let newcolumn: any;

    for (
      let i = 0;
      i < number;
      i++ // Adding cells in each newly created row
    )
      newRow.insertCell();
    const buttons = document.createElement("td");
    buttons.id = "button1";
    buttons.innerHTML = ` <button id="onEditing" onClick="new Client.updateData(this)">Edit</button> <button id="onDeleting"
           onClick="new Client().deleteData(this)">Delete</button> `;
    newRow.appendChild(buttons);
    let row: HTMLElement = buttons.parentElement;
    row.setAttribute("contenteditable", 'true');
    buttons.remove();
    if (!this.inEditing(row)) {
      row.className = "in-editing";
      this.createButton(newRow);
    }
  }

  // READ - GET
  readData<T>() {
    document.getElementById("firstButton").innerHTML = "Refresh Data"; // convert load button to refresh button
    let text = `<div class="tabledata"><table align="center" id="list"><tr>`;
    text += `<th>User Id</th>`;
    text += `<th>First Name</th>`;
    text += `<th>Middle Name</th>`;
    text += `<th>Last Name</th>`;
    text += `<th>Email</th>`;
    text += `<th>Phone No.</th>`;
    text += `<th>Role</th>`;
    text += `<th>Address</th>`;

    text += "<th></th></tr>";
    let value = "<tr>";

    fetch("/users")
      // Converting received data to JSON
      .then((response) => response.json())
      .then((result) => {
        // Create a variable to store HTML

        // Loop through each data and add a table row
        result.forEach((user) => {
          this.userId = user.UId;
          this.firstName = user.firstName;
          this.middleName = user.middleName;
          this.lastName = user.lastName;
          this.email = user.email;
          this.phoneNumber = user.phoneNumber;
          this.role = user.role;
          this.address = user.address;

          value += `<td>${this.userId}</td>`;
          value += `<td>${this.firstName}</td>`;
          value += `<td>${this.middleName}</td>`;
          value += `<td>${this.lastName}</td>`;
          value += `<td>${this.email}</td>`;
          value += `<td>${this.phoneNumber}</td>`;
          value += `<td>${this.role}</td>`;
          value += `<td>${this.address}</td>`;

          value += `<td id="button1"> <button id="onEditing" onClick="new Client().updateData(this)">Edit</button>
                  <button id="onDeleting"
                     onClick="new Client().deleteData(this)">Delete</button> </td>`; // edit and delete buttons
          value += "</tr>";
        });

        // Display id is made in html file to display the table
        document.getElementById("Display").innerHTML = ` ${text} ${value} </table></div>`;
      });
    document.getElementById("addData").style.display = "Block"; // addata id is created in html file
  }
  // UPDATE - PATCH
  updateData<T>(tr: HTMLElement) {
    let row: HTMLElement = tr.parentElement.parentElement;
    this.Route = "PATCH";
    row.setAttribute("contenteditable", 'true');
    row.children[0].setAttribute("contenteditable", 'false'); // in editing mode uid cant be updated.
    tr.parentElement.remove();
    if (!this.inEditing(row)) {
      row.className = "in-editing";
      row.setAttribute("old-data", row.innerHTML); //Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.

      this.createButton(row);
    }
  }
  // in editing defined in the class so that it can be accessed in all CRUD functions
  inEditing<T>(row: HTMLElement) {
    return row.classList.contains(`in-editing`); // classname coming from update function
  }

  // DELETE
  deleteData<T>(td: HTMLElement) {
    if (confirm("Are you sure to delete this record ?")) {
      let row: any = td.parentElement.parentElement;
      let id = row.children[0].innerHTML;
      console.log(id);

      fetch(`/users/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          UId: id,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        res.json; // sends the status of deleted row with id
      });

      let table = document.getElementById("list") as HTMLTableElement;
      table.deleteRow(row.rowIndex);
      alert(`Data deleted with User Id: ${id} !!`);
    }
  }

  //  Now extra features defined apart from implemented features

  // save and cancel buttons
  createButton<T>(row: HTMLElement) {
    const buttons: HTMLElement= document.createElement("td");
    buttons.className = "button-toolbar";
    buttons.innerHTML = ` <button class="save-button">Save</button>  <button class="cancel-button">Cancel</button> `;
    row.appendChild(buttons);
    buttons.setAttribute("contenteditable", 'false');
    const buttonsave = buttons.querySelector(".save-button");
    const buttoncancel = buttons.querySelector(".cancel-button");
    buttonsave.addEventListener("click", (event: Event) => {
      event.stopPropagation();
      this.save(row);
    });

    buttoncancel.addEventListener("click", (event: Event) => {
      event.stopPropagation();
      this.cancel(row);
    });
  }
  // save button function
  save<T>(row: HTMLElement) {
    row.classList.remove("in-editing");
    // validation while saving the data or updating the data in the table
    let isCorrect: boolean = true;
    let firstname = /^[a-zA-Z+.]+$/;
    let letters = /^[A-Za-z]+$/;
    let phoneno = /^\d{10}$/;
    let idCheck = /^[0-9]+$/;
    let email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let address = /^[a-zA-Z0-9\s,'-]*$/;
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
    if (
      row.children[6].innerHTML != role[0] &&
      row.children[6].innerHTML != role[1] &&
      row.children[6].innerHTML != role[2]
    ) {
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
          address: row.children[7].innerHTML,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        if (res.status != 409) {
          res.json;
          this.removeButtons(row);
          row.setAttribute("contenteditable", 'false');
          alert("Data saved successfully!");
        } else {
          alert("Cannot update! UserId already exists");
        }
      });
    }
    // this.newRow==0 is used in update data function
    if (isCorrect && this.Route == "PATCH") {
      //Now PATCH request using fetch API......

      fetch(`/users/${row.children[0].innerHTML}`, {
        // while updating the data , only id will not be able to get edited because it is unique.
        method: "PATCH",
        body: JSON.stringify({
          firstName: row.children[1].innerHTML,
          middleName: row.children[2].innerHTML,
          lastName: row.children[3].innerHTML,
          email: row.children[4].innerHTML,
          phoneNumber: row.children[5].innerHTML,
          role: row.children[6].innerHTML,
          address: row.children[7].innerHTML,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((res) => {
        this.removeButtons(row);
        row.setAttribute("contenteditable", 'false');
        alert("Data saved successfully!");
      });
    }
  }
  // remove save and cancel buttons while creating the row or updating the row
  removeButtons<T>(row: HTMLElement) {
    const button = row.querySelector(".button-toolbar");
    button.remove();
    const buttons = document.createElement("td");
    buttons.innerHTML = ` <button id="onEditing" onClick="new Client().updateData(this)">Edit</button> <button id="onDeleting"
                 onClick="new Client().deleteData(this)">Delete</button> `;
    row.appendChild(buttons);
  }

  cancel<T>(row: HTMLElement) {
    if (this.Route == "PATCH") {
      row.innerHTML = row.getAttribute("old-data");
      row.classList.remove("in-editing");
      const buttons = document.createElement("td");
      buttons.innerHTML = ` <button id="onEditing" onClick="new Client().updateData(this)">Edit</button> <button id="onDeleting"
                 onClick="new Client().deleteData(this)">Delete</button> `;
      row.appendChild(buttons);
      row.setAttribute("contenteditable", 'false');
    } else {
      let Row = row;
      Row.remove();
    }
  }
}
