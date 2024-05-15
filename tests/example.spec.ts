import { test, expect } from '@playwright/test';
import { read } from 'fs';
import { readExcelFile } from '../helper/excel';


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  // await page.goto('https://playwright.dev/');

  const excelFilePath = "Worker_and_Temporary_Worker.xlsx";
  const jsonFilePath = "testJson.json";

  const expectedData: string[] = await readExcelFile(excelFilePath, jsonFilePath, 'Countya');
  const actualData: string[] = await readExcelFile(excelFilePath, jsonFilePath, 'County');

  expect(expectedData).toEqual(actualData);
});
