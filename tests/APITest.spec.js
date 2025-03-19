import { test,expect, request } from "@playwright/test";
import fs from "fs";
import path from "path";

let fileID="";

test('POST: Upload a JSON file', async ({ request }) => {
    // Path to the upload JSON file 
    const filePath = path.resolve('TestData', 'UploadFile.json');
  
    // Read the content of the JSON file
    const fileData = fs.readFileSync(filePath);
  
    const uploadUrl = 'https://v2.convertapi.com/upload';
  
    const response = await request.post(uploadUrl, {
      headers: {
        Accept: 'application/json',
      },
      multipart: {
        file: {
          name: 'UploadFile.json',
          buffer: fileData,  
          mimeType: 'application/json', 
        },
      },
    });
    
    const responseBody = await response.json();
    
    // Assert the response status
    expect(response.status()).toBe(200);
    fileID  = responseBody.FileId;
  });

test("GET: DOwnload a file", async ({ request }) => {

    const writeFilePath = path.resolve("TestData/", "WriteDataInFile.json");
    const downloadUrl="https://v2.convertapi.com/d/"+fileID;
  
    const response = await request.get(downloadUrl);
    // Check if the response status is successful
    expect(response.status()).toBe(200);

    //Write the downloaded file content to a file
    const responseBody = await response.json();
    fs.writeFileSync(writeFilePath, JSON.stringify(responseBody));  
        
  });

  test("GET: Token", async ({ request }) => {

    const downloadUrl="https://v2.convertapi.com";
  
      const response = await request.post(downloadUrl,{
          headers: {
              'Authorization':"Bearer secret_here",  
              'Content-Type': 'application/json', 
          },
              data:{
                  "RequestCount":"3",
                  "Lifetime":"10000" ,
                  "Count":"2"
              }
      });
    
      expect(response.status()).toBe(200);
     
  });