import readXlsxFile from 'read-excel-file/node';
import fs from 'fs';

// File path.
readXlsxFile(`${__dirname}/Worker_and_Temporary_Worker.xlsx`).then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.

//   console.log('Rows:', rows);

//   console.log('rows count:', rows.length);
})

// File path.
readXlsxFile(`${__dirname}/Worker_and_Temporary_Worker.xlsx`).then((rows) => {
    // Transpose the row-based array to a column-based array
    const columns = rows[0].map((_, i) => rows.map(row => row[i]));
  
    // Now, 'columns' is an array of columns
    // each column being an array of cells.
  
    // console.log('Columns:', columns);

    generateJSONFile(columns);

    const data = require('./excelData1.json'); // replace with your actual file path
// Find the index of 'Organisation Name' in the first row
// const columnIndex = data[0].indexOf('Organisation Name');

// Get the values for 'Organisation Name'
// const organisationNames = data[columnIndex];

// console.log(organisationNames);

const townCity = data.length;

console.log(townCity);

const arrayData = [
    [
      "Organisation Name",
      "McMullan Shellfish",
      "RSS EXPRESS LTD T/A  Ledbury Fuel Service Station",
      "(IECC Care) Independent Excel Care Consortium Limited",
      "*ABOUTCARE HASTINGS LTD",
      "???Â£ ESS LTD",
      "@ Architect UK Ltd",
      "@ Home Accommodation Services Ltd",
      "@ Home Accommodation Services Ltd",
      "@ Ur Eaz Ltd",
      "@@@ FILER LIMITED",
      "[AI] INFINITI LIMITED",
      "`Brunswick Stores Limited",
      "#ERROR_#NAME?",
      "0022IT Ltd",
      "0022Media Ltd",
      "0022Media Ltd",
      "003 Ltd",
      "0086 Ltd",
      "00Nation Limited"
    ],
    [
      "Town/City",
      "Ballymena",
      "Ledbury",
      "Colchester",
      "East Sussex",
      "Manchester",
      "West Horndon",
      "London",
      "London",
      "High Wycombe",
      "Bolton",
      "Croydon",
      "Leamington Spa",
      "Manchester",
      "Farnham",
      "Brighton",
      "Brighton",
      "Hounslow",
      "London",
      "London"
    ],
    [
      "County",
      "Co Antrim",
      null,
      null,
      null,
      null,
      "Essex",
      null,
      null,
      null,
      null,
      "England",
      "Warwickshire",
      null,
      null,
      null,
      null,
      null,
      null,
      "London"
    ],
    [
      "Type & Rating",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Temporary Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Temporary Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)",
      "Worker (A rating)"
    ],
    [
      "Route",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Creative Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Skilled Worker",
      "Creative Worker",
      "Skilled Worker",
      "Skilled Worker",
      "uhguggugygu"
    ]
  ];

let indexFoundAt = -1;

// Loop over each array
for (let i = 0; i < arrayData.length; i++) {
    // Check if the array contains 'Type & Rating'
    if (data[i].includes('Type & Rating')) {
        indexFoundAt = i;
        console.log(data[i]);
        break;
    }
}

if (indexFoundAt !== -1) {
    console.log(`'Type & Rating' found in array at index ${indexFoundAt}`);
    
} else {
    console.log("'Type & Rating' not found in any array");
}

  })

// Readable Stream.
readXlsxFile(fs.createReadStream(`${__dirname}/Worker_and_Temporary_Worker.xlsx`)).then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.
})

// Buffer.
readXlsxFile(Buffer.from(fs.readFileSync(`${__dirname}/Worker_and_Temporary_Worker.xlsx`))).then((rows) => {
  // `rows` is an array of rows
  // each row being an array of cells.
})

const generateJSONFile = async (data: any[]) => {
    try {
        if (fs.existsSync('excelData1.json')) {
            fs.rmSync('excelData1.json');
        }
        fs.writeFileSync('excelData1.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err)
    }
}
