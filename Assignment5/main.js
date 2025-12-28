const express = require("express");
const mysql2 = require("mysql2");
const app = express();
port = 3000;

const db = mysql2.createConnection({
  host: "127.0.0.1",
  port: 3306,
  database: "retail_store",
  user: "root",
  password: "",
});

db.connect((erroror) => {
  if (erroror) {
    console.log("fail to connect on DB");
  } else {
    console.log("DB connected");
  }
});

app.post("/tables/create", (req, res, next) => {
  const sqlProducts = `Create table Products( ProductID INT PRIMARY KEY AUTO_INCREMENT , ProductName varchar(200) , price DECIMAL , StockQuantity INT , P_SupplierID INT ,  CONSTRAINT fk_Suppliers  FOREIGN KEY (P_SupplierID)REFERENCES Suppliers(SuppliersID) ON DELETE CASCADE ON UPDATE CASCADE); `;
  const sqlSuppliers = `Create table Suppliers( SuppliersID INT PRIMARY KEY AUTO_INCREMENT , SupplierName varchar(200) , ContactNumber varchar(200) ); `;
  const sqlSales = `Create table Sales( SalesID INT PRIMARY KEY AUTO_INCREMENT , S_ProductID INT , QuantitySold  INT , SaleDate DATE ,  CONSTRAINT fk_Sales  FOREIGN KEY (S_ProductID)REFERENCES Products(ProductID) ON DELETE CASCADE ON UPDATE CASCADE); `;

  db.execute(sqlSuppliers, (error) => {
    if (error) {
      return res.status(500).json({ message: "Suppliers error", error });
    }

    db.execute(sqlProducts, (error) => {
      if (error) {
        return res.status(500).json({ message: "Products error", error });
      }

      db.execute(sqlSales, (error) => {
        if (error) {
          return res.status(500).json({ message: "Sales error", error });
        }

        res.status(201).json({ message: "Tables created successfully" });
      });
    });
  });
});

app.patch("/tables/addcolumn/Products", (req, res, next) => {
  const sqlProducts = `Alter table Products add Category varchar(200)`;

  db.execute(sqlProducts, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }
    return res.status(200).json({ message: "column added successfully", data });
  });
});

app.delete("/tables/deletecolumn/Products", (req, res, next) => {
  const sqlProducts = `Alter table Products drop column Category `;

  db.execute(sqlProducts, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }
    return res
      .status(200)
      .json({ message: "column deleted successfully", data });
  });
});

app.patch("/tables/updatecolumn/suppliers", (req, res, next) => {
  const sqlProducts = `ALTER TABLE Suppliers MODIFY  ContactNumber VARCHAR (15);`;

  db.execute(sqlProducts, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }
    return res
      .status(200)
      .json({ message: "column updated successfully", data });
  });
});

app.patch("/tables/updatecolumn/Products", (req, res, next) => {
  const sqlProducts = `ALTER TABLE Products  CHANGE ProductName  ProductName VARCHAR(200) NOT NULL;`;

  db.execute(sqlProducts, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }
    return res
      .status(200)
      .json({ message: "column  updated successfully", data });
  });
});

app.post("/tables/insert/Suppliers", (req, res, next) => {
  const sqlinsert = `INSERT INTO Suppliers( SupplierName , ContactNumber ) VALUES ('FreshFoods','01001234567') ;`;

  db.execute(sqlinsert, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }
    return res.status(201).json({ message: "done", data });
  });
});

app.post("/tables/insert/Products", (req, res, next) => {
  const sqlquery = `select SuppliersID from Suppliers where SupplierName='FreshFoods' ;`;

  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }
    const { SuppliersID } = data[0];
    console.log(SuppliersID);
    const sqlinsert = `INSERT INTO Products(ProductName, price,StockQuantity,P_SupplierID) VALUES
                     ('Milk',15.00,50,${SuppliersID}) ,
                    ('Bread',10.00,30,${SuppliersID}) ,
                    ('Eggs',20.00,40,${SuppliersID}) ;`;
    db.execute(sqlinsert, [], (error, data, fields) => {
      if (error) {
        return res.status(500).json({ message: "query error", error });
      }
      return res.status(201).json({ message: "done", data });
    });
  });
});

app.post("/tables/insert/Sales", (req, res, next) => {
  const sqlquery = `select ProductID from Products where ProductName='Milk' ;`;

  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }
    const { ProductID } = data[0];
    console.log(ProductID);
    const sqlinsert = `INSERT INTO Sales (S_ProductID, QuantitySold ,SaleDate) VALUES
                     (${ProductID},2,'2025-05-20') ;`;
    db.execute(sqlinsert, [], (error, data, fields) => {
      if (error) {
        return res.status(500).json({ message: "query error", error });
      }
      return res.status(201).json({ message: "done", data });
    });
  });
});

app.patch("/tables/update/product", (req, res, next) => {
  const sqlquery = `UPDATE Products SET price =25.00 where  ProductName ='Bread' ;`;

  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }

    return res.status(200).json({ message: "done", data });
  });
});

app.patch("/tables/delete/product", (req, res, next) => {
  const sqlquery = `DELETE FROM  Products  where  ProductName ='Eggs' ;`;

  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }

    return res.status(200).json({ message: "done", data });
  });
});

app.get("/tables/retrieve/sales", (req, res, next) => {
  const sqlquery = `SELECT S_ProductID,SUM(QuantitySold) AS TotalQuantitySold FROM Sales GROUP BY S_ProductID   ;`;

  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }

    return res.status(200).json({ message: "done", data });
  });
});
app.get("/tables/retrieve/Producs", (req, res, next) => {
  const sqlquery = `SELECT max(StockQuantity) AS HighestStock FROM Products ;`;

  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }

    return res.status(200).json({ message: "done", data });
  });
});

app.get("/tables/retrieve/Suppliers", (req, res, next) => {
  const sqlquery = `SELECT * FROM Suppliers where  SupplierName LIKE 'F%'   ;`;

  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }

    return res.status(200).json({ message: "done", data });
  });
});

app.get("/tables/retrieve/products/neversolid", (req, res, next) => {
  const sqlquery = `select p.* FROM Products AS p LEFT JOIN Sales AS s ON p.ProductID = s.S_ProductID WHERE s.S_ProductID IS NULL;`;
  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }

    return res.status(200).json({ message: "done", data });
  });
});
app.get("/tables/retrieve/sjoinp", (req, res, next) => {
  const sqlquery = `SELECT s.SalesID,   p.ProductName, s.QuantitySold,  s.SaleDate FROM Sales AS s JOIN Products AS p ON s.S_ProductID = p.ProductID;`;
  db.execute(sqlquery, [], (error, data, fields) => {
    if (error) {
      return res.status(500).json({ message: "query error", error });
    }

    return res.status(200).json({ message: "done", data });
  });
});

app.all("{/*du}", (req, res, next) => {
  return res.json("invalid routing");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
