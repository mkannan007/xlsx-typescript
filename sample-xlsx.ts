import xlsx from 'xlsx';
import fs from 'fs';

const convertExcelFileToJsonUsingXlsx = async () => {
    // Read the file using pathname
    const file = xlsx.readFile('Worker_and_Temporary_Worker.xlsx');
    // Grab the sheet info from the file
    const sheetNames = file.SheetNames;
    const totalSheets = sheetNames.length;

    console.log('Total sheets:', totalSheets);
    console.log('Sheet names:', sheetNames);

    // Variable to store our data 
    let parsedData: any[] = [];
    // Loop through sheets
    for (let i = 0; i < totalSheets; i++) {
        // Convert to json using xlsx
        const tempData: any = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
        // Skip header row which is the colum names
        tempData.shift();
        // Add the sheet's json to our data array
        parsedData.push(...tempData);
    }

    console.log('Total data:', parsedData);
 // call a function to save the data in a json file
 await generateJSONFile(parsedData);
};

const generateJSONFile = async (data: any[]) => {
    try {
        if (fs.existsSync('excelData.json')) {
            fs.rmSync('excelData.json');
        }
        fs.writeFileSync('excelData.json', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err)
    }
}

convertExcelFileToJsonUsingXlsx();