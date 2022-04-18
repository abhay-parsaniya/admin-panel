const express = require("express");
const app = express();
const router = express.Router();
const mysql = require("mysql");
const cors = require('cors');
const e = require("express");
const PORT = 5000;

app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "~qT4hDB6Ge+aFXe",
  database: "form-data",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting: " + err);
    return;
  }
  console.log("Connection Successful !!");
});

app.use(express.json());

app.post("/datasubmit", (req, res) => {

    // console.log("29", req.body);

    const {formData} = req.body;

    // console.log("33",formData);

    for (let key in formData) {
        if (formData[key] === "") {
          // console.log(key);
          return res.status(422).json({ error: "Please fill all the fields !!" });
        }
    }

    db.query("SELECT email FROM user_details WHERE email = ?", [formData.email], (err, result1) => {
        if(err)
        {
            console.log(err);
        }
        else{
            if(result1.length > 0)
            {
                return res.json({error: "Email Id already exist"});
            }
            else{
                db.query("INSERT INTO user_details (first_name, last_name, gender, email, phone_number, password) values (?, ?, ?, ?, ?, ?)", [formData.firstName, formData.lastName, formData.gender, formData.email, formData.phone_number, formData.password], (err, result2) => {
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        db.query("SELECT iduser_details FROM user_details WHERE email = ?", [formData.email], (err, result3) => {
                            if(err)
                            {
                                console.log(err);
                            }
                            else{
                                // console.log(result3[0]);
                                // const {iduser_details} = result3[0];
                                formData.educationArray.map((item, index) => {
                                    db.query("INSERT INTO education_details (institute_name, cgpa, course, start_date, end_date, userid) values (?, ?, ?, ?, ?, ?)", [item.InstituteName, item.CGPA, item.Course, item.Start_Date, item.End_Date, result3[0].iduser_details], (err, result4) => {
                                        if(err)
                                        {
                                            console.log(err);
                                        }
                                        else{
                                            return res.json({msg: "Register Successful !!"});
                                        }
                                    })
                                });                      
                            }
                        })
                    }
                })
            }
        }
    }) 
});

app.post('/userlogin', (req, res) => {
    const {formData} = req.body;
    // console.log(formData);
    db.query("SELECT email FROM user_details WHERE email = ?", [formData.email], (err, result1) => {
        if(err)
        {
            console.log(err);
        }
        else{
            if(result1.length = 0)
            {
                return res.json({error: "Invalid Email or Password"});
            }
            else{
                db.query("SELECT * FROM user_details WHERE email = ?", [formData.email], (err, result2) => {
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        console.log(result2);
                        if(formData.password === result2[0].password)
                        {
                            const {iduser_details, first_name, last_name, email} = result2[0];
                            return res.json({user: {iduser_details, first_name, last_name, email}});
                            // return res.json({msg: "Login Successfull !!"});
                        }
                        else{
                            return res.json({error: "Invalid Email or Password"});
                        }
                    }
                })
            }
        }
    })
});

app.get('/getuserdetails', (req, res) => {
    const {email} = req.headers;
    
    db.query("SELECT * FROM user_details WHERE email = ?", [email], (err, result) => {
        if(err)
        {
            console.log(err);
        }
        else{
            return res.json({result});
        }
    })
})

app.get('/geteducationdetails', (req, res) => {
    const {id} = req.headers;

    db.query("SELECT user_details.first_name, user_details.last_name, education_details.* FROM user_details INNER JOIN education_details ON (user_details.iduser_details = ?) = (education_details.userid = ?)", [id, id], (err, result) => {
        if(err)
        {
            console.log(err);
        }
        else{
            // console.log(result);
            return res.json({result});
        }
    })
})

app.listen(PORT, () => {
  console.log("Listning at Port no.", PORT);
});
