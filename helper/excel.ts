import readXlsxFile from "read-excel-file/node";
import fs from "fs";

const generateColumnwiseJSONFile = async (data: any [], jsonFile: string) => {
  try {
    if (fs.existsSync(jsonFile)) {
      fs.rmSync(jsonFile);
    }
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
};

const readJsonData = async (jsonFile: string) => {
  JSON.parse(
  fs.readFileSync(jsonFile, { encoding: "utf8" })
)
};

export const readExcelFile = async (
    filePath: string,
    jsonFile: string,
    columnName: string
  ): Promise<string[]> => {
    return await readXlsxFile(filePath).then((rows) => {
        const columns = rows[0].map((_, i) => rows.map((row) => row[i]));
        generateColumnwiseJSONFile(columns, jsonFile);
    
        // Read and parse the JSON file
        const jsonData = JSON.parse(
          fs.readFileSync(jsonFile, { encoding: "utf8" })
        );
    
        let indexFoundAt = -1;
        let dataList: string[] = [];
    
        // Find the index of the column
        for (let i = 0; i < jsonData.length; i++) {
          // Ensure jsonData[i] is an array or a string before calling includes
          if (Array.isArray(jsonData[i]) || typeof jsonData[i] === 'string') {
            if (jsonData[i].includes(columnName)) {
              indexFoundAt = i;
              break; // Stop the loop once the column is found
            }
          }
        }
    
        // If the column is found, extract its data
        if (indexFoundAt !== -1) {
          console.log(`${columnName} found in array at index ${indexFoundAt}`);
          // Ensure jsonData[indexFoundAt] is an array before calling filter
          if (Array.isArray(jsonData[indexFoundAt])) {
            dataList = jsonData[indexFoundAt].filter((_: any, index: number) => index > 0);
          }
        } else {
          throw new Error(`${columnName} not found`);
        }
    
        return dataList; // Return the data list
      });
  };

  const generateRowwiseJSONFile = async (data: any [], jsonFile: string) => {
    try {
      if (fs.existsSync(jsonFile)) {
        fs.rmSync(jsonFile);
      }
      fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error(err);
    }
  };
  
  export const readExcelFileRow = async (
      filePath: string,
      jsonFile: string
    ): Promise<string[]> => {
      return await readXlsxFile(filePath).then((rows) => {
          generateRowwiseJSONFile(rows, jsonFile);
      
          // Read and parse the JSON file
          const jsonData = JSON.parse(fs.readFileSync(jsonFile, { encoding: "utf8" }));
          return jsonData;
      });
  };

  
// export const readExcelFileRow = async (
//   filePath: string,
//   jsonFile: string,
//   filterValues: any[] // Add a parameter for filter values
// ): Promise<string[]> => {
//   return await readXlsxFile(filePath).then((rows) => {
//       // Filter rows based on the filter values
//       const filteredRows = rows.filter(row => filterValues.includes(row[0])); // Adjust the row index based on your data

//       generateRowwiseJSONFile(filteredRows, jsonFile);
  
//       // Read and parse the JSON file
//       const jsonData = JSON.parse(fs.readFileSync(jsonFile, { encoding: "utf8" }));
//       return jsonData;
//   });
// };

export const filterJsonFile = (jsonFilePath, columnName, filterValue) => {
  // Read and parse the JSON file
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, { encoding: "utf8" }));

  // Separate the header from the data
  const header = jsonData[0];
  const data = jsonData.slice(1);

  // Find the index of the column
  const columnIndex = header.indexOf(columnName);

   // Create a regex for the filter value
   const regex = new RegExp(`^${filterValue}`);

   // Filter rows based on the filter value in the specified column
   const filteredData = data.filter(row => regex.test(row[columnIndex])); 

  // Add the header back to the filtered data
  filteredData.unshift(header);

  return filteredData;
};

export const filterJsonData = (jsonData, columnName, filterValue) => {
  
  // Separate the header from the data
  const header = jsonData[0];
  const data = jsonData.slice(1);

  // Find the index of the column
  const columnIndex = header.indexOf(columnName);

  // Create a regex for the filter value
  const regex = new RegExp(`^${filterValue}`);

  // Filter rows based on the filter value in the specified column
  const filteredData = data.filter(row => regex.test(row[columnIndex]));

  // Add the header back to the filtered data
  filteredData.unshift(header);

  return filteredData;
};

export const getColumnValues = (jsonData, columnName) => {
  // Get the index of the column
  const columnIndex = jsonData[0].indexOf(columnName);

  // If the column is not found, throw an error
  if (columnIndex === -1) {
    throw new Error(`${columnName} not found`);
  }

  // Get the column values
  const columnValues = jsonData.map(row => [row[columnIndex]]);

  return columnValues;
};
