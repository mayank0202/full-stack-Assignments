const express=require('express');
const fs=require('fs');
const router=express.Router();
const pg=require("./database");


// get data from database
router.get('/',async (req,res)=>{ 
  const data = await pg.query('SELECT * FROM  users order by uid ASC;');
 // console.log(data.fields[0].first_name);
  res.json(data.rows);
});
// create data in database
router.post('/',async (req,res)=>{
    // let found:number=0;
    const user=req.body;
    const queryResult=await pg.query(`INSERT INTO users(UId,First_Name,Middle_Name,Last_Name,Email,Phone_Number,Role,Address) VALUES (${user.UId},'${user.First_Name}', '${user.Middle_Name}','${user.Last_Name}','${user.Email}','${user.Phone_Number}','${user.Role}','${user.Address}');`
    ,(err,result)=>{
        if(err){
            res.status(404).send("Cannot update, User Id already exists");
        }
        else{
            res.status(200).send(`User Added with ID:${result.insertId}`);
        }
    });

    
});
// delete data from database
router.delete('/:id',async (req,res)=>{
    const { id } = req.params;
    const query=await pg.query(`DELETE FROM users WHERE UId=${id};`) 
    //res.send(myData);
});
// update data from database
router.patch('/:id',async (req,res)=>{
    const { id } = req.params;
    

    const user = req.body;
   
    const queryResult=await pg.query(`UPDATE users SET First_Name='${user.First_Name}',Middle_Name='${user.Middle_Name}',Last_Name='${user.Last_Name}',Email='${user.Email}',Phone_Number='${user.Phone_Number}',Role='${user.Role}',Address='${user.Address}' WHERE UId=${id}`);
    res.send(`User modified with id:${id}`);
  
    
}); 


export default router;