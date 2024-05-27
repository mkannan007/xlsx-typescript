import { test, expect } from '@playwright/test';
import { filterJsonData, filterJsonFile, getColumnValues, readExcelFile, readExcelFileRow } from '../helper/excel';

import fs from "fs";

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // await page.goto('https://playwright.dev/');

  const excelFilePath = "Worker_and_Temporary_Worker.xlsx";
  const jsonFilePath = "testJson.json";

  const jsonData1 = JSON.parse(
    fs.readFileSync('excelData.json', { encoding: "utf8" })
  );

  console.log('------------------------------------------');
  for (const element of jsonData1) {
    console.log(element['Organisation Name']);
    
    // Corrected: Await the async function call
    const expectedData: string[] = await readExcelFile(excelFilePath, jsonFilePath, element['Organisation Name']);

    console.log('------------------------------------------');
    console.log(expectedData);
    console.log('------------------------------------------');
  }
  console.log('------------------------------------------');



  // const actualData: string[] = await readExcelFile(excelFilePath, jsonFilePath, 'County');

  // expect(expectedData).toEqual(actualData);
});

test('row wise excel', async ({ page }) => {

  const excelFilePath = "filterApplyExcel.xlsx";
  const jsonFilePath = "filterApplyJson.json";


    console.log('------------------------------------------');
    console.log(await readExcelFileRow(excelFilePath, jsonFilePath));
    console.log('------------------------------------------');

    
const filteredData = await filterJsonFile(jsonFilePath, 'column 2', 'test2');
console.log(filteredData);

console.log('------------------------------------------');
const filteredData1 = await filterJsonData(filteredData, 'column 5', 'abcd1');
console.log(filteredData1);

console.log('------------------------------------------');

const columnValues = await getColumnValues(filteredData1, 'column 5');
console.log(columnValues);

  }
);
