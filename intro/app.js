const { response } = require('express');
const express= require('express');
const { request } = require('http');
const fs = require('fs');

const cors = require('cors');
const { fstat } = require('fs');

const app = express();
app.use(cors());

const port = 8000;

 let categories = JSON.parse(fs.readFileSync("./MenuData.json","utf-8"));

 app.get('/categories',(req,res)=>{
        res.json(categories);
    })
 let products = JSON.parse(fs.readFileSync("./MOCK_DATA.json","utf-8"));

 app.get('/products',(req,res)=>{
    let {pageSize, page} = req.query;
    pageSize = Number(pageSize) || 10;
    page = Number(page) || 1;
    let start, end;

    start = (page-1)*pageSize;

    const items = products.slice(start,end);
    res.json({
        total:products.length,
        totalPages: Math.ceil(products.length/pageSize),
        page,
        pageSize,
        items,
    });

    })

// app.get('/categories/:id', (req, res)=>{
//     const {id}=req.params;
//     let category=null;
//     for(const row of categories){
//         if(id==row.id){
//             category=row;
//             break;
//         }
//     }
// })


app.get('/a',(request,response)=>{
    response.json(100)
})

app.listen(port,()=>{
    console.log('http://localhost:'+port);
});