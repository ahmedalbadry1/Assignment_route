const express =require("express")
const mysql =require("mysql2/promise")
const app = express()
const port = 3000

let db;


async function connectDB() {
    try {
        db = mysql.createPool({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "",
            database: "Retail_Store",
            waitForConnections: true ,
            connectionLimit: 10
            
        });
        console.log("DB is connected successfully");
    } catch (err) {
        console.error("DB connection failed:", err.message);
    }
}

connectDB();

app.use(express.json())

app.post("/product",async(req,res,next)=>{

try{
    
    let {Product_name,Price,Stock_quantity,Supplier_id}=req.body
    let [result] = await db.execute(
        'INSERT INTO products (Product_name,Price,Stock_quantity,Supplier_id) VALUES(?,?,?,?)',
        [Product_name,Price,Stock_quantity,Supplier_id]
    )
    

    
    res.status(201).json({result})
}catch(err){

    if (err.errno === 1452) {
            return res.status(404).json({
                message: `Supplier with ID ${req.body.Supplier_id} does not exist`
            });
    
            
        }
        res.status(404).json({massage:"db eror" , err})

}})

app.get("/product",async(req,res,next)=>{

try{
    
   
    let [result] = await db.execute(
        `SELECT * FROM products`
    )
    

    
    res.status(200).json({result})
}catch(err){

   
        res.status(404).json({massage:"db eror" , err})

}})

app.get("/product/max-quantity",async(req,res,next)=>{
try{   let [result] =await db.execute(
        `SELECT Product_name, Stock_quantity 
FROM products 
WHERE Stock_quantity = (SELECT MAX(Stock_quantity) FROM products);`
    )
           
 res.status(200).json({
            result
            
        });
    }catch(err){
        next(err);
    }
})

app.get("/product/:id",async(req,res,next)=>{

try{
    
   let{id} = req.params
    let [result] = await db.execute(
        `SELECT * FROM products where Product_id =?`,[id]
    )
    
    if(result.length===0)
    {
       return res.status(404).json({massage:"no such proudct"})

    }
    
    res.status(200).json({result})
}catch(err){

   
        res.status(404).json({massage:"db eror" , err})

}})

app.put("/product/:id",async(req,res,next)=>{

try{
    
    let{id}=req.params
    let {Product_name,Price,Stock_quantity,Supplier_id}=req.body
    let [result] = await db.execute(

        `update products set 
        Product_name = ? ,
        price = ? ,
        Stock_quantity = ? ,
       Supplier_id = ? where  Product_id = ? `,[Product_name,Price,Stock_quantity,Supplier_id,id]
        
    )
    

    
    res.status(202).json({result})
}catch(err){

    if (err.errno === 1452) {
            return res.status(404).json({
                message: `Supplier with ID ${req.body.Supplier_id} does not exist`
            });
    
            
        }
    
        res.status(404).json({massage:"db eror" , err})

}})

app.delete("/product/:id",async(req,res,next)=>{

try{
    
    let{id}=req.params
    
    let [result] = await db.execute(

        `DELETE FROM products WHERE Product_id = ?;`,[id]
        
    )
    
    if(result.affectedRows===0)
    {
      return  res.status(404).json({massage:"no such proudct"})

    }

    
    res.status(202).json({result})
}catch(err){

    
    
        res.status(404).json({massage:"db eror" , err})

}})



app.post("/supplier",async(req,res,next)=>{
    
    try{
        
        let {Supplier_name,Contact_number}=req.body
        let [result] = await db.execute(
            'INSERT INTO suppliers (Supplier_name,Contact_number) VALUES(?,?)',
        [Supplier_name,Contact_number]
    )
    

    
    res.status(201).json({result})
}catch(err){

   
    
            
        
        res.status(404).json({massage:"db eror" , err})

}})

app.get("/suppliers",async(req,res,next)=>{

try{
    
   
    let [result] = await db.execute(
        `SELECT * FROM suppliers`
    )
    

    
    res.status(200).json({result})
}catch(err){

   
        res.status(404).json({massage:"db eror" , err})

}})


app.put("/supplier/:id",async(req,res,next)=>{

try{
    
    let{id}=req.params
    let {Supplier_name,Contact_number}=req.body
    let [result] = await db.execute(

        `update suppliers set 
        Supplier_name = ? ,
        Contact_number = ? 
         where  supplier_id = ? `,[Supplier_name,Contact_number,id]
        
    )
    
    if(result.affectedRows===0)
    {
       return res.status(404).json({massage:"no such supplier"})

    }

    
    res.status(202).json({result})
}catch(err){

   
    
        res.status(404).json({massage:"db eror" , err})

}})


app.delete("/supplier/:id",async(req,res,next)=>{

try{
    
    let{id}=req.params
    
    let [result] = await db.execute(

        `DELETE FROM suppliers WHERE supplier_id = ?;`,[id]
        
    )
    
    if(result.affectedRows===0)
    {
       return res.status(404).json({massage:"no such supplier"})

    }

    
    res.status(202).json({result})
}catch(err){

    
    
        res.status(404).json({massage:"db eror" , err})

}})


app.post("/sale",async(req,res,next)=>{

try{
    
    let {Product_id,Quantity_sold,Sale_date}=req.body
    let [result] = await db.execute(
        'INSERT INTO sales (Product_id,Quantity_sold,Sale_date) VALUES(?,?,?)',
        [Product_id,Quantity_sold,Sale_date]
    )
    

    
    res.status(201).json({result})
}catch(err){

   if (err.errno === 1452) {
            return res.status(404).json({
                message: `proudct with ID ${req.body.Product_id} does not exist`
            });
    
            
        }
    
            
        
        res.status(404).json({massage:"db eror" , err})

}})

app.get("/sales",async(req,res,next)=>{

try{
    
   
    let [result] = await db.execute(
        `SELECT * FROM sales`
    )
    

    
    res.status(200).json({result})
}catch(err){

   
        res.status(404).json({massage:"db eror" , err})

}})

app.get("/sale/:id",async(req,res,next)=>{

try{
    
   let{id} = req.params
    let [result] = await db.execute(
        `SELECT * FROM sales where product_id =?`,[id]
    )
    
    if(result.length===0)
    {
       return res.status(404).json({massage:"no such sales"})

    }
    
    res.status(200).json({result})
}catch(err){

   
        res.status(404).json({massage:"db eror" , err})

}})

app.post("/products/add-category",async(req,res,next)=>{

try{
    

    let [result] = await db.execute(
        'Alter table products add COLUMN Category varchar(100)'
        
    )
    

    
    res.status(201).json({result})
}catch (err) {
        
        if (err.errno === 1060) {
            return res.status(400).json({
                message: "Category column already exists in Products table"
            });
        }

        res.status(404).json({massage:"db eror" , err})
        
        next(err);
    }
});
app.delete("/products/delete-category",async(req,res,next)=>{

try{
    

    let [result] = await db.execute(
        'Alter table products drop COLUMN Category '
        
    )
    

    
    res.status(201).json({result})
}catch (err) {
        
        if (err.errno === 1091) {
            return res.status(400).json({
                message: "Category column doesnt exists in Products table"
            });
        }

        res.status(404).json({massage:"db eror" , err})
        
        next(err);
    }
});

app.put("/suppliers/numberSize", async (req, res, next) => {
    try {
        
        const [result] = await db.execute(
            'ALTER TABLE suppliers MODIFY COLUMN Contact_number VARCHAR(15)'
        );

        
        res.status(200).json({
            message: "Contact_number modified to VARCHAR(15) successfully",
            result
        });

    } catch (err) {
        
        next(err);
    }
});

app.put("/products/set-name-not-null", async (req, res, next) => {
    try {
        await db.execute(
            'ALTER TABLE products MODIFY COLUMN Product_name VARCHAR(255) NOT NULL'
        );

        res.status(200).json({ 
            message: "NOT NULL constraint added to ProductName successfully" 
        });
    } catch (err) {
        next(err);
    }
});

// 6 -

// a -INSERT INTO suppliers (Supplier_name, Contact_number) VALUES ('FreshFoods', '01001234567');

// b-INSERT INTO products (Product_name,price,Stock_quantity,Supplier_id) VALUES
// ('Milk',15.00,50,(SELECT Supplier_id FROM suppliers WHERE Supplier_name='FreshFood')),
// ('Bread',10.00,30,(SELECT Supplier_id FROM suppliers WHERE Supplier_name='FreshFood')),
// ('Eggs',20.00,40,(SELECT Supplier_id FROM suppliers WHERE Supplier_name='FreshFood'));



// c-INSERT INTO sales (Quantity_sold,Sale_date,Product_id) VALUES
//(2,'2025-05-20',(SELECT Product_id FROM products WHERE Product_name='Milk'))

app.put("/products/update-bread-price",async(req,res,next)=>{
try{   let [result] =await db.execute(
        `UPDATE products SET Price = 25 WHERE Product_name = 'Bread' `
    )
    if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product 'Bread' not found"
            });
            
           
}
 res.status(200).json({
            message: "Price of 'Bread' updated to 25.00 successfully",
            
        });
    }catch(err){
        next(err);
    }
})

app.delete("/products/delete-eggs",async(req,res,next)=>{
try{   let [result] =await db.execute(
        `delete from products where product_name = 'eggs'`
    )
    if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product 'eggs' not found"
            });
            
           
}
 res.status(200).json({
            message: "eggs is deleted",
            
        });
    }catch(err){
        next(err);
    }
})

app.get("/sales/total",async(req,res,next)=>{
try{   let [result] =await db.execute(
        `SELECT products.Product_id, products.Product_name, SUM(sales.Quantity_sold) AS total_quantity FROM products JOIN sales ON products.Product_id = sales.Product_id GROUP BY products.Product_id, products.Product_name;`
    )
           
 res.status(200).json({
            result
            
        });
    }catch(err){
        next(err);
    }
})


app.get("/suppliers/satrts-with-f",async(req,res,next)=>{
try{   let [result] =await db.execute(
        `SELECT supplier_name 
FROM suppliers 
WHERE SUPPLIER_name LIKE 'F%'`
    )
           
 res.status(200).json({
            result
            
        });
    }catch(err){
        next(err);
    }
})
app.get("/sales/never",async(req,res,next)=>{
try{   let [result] =await db.execute(
        `SELECT product_NAME FROM products WHERE NOT product_ID IN (SELECT product_ID FROM sales)`
    )
           
 res.status(200).json({
            result
            
        });
    }catch(err){
        next(err);
    }
})
app.get("/sales/all",async(req,res,next)=>{
try{   let [result] =await db.execute(
        `SELECT product_NAME , QUANTITY_SOLD , SALE_DATE FROM products JOIN sales ON products.Product_id = sales.Product_id;`
    )
           
 res.status(200).json({
            result
            
        });
    }catch(err){
        next(err);
    }
})

//14- 

// CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'password123';

// GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';

// FLUSH PRIVILEGES;

//15- 

// REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost';

// FLUSH PRIVILEGES;

//16-

// GRANT DELETE ON retail_store.sales TO 'store_manager'@'localhost';

// FLUSH PRIVILEGES;


app.use((err,req,res,next)=>{
    res.status(500).json({
        massage:"unexpected eror"
    })
})

app.listen(port ,()=>
{
    console.log(`connected on port ${port}`)
})