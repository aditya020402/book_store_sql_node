import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"aditya",
    database:"books",
});

app.get("/",(req,res)=>{
    const q = "select * from books";
    db.query(q,(err,data)=>{
        if(err){
            console.log(err);
            return res.json(err);
        }
        return res.json(res);
    })
})


app.post("/books",(req,res)=>{
    const q = "insert into books (`title`,`desc`,`price`,`cover`) values (?)";
    const values = [req.body.title,req.body.desc,req.body.price,req.body.cover];
    db.query(q,[values],(err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "delete from books where id = ?";
    db.query(q,[bookId],(err,data)=>{
        if(err){
            return res.send(err);
        }
        return res.json(data);
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "update books set `title` = ?,`desc` = ?,`price`=?,`cover`=?, where id = ?";
    const values = [req.body.title,req.body.desc,req.body.price,req.body.cover];
    db.query(q,[values],(err,data)=>{
        if(err) return res.send(err);
        return res.json(data);
    })
})


app.listen(8800,()=>{
    console.log("connected to backend");
})