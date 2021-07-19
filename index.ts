// Enums
 enum Role{
    SuperAdmin,
    Admin,
    Subscriber
}
   // json data and enums are used in it
    let Users:any= [{
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

    ]
// This is interface of CRUD Actions
interface crud<T>{
   createData<T>(),
   Read<T>(),
   updateData<T>(tr:any),
   deleteData<T>(td:any)
}
// Model class using generics
class Model<T,U> {
    First_Name:T;
    Middle_Name:T;
    Last_Name:T;
    Email:T;
    Phone_Number:U;
    Role:Role;
    Address:T;
}

// extending model class and implementing interface
​ class MyClass extends Model<String,number> implements crud<any>{
    @FormatDate(new Date())// calling Decorator Function
    
    // create function with no return type
    createData<T>():void{
        let addRow:any= document.getElementById("list") as HTMLTableElement;//list is an id of table
        let newRow =addRow.insertRow();
        let newCloumn:any;
        for(let value in Users[0])
         newCloumn=newRow.insertCell();
         let buttons = document.createElement("btn"); 
         buttons.innerHTML =`<button id ="onediting" onClick ="new MyClass.updateData(this)">Edit</button>
         <button id = "ondeleting" onclick ="new MyClass.deleteData(this)">Delete</button>`;
         newRow.appendChild(buttons);
         this.updateData(buttons.firstChild);
    };
    // read function is used for displaying data
    Read<T>(){
       document.getElementById("button").innerHTML=("Refresh"); // load will convert into refresh
       let design=`<div class="tabledata"><table table-xl align="center" id="list"><tr>`;
​
       for(let key in Users[0]){
            design+=`<th>${key}</th>`;
       }
​
       design+="<th></th></tr>";
       var tablerow="<tr>";
       
       for(let i in Object.keys(Users)){
​
               this.First_Name=Users[i]["First_Name"];
               this.Middle_Name=Users[i]["Middle_Name"];
               this.Last_Name=Users[i]["Last_Name"];
               this.Email=Users[i]["Email"];
               this.Phone_Number=Users[i]["Phone_Number"];
               this.Role=Users[i]["Role"];;
               this.Address=Users[i]["Address"];
               
               tablerow+=`<td>${this.First_Name}</td>`;
               tablerow+=`<td>${this.Middle_Name}</td>`;
               tablerow+=`<td>${this.Last_Name}</td>`;
               tablerow+=`<td>${this.Email}</td>`;
               tablerow+=`<td>${this.Phone_Number}</td>`;
               tablerow+=`<td>${this.Role}</td>`;
               tablerow+=`<td>${this.Address}</td>`;
​
           tablerow+=`<td id="button1"> <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button>
            <button id="onDeleting"
               onClick="new MyClass().deleteData(this)">Delete</button> </td>`;
               tablerow+="</tr>";
       }
       // generatedata id is made in html file
       document.getElementById("GenerateData").innerHTML=` ${design} ${tablerow} </table></div>`;
   
     
    };
    //update function 
    updateData<T>(tr:any){
        let row:any=tr.parentElement.parentElement; 
       row.setAttribute('contenteditable',true);
       row.children[Object.keys(Users[0]).length].setAttribute('contenteditable',false);
       let tabledata:any=tr.parentElement.remove();
       if(!this.inEditing(row)){
       row.className='in-editing';
       row.setAttribute('old-data',row.innerHTML);
       this.createButton(row);
   }
    };
    // inEditing function is made for update function
    inEditing<T>(row:any){
        return row.classList.contains(`in-editing`);
    }
    // save and cancel button has been created 
    createButton<T>(row:any){
        const buttons:any=document.createElement('td');
        buttons.className="button-toolbar";
        buttons.innerHTML= ` <button class="save-button" id="save">Save</button>  <button class="cancel-button" id="cancel">Cancel</button>  `;
        row.appendChild(buttons);
        buttons.setAttribute('contenteditable',false);
    
    
        const buttonsave=buttons.querySelector('.save-button');
        const buttoncancel=buttons.querySelector('.cancel-button');

        buttonsave.addEventListener('click',(event:any)=>{
            event.stopPropagation();//
            this.save(row);
        });
    
        buttoncancel.addEventListener('click',(event:any)=>{
            event.stopPropagation();
            this.cancel(row);
        });
    }
    //save function for saving the editable data
 ​   save<T>(row:any){
    row.classList.remove('in-editing');
    this.removeButtons(row);
    row.setAttribute('contenteditable',false);
}
// cancel function for going back to edit button
     cancel<T>(row:any){
    row.innerHTML=row.getAttribute('old-data'); // coming from update function
    row.classList.remove('in-editing');

    const buttons=document.createElement('td');
    buttons.innerHTML=` <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button> <button id="onDeleting"
    onClick="new MyClass().deleteData(this)">Delete</button> `;
    row.appendChild(buttons);
    row.setAttribute('contenteditable',false);
}

​// After clicking on save button it will remove save and cancel button and edit and delete buttons will be displayed again.
removeButtons<T>(row:any){
    const btn=row.querySelector('.button-toolbar'); // class name is coming from 155 line
    btn.remove();

    const btns=document.createElement('td');
    btns.innerHTML=` <button id="onEditing" onClick="new MyClass().updateData(this)">Edit</button> <button id="onDeleting"
    onClick="new MyClass().deleteData(this)">Delete</button> `;
    row.appendChild(btns);
}
​
// delete function for deleting the row
    deleteData<T>(td:any):void{
        if(confirm("Are you sure to delete this entry ?")){
            let row:any=td.parentElement.parentElement;
            let data=document.getElementById("list") as HTMLTableElement; // list id was created for table
            data.deleteRow(row.rowIndex);
           
        }
}
    
}

// Decorator Factory (date and time formatter)
function FormatDate(date:any):any{
    return function(target:any,name:string,descriptor:PropertyDescriptor){
     const datetime=document.getElementById("datetime") as HTMLInputElement;
     setInterval(function() {
        datetime.innerHTML=new Date().toLocaleString();
    },1000);
}
}

// load button function 
function loaddata<T>(){
    let object = new MyClass();
    object.Read();
    document.getElementById("adddata").style.display="Block";
}





