const express = require("express");
const app = express();
var pdf = require("html-pdf");
var options = {
    format: "A3",
    orientation: "landscape",
    margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
    },
};
app.use(express.json());
app.use(express.urlencoded());

const html = (Data) => {
    
    const totalTable = [];
    for (let i = 0; i < Math.ceil(Data.length /18); i++) {
        totalTable.push(i);
    }

   

    return `
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>DemoPdf</title>
        <style>
        table {
            width: 99%;
        }
        tr {
            text-align: center;
        }
        td {
            text-align: center;
            padding: 5px;
            border: 1px solid black;
            border-collapse: collapse;
        }
        table,
        tr,
        th {
            padding: 5px;
            border: 1px solid black;
            border-collapse: collapse;
        }
        h1 {
            
            font-family: Tahoma;
        }
        h2 {
            font-family: Tahoma;
        }
        th {
            font-family: Tahoma;
        }
        </style>
    </head>
        <body>
        <div>
        <caption>
        </br>
        <h2 style="text-align: center">Leading University</h2></br>
        <h5 style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;Attendence Sheet
        &nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;
        Program: 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;
        Batch: &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;
        Course code: &nbsp;&nbsp;
        &nbsp;&nbsp;
        &nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;
            &nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            Course Title: &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            Faculty Name: &nbsp;&nbsp;
            &nbsp;&nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;Semester: &nbsp;&nbsp;
            &nbsp;&nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;</h5></caption>
            
            </div>
            
            ${totalTable
                .map(
                    (value, index) =>
                        `
                        
                        </br>
                    <table style="page-break-after:always;page-break-inside:avoid" border="1" align="center" cellspacing="0">
            <thead>
        
                <tr>
                    <th>Student ID</td>
                    <th>Student Name</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th><th></th>
                    <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th>
                    </th><th></th><th></th><th></th><th></th>
                    <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                </tr>
            </thead>
          
            <tbody>
                ${Data.splice(0, 18)
                    .map(
                        (d, i) =>
                            `
                        <tr>
                            <td>${i + 1 + 20 * index}</td>
                            <td>${d.CourseCode}</td>
                            <td></td>
                            <td></td><td></td><td></td><td>
                            </td><td></td><td></td><td></td><td></td>
                            <td></td><td></td><td></td><td>
                            </td><td></td><td></td><td>
                            </td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                            <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
                        </tr>
                        `
                    )
                    .toString()
                    .split(",")
                    .join("")}
                    
            </tbody>
        </table>
        </br>
        </div>   
        `
            ).toString()
            .split(",")
            .join("")
            }
           
            
            
            </body>
                    </html>
       `;
};

app.post("/", async (req, res) => {
    pdf.create(html(req.body), options).toFile(
        "./Curriculum.pdf",
        (err, result) => {
            if (err) {
                res.status(404).json({ message: "Failed" });
            } else {
                res.status(200).json({ message: "Successfully created" });
            }
        }
    );
});

app.listen(3030, () => {
    console.log("Server started");
});