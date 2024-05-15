import xlsx from 'node-xlsx';
import fs from 'fs';

// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/Worker_and_Temporary_Worker.xlsx`);

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/Worker_and_Temporary_Worker.xlsx`));


// Loop over each worksheet
workSheetsFromBuffer.forEach((sheet) => {
    console.log(`Sheet: ${sheet.name}`);
    // Loop over each row in the worksheet

    console.log('Sheet data:', sheet.data);
    // sheet.data.forEach((row, rowIndex) => {
    //     console.log(`Row ${rowIndex + 1}: ${row.join(', ')}`);
    // });
});