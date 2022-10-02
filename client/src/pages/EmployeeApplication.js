import React from "react";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import "../styles/form.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";

export default function EmployeeApplication() {
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState("female");
	const [email, setEmail] = useState("");
	const [country, setCountry] = useState("");
	const [position, setPosition] = useState("");
	const [salary, setSalary] = useState(0);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);

	const handleChange = (event) => {
		setGender(event.target.value);
		console.log(event.target.value);
	};

	const addEmployee = () => {
		if (
			first === "" ||
			last === "" ||
			age <= 16 ||
			email === "" ||
			country === "" ||
			position === "" ||
			salary <= 0
		) {
			setError(true);
			console.log("error");
		} else {
			Axios.post("http://localhost:3001/create", {
				first: first,
				last: last,
				age: age,
				gender: gender,
				email: email,
				country: country,
				position: position,
				salary: salary,
			}).then(() => {
				/*
			setEmployeeList([
				...employeeList,
				{
					first: first,
					last: last,
					age: age,
					gender: gender,
					email: email,
					country: country,
					position: position,
					salary: salary,
				},
			]);*/
				setSuccess(true);
				console.log("Succesfully added an employee to database");
			});
		}
	};
	return (
		<div className="employee-application">
			<div className="form">
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					noValidate
					autoComplete="off"
				>
					<div className="inputs">
						<TextField
							required
							id="outlined-required"
							label="First Name"
							onChange={(event) => {
								setFirst(event.target.value);
							}}
						/>
						<TextField
							required
							id="outlined-required"
							label="Last Name"
							onChange={(event) => {
								setLast(event.target.value);
							}}
						/>
						<TextField
							required
							id="outlined-number"
							label="Age"
							type="number"
							onChange={(event) => {
								setAge(event.target.value);
							}}
						/>
						<FormControl>
							<FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
							<RadioGroup
								row
								aria-labelledby="demo-controlled-radio-buttons-group"
								name="controlled-radio-buttons-group"
								value={gender}
								onChange={handleChange}
							>
								<FormControlLabel value="female" control={<Radio />} label="Female" />
								<FormControlLabel value="male" control={<Radio />} label="Male" />
								<FormControlLabel value="other" control={<Radio />} label="Other" />
							</RadioGroup>
						</FormControl>
						<TextField
							required
							id="outlined-required"
							label="Email"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
						/>
						<TextField
							required
							id="outlined-required"
							label="Country"
							onChange={(event) => {
								setCountry(event.target.value);
							}}
						/>
						<TextField
							required
							id="outlined-required"
							label="Position"
							onChange={(event) => {
								setPosition(event.target.value);
							}}
						/>
						<TextField
							required
							id="outlined-required"
							label="Salary"
							type="number"
							onChange={(event) => {
								setSalary(event.target.value);
							}}
						/>
					</div>
					<div className="submit">
						<Stack direction="row" spacing={2}>
							<Button variant="contained" endIcon={<SendIcon />} onClick={addEmployee}>
								Submit
							</Button>
						</Stack>
					</div>
				</Box>
				<div className="error-success">
					{error === true && (
						<Box sx={{ width: "100%" }}>
							<Collapse in={error}>
								<Alert
									action={
										<IconButton
											aria-label="close"
											color="inherit"
											size="small"
											onClick={() => {
												setError(false);
											}}
										>
											<CloseIcon fontSize="inherit" />
										</IconButton>
									}
									sx={{ mb: 2 }}
									severity="error"
								>
									This is an error alert - one or more inputs blank!
								</Alert>
							</Collapse>
						</Box>
					)}
					{success === true && (
						<Box sx={{ width: "100%" }}>
							<Collapse in={success}>
								<Alert
									action={
										<IconButton
											aria-label="close"
											color="inherit"
											size="small"
											onClick={() => {
												setSuccess(false);
											}}
										>
											<CloseIcon fontSize="inherit" />
										</IconButton>
									}
									sx={{ mb: 2 }}
								>
									Employee succesfully added to database!
								</Alert>
							</Collapse>
						</Box>
					)}
				</div>
			</div>
		</div>
	);
}
