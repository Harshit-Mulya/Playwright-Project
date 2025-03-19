const { test, expect } = require('@playwright/test');
const fs = require('fs');
import path from 'node:path';
const AmazonPage = require('../Pages/AmazonPage');

const filePath = path.join(__dirname, '..', 'TestData', 'Data.json');

test('Test 1 - Open Page and Capture Title', async ({ page }) => {
  // Open the URL
  const amazonPage = new AmazonPage(page);
  await amazonPage.openURL();
    
  // Get the title of the page
  const title = await amazonPage.getTitle();
  
  // Capture the outcome in the file
  fs.writeFileSync(filePath, JSON.stringify({ title }, null, 2));  
     
});

test('Test 2 - Assert the title captured in Test1', async ({ page }) => {
    
    // Read the title from the file
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    const titledata = parsedData.title;
     
    // Assert the title
    expect(titledata).toBe('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');

  });

  test('Test 3 - Search for a Product', async ({ page }) => {
    
    const amazonPage = new AmazonPage(page);
    await amazonPage.openURL();
    const searchTerm = 'iphone 15';

    //Perform the search
    await amazonPage.searchForProduct(searchTerm);

    //Get the product title from the search results
    const productTitle = await amazonPage.getProductTitle();
  
    // Write the product title and search term i.e outcome to a JSON file
    const productData = { searchTerm, productTitle };
    fs.writeFileSync(filePath, JSON.stringify(productData, null, 2));
       
    // Validate that the product title is extracted correctly
    expect(productTitle).not.toBeNull();
    
  });

  test('Test 4 - Assert the product title from data.json', async ({ page }) => {

    // Read the product data from the file
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log('File read successfully');
        
    const amazonPage = new AmazonPage(page);
    await amazonPage.openURL();
    //Search for the product using the saved search term
    await amazonPage.searchForProduct(parsedData.searchTerm);
  
    // Assert the product title from the file
    expect(parsedData.productTitle).toBe('Apple iPhone 15 (128 GB) - Black');

  });

