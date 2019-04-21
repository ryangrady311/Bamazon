DROP DATABASE IF EXISTS Bamazon;

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price INT,
stock_quantity INT,
PRIMARY KEY (id)
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("sunglasses",
"eyewear",
30,
100
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("switch",
"nintendo",
300,
50
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("scrapbook",
"art",
10,
150
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("toothbrush",
"hygene",
5,
1000
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("peeps",
"food",
1,
10000
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("Zelda_Games",
"Nintendo",
60,
15
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("oreos",
"food",
5,
1000
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("cookbook",
"book",
20,
100
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("airzooka",
"toys",
20,
100
);

INSERT INTO products
(product_name, 
department_name, 
price,
stock_quantity
)

VALUES
("CD",
"music",
20,
250
);
