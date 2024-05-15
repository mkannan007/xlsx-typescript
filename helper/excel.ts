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

