var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "UABootcamp",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  //Print the table
 
  displayTable();
  
//Wait for the SQL table to load then inquire user

  setTimeout(promptUser, 1000);

  
}

function displayTable() {

    connection.query("SELECT * FROM products", function(err, res) {
        console.log("availiable products");
        console.log("ID | Name | Department | Price | Qty in Stock" ) ;   
        for (var i=0;i<res.length;i++){

            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity ) ;

            
        }
     console.log("");
      
      });

}

function promptUser() {

    inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "What would you like to buy? (Use product ID)",
     
    })
    .then(function(answer1) {

    if (isNaN(parseInt(answer1.action))){
        console.log("That's not a valid Response, try entering an item ID next time");
        console.log("");
        promptUser();

    }
    else{

        inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "How many units of this product would you like to buy?",
     
    })
    .then(function(answer2) {
        if (isNaN(parseInt(answer2.action))){
            console.log("That's not a valid Response, the quantity has to be a number");
            console.log("");
            promptUser();
    
        }
        else{

        checkIfExists(answer1.action,answer2.action);

        }


    });
    
    }

    });
}


function checkIfExists(sqlID, itemQuantity) {

  
    var query = "SELECT EXISTS (SELECT product_name,stock_quantity FROM products WHERE ?)";
    connection.query(query, { id: sqlID }, function(err, queryRes) {
      if (err) throw err;

  

     var str = JSON.stringify(queryRes[0]);
    str = str.substring(str.indexOf(":") + 1);
     str = str.replace("}","");
    
    
    var existingID = parseInt(str);
     

    if (existingID == 1) {
        itemSearch(sqlID, itemQuantity);  

    }
    else{
    console.log("Not a valid item id, try entering a valid ID next time");
    console.log("");
    promptUser();
    }           

    });
  
}

function itemSearch(sqlID, itemQuantity) {

  
      var query = "SELECT product_name,stock_quantity FROM products WHERE ?";
      connection.query(query, { id: sqlID }, function(err, queryRes) {
        if (err) throw err;

    

    if (itemQuantity == 0){
        console.log("Thanks for looking, try to buy something sometime");
        var itemsRemaining = queryRes[0].stock_quantity ;

    }
    else if (queryRes[0].stock_quantity < itemQuantity){
        console.log("There aren't enough "+ queryRes[0].product_name+ "s in stock, come back when we have more");
        var itemsRemaining = queryRes[0].stock_quantity ;

    }
    else if (itemQuantity == 1){
      console.log("congrats!  You have aquired 1 new "+queryRes[0].product_name);
      var itemsRemaining = queryRes[0].stock_quantity - itemQuantity;
       
    }
    else if (itemQuantity>1){
    console.log("congrats!  You have aquired " + itemQuantity+ " new "+queryRes[0].product_name + "s");
    var itemsRemaining = queryRes[0].stock_quantity - itemQuantity;

    }

    

    updateTable(sqlID, itemsRemaining);                 

      });
    
}

function updateTable(sqlID, itemsRemaining) {


 var query = "UPDATE products SET stock_quantity = ? WHERE id = ?";
 connection.query(query, [ itemsRemaining, sqlID ], function(err, queryRes) {

    
   console.log("");
    
   setTimeout(runSearch, 2000);

});
}

