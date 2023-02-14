import mysql from "mysql2";

// const connectionString = "mysql://root:a5yDZMmbjxkX5MjIEWlQ@containers-us-west-87.railway.app:6753/railway";

const connection = mysql.createConnection({
	host: "containers-us-west-111.railway.app",
	user: "root",
	password: "OcTgUWBlVX1RXHBJHaQD",
	port: 7021,
	multipleStatements: true,
	database: "railway",
});

// const connection = mysql.createConnection({
// 	host: "sql302.epizy.com",
// 	user: "epiz_33561719",
// 	password: "CxaWfaPlb9V",
// 	port: 3306,
// 	multipleStatements: true,
// 	database: "epiz_33561719_ada",
// });

// const connection = mysql.createConnection({
// 	host: "sql8.freesqldatabase.com",
// 	user: "sql8597149",
// 	password: "jz2xN6SuNA",
// 	port: 7021,
// 	multipleStatements: true,
// 	database: "sql8597149",
// });

// const connection = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "sasql",
// 	port: 3306,
// 	multipleStatements: true,
// 	database: "adamawa",
// });

connection.connect(function(err) {
	if (err) {
		console.error("Error connecting due to: ", err);
		return;
	}
});

export default connection;
