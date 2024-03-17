import express from "express"
import mysql from "mysql"
import cors from "cors"
const app =express()
const db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Cornea07!",
    database:"cs230"
})
//ALTER USER 'root'@'localhost' INDENTIFIED WITH mysql_native_password BY 'Cornea07!';
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("plz work")
})
app.get("/fish",(req,res)=>{
    const q = "SELECT * FROM cs230.fish;"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/fish",(req,res)=>{
    const q = "INSERT INTO fish (`fish`, `equpiment`,`location`,`picture` ) VALUES (?)";
    const values = [
        req.body.fish,
        req.body.equpiment,
        req.body.location,
        req.body.picture,
    ];
    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("created succesfully ");
    });
})
app.delete("/fish/:id", (req,res)=>{
    const bookId=req.params.id
    const q= "DELETE FROM fish WHERE id =?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted")
    })
})
app.put("/fish/:id", (req,res)=>{
    const bookId=req.params.id
    const q= "UPDATE fish SET `fish`=?, `equpiment`=?, `location`=?, `picture`=? WHERE id =?";
    const values = [
        req.body.fish,
        req.body.equpiment,
        req.body.location,
        req.body.picture,
    ];
    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been Updated")
    })
})
app.listen(8800,()=>{
    console.log("YIPPPEE")
})