import readXlsxFile from "read-excel-file/node";
import fs from "fs";

readXlsxFile(`${__dirname}/Worker_and_Temporary_Worker.xlsx`).then((rows) => {
  const columns = rows[0].map((_, i) => rows.map((row) => row[i]));
  generateColumnwiseJSONFile(columns);

  const data = require("./excelData1.json");
  console.log(data.length);

  let indexFoundAt = -1;

  for (let i = 0; i < data.length; i++) {
    if (data[i].includes("Organisation Name")) {
      indexFoundAt = i;
      console.log(data[i]);

      const actualDataList: string[] = data[i];
      let expectedDataList: string[] = [];
      actualDataList.forEach(element => {
        element = element.toString().toLowerCase();
        expectedDataList.push(element);
      });

      console.log('--->');
      console.log(expectedDataList);
      console.log('--->');
      break;
    }
  }

  if (indexFoundAt !== -1) {
    console.log(`'Type & Rating' found in array at index ${indexFoundAt}`);
  } else {
    console.log("'Type & Rating' not found in any array");
  }
});

const generateColumnwiseJSONFile = async (data: any[]) => {
  try {
    if (fs.existsSync("excelData1.json")) {
      fs.rmSync("excelData1.json");
    }
    fs.writeFileSync("excelData1.json", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
};
