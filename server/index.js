const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "employeeManagement",
});

app.post("/create", (req, res) => {
	const first = req.body.first;
	const last = req.body.last;
	const age = req.body.age;
	const gender = req.body.gender;
	const email = req.body.email;
	const country = req.body.country;
	const position = req.body.position;
	const salary = req.body.salary;
	db.query(
		"INSERT INTO employees (first, last, age, gender, email, country, position, salary) VALUES (?,?,?,?,?,?,?,?)",
		[first, last, age, gender, email, country, position, salary],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("values inserted");
			}
		}
	);
});

app.get("/employees", (req, res) => {
	db.query("SELECT * FROM employees", (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.put("/update", (req, res) => {
	const id = req.body.id;
	const salary = req.body.salary;
	db.query("UPDATE employees SET salary = ? WHERE id = ?", [salary, id], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.delete("/delete/:id", (req, res) => {
	const id = req.params.id;
	db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
});

app.listen(3001, () => {
	console.log("yay, your server is running on port 3001");
});
