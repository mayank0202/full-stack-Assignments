enum Role {        //enum 
  Subscriber,
  Admin,
  SuperAdmin,
}
// interace
interface crud<T> {
  createData<T>();
  readData<T>();
  updateData<T>(tr: any);
  deleteData<T>(td: any);
}
// model
class Model<T, U> {
  UserId: T;
  First_Name: T;
  Middle_Name: T;
  Last_Name: T;
  Email: T;
  Phone_Number: U;
  Role: string;
  Address: T;
}
 // decorator function for displaying date and time
 function FormatDate(date:any):any{
  return function(target:any,name:string,descriptor:PropertyDescriptor){
   const datetime=document.getElementById("datetime") as HTMLInputElement; //datetime id is made in html file
   setInterval(function() {
      datetime.innerHTML=new Date().toLocaleString();
  },1000);
}
}

class MyClass extends Model<string, number> implements crud<void> {
  
  // //Methods implemented from the interface
  @FormatDate(new Date())
  Route:string;
 //POST
  createData<T>() {
    this.Route = "POST";
    var addR: any = document.getElementById("list") as HTMLTableElement;
    var newR = addR.insertRow();
    var newC: any;
    for (let i = 0; i < 8; i++) newR.insertCell();
    const btns = document.createElement("td");
    btns.id = "button1";
    btns.innerHTML = ` <button id="onEditing" onClick="new MyClass.updateData(this)">Edit</button> <button id="onDeleting"
           onClick="new MyClass().deleteData(this)">Delete</button> `;
    newR.appendChild(btns);
    var row: any = btns.parentElement;
    row.setAttribute("contenteditable", true);
    btns.remove();
    if (!this.inEditing(row)) {
      row.className = "in-editing";
   //   row.setAttribute("old-data", row.innerHTML);
      this.createButton(newR);
    }
  }
  // GET
  readData<T>() {
    document.getElementById("firstButton").innerHTML = "Refresh Data";
    var text = `<div class="tabledata"><table align="center" id="list"><tr>`;
    text += `<th>User Id</th>`;
    text += `<th>First Name</th>`;
    text += `<th>Middle Name</th>`;
    text += `<th>Last Name</th>`;
    text += `<th>Email</th>`;
    text += `<th>Phone No.</th>`;
    text += `<th>Role</th>`;
    text += `<th>Address</th>`;
    // text += `<th>CustomerName</th>`;

    text += "<th></th></tr>";
    var value = "<tr>";


    fetch("/users")
      // Converting received data to JSON
      .then((response) => response.json())
      
      .then((json) => {
        // Create a variable to store HTML
       
        // Loop through each data and add a table row
        json.forEach((user) => {
          this.UserId = user.uid;
          this.First_Name = user.first_name;
          this.Middle_Name = user.middle_name;
          this.Last_Name = user.last_name;
          this.Email = user.email;
          this.Phone_Number = user.phone_number;
          this.Role = user.role;
          this.Address = user.address;

          value += `<td>${this.UserId}</td>`;
          value += `<td>${this.First_Name}</td>`;
          value += `<td>${this.Middle_Name}</td>`;
          value += `<td>${this.Last_Name}</td>`;
          value += `<td>${this.Email}</td>`;
          value += `<td>${this.Phone_Number}</td>`;
          value += `<td>${this.Role}</td>`;
          value += `<td>${this.Address}</td>`;

          value += `<td id="button1"> <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button>
          <button id="onDeleting"
             onClick="new MyClass().deleteData(this)">Delete</button> </td>`;
          value += "</tr>";
        });

        // Display result
        document.getElementById("Display").innerHTML = ` ${text} ${value}
 
         </table>    </div>
         `;
      });
    document.getElementById("addData").style.display = "Block";
  }

  //POST
  updateData<T>(tr: any) {
    var row: any = tr.parentElement.parentElement;
    this.Route="PATCH";
    row.setAttribute("contenteditable", true);
    row.children[0].setAttribute("contenteditable", false);
   // row.children[8].setAttribute("contenteditable", false);
    tr.parentElement.remove();
    if (!this.inEditing(row)) {
      row.className = "in-editing";
      row.setAttribute("old-data", row.innerHTML);
      this.createButton(row);
    }
  }
  //DELETE
  deleteData<T>(td: any) {
    if (confirm("Are you sure to delete this record ?")) {
      var row: any = td.parentElement.parentElement;
      var id = row.children[0].innerHTML;
      console.log(id);

      fetch(`/users/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          UId:id
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          res.json;
        })
        
     

      var tab = document.getElementById("list") as HTMLTableElement;
      tab.deleteRow(row.rowIndex);
      alert(`Data deleted with User Id: ${id} !!`);
    }
  }

  

  inEditing<T>(row: any) {
    return row.classList.contains(`in-editing`);
  }
  // Save and cancel buttons created
  createButton<T>(row: any) {
    const buttons: any = document.createElement("td");
    buttons.className = "button-toolbar";
    buttons.innerHTML = ` <button class="save-button">Save</button>  <button class="cancel-button">Cancel</button>  `;
    row.appendChild(buttons);
    buttons.setAttribute("contenteditable", false);
    const btnsave = buttons.querySelector(".save-button");
    const btncancel = buttons.querySelector(".cancel-button");
    btnsave.addEventListener("click", (ev: any) => {
      ev.stopPropagation();
      this.save(row);
    });

    btncancel.addEventListener("click", (ev: any) => {
      ev.stopPropagation();
      this.cancel(row);
    });
  }

  save<T>(row: any) {
   
    // Validations
    row.classList.remove("in-editing");
    let isCorrect: boolean = true;
    let firstname = /^[a-zA-Z+.]+$/;
    let letters = /^[A-Za-z]+$/;
    let phoneno = /^\d{10}$/;
    let idCheck = /^[0-9]+$/;
    let email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let address = /^[a-zA-Z0-9\s,'-]*$/;
    if(!row.children[0].innerHTML.match(idCheck)) {
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
      isCorrect=false;
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
      row.children[6].innerHTML != Role[0] &&
      row.children[6].innerHTML != Role[1] &&
      row.children[6].innerHTML != Role[2]
    ) {
      console.log(row.children[5].innerHTML);
      alert("Error! Please Enter valid Role");
      isCorrect = false;
    }

    if (!row.children[7].innerHTML.match(address)) {
      alert("Error! Please Enter valid Address");
      isCorrect = false;
    }

    if (isCorrect && this.Route=="POST") {
      

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
          Address: row.children[7].innerHTML,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
     
        .then((res) => {
         if(res.status!=404){
           this.removeButtons(row);
           row.setAttribute("contenteditable", false);
           alert("Data saved successfully!");
          
         }
         else{
           alert("Error in updating! User Id already exists");
         }
         
        });
       
    }

    if (isCorrect && this.Route=="PATCH") {
      

      //Now PATCH request using fetch API......

      fetch(`/users/${row.children[0].innerHTML}`, {
        method: "PATCH",
        body: JSON.stringify({
          First_Name: row.children[1].innerHTML,
          Middle_Name: row.children[2].innerHTML,
          Last_Name: row.children[3].innerHTML,
          Email: row.children[4].innerHTML,
          Phone_Number: row.children[5].innerHTML,
          Role: row.children[6].innerHTML,
          Address: row.children[7].innerHTML,
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          this.removeButtons(row);
          row.setAttribute("contenteditable", false);
           alert("Data saved successfully!");
          
         
        })
    }
  }
 /// removing save and cancel buttons
  removeButtons<T>(row: any) {
    const btn = row.querySelector(".button-toolbar");
    btn.remove();
    const btns = document.createElement("td");
    btns.innerHTML = ` <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button> <button id="onDeleting"
         onClick="new MyClass().deleteData(this)">Delete</button> `;
    row.appendChild(btns);
  }
  // cancel button functionality
  cancel<T>(row: any) {
    if(this.Route=="PATCH"){
    row.innerHTML = row.getAttribute("old-data");
    row.classList.remove("in-editing");
    const btns = document.createElement("td");
    btns.innerHTML = ` <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button> <button id="onDeleting"
         onClick="new MyClass().deleteData(this)">Delete</button> `;
    row.appendChild(btns);
    row.setAttribute("contenteditable", false);
      
  }
  else{
    let newrow=row;
    newrow.remove();
  }
}
}
