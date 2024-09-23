// Import the 'fs' module to handle file system operations
const fs = require('fs');
// Destructure 'readFile' and 'writeFile' from the 'fs.promises' to use promise-based functions for async operations
const {readFile, writeFile} = fs.promises;
// Import the 'process' module to access command-line arguments and exit the process
const process = require('process');
// Import the 'axios' library for making HTTP requests
const axios = require('axios');

/** 
 * Function to write contents to a file.
 * @param {string} path - The path to the file where contents will be written.
 * @param {string} contents - The contents to write to the file.
 */
async function write(path, contents) {
    try {
        // Use writeFile to write contents to the file asynchronously
        await writeFile(path, contents, "utf8");
    } catch (err) {
      // If an error occurs during writing, log the error message and exit
      console.error(`Error writing ${path}: ${err}`);
      process.exit(1); // Exit with an error code
    }
}

/** 
 * Function to read a file at the given path and return its contents.
 * @param {string} path - The path to the file to be read.
 * @returns {Promise<string>} - The contents of the file as a string.
 */
async function cat(path) {
  try {
    // Use readFile to read the file asynchronously and return its contents
    return await readFile(path, 'utf8');
  } catch (err) {
      // If an error occurs during reading, log the error message and exit
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1); // Exit with an error code
  }
}

/** 
 * Function to fetch a web page at the given URL and return its contents.
 * @param {string} url - The URL of the web page to be fetched.
 * @returns {Promise<string>} - The HTML contents of the web page.
 */
async function webCat(url) {
  try {
    // Make a GET request to the URL and return the response data
    return (await axios.get(url)).data;
  } catch (err) {
    // If an error occurs during the HTTP request, log the error message and exit
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1); // Exit with an error code
  }
}

/** 
 * Main function to control the flow of the program.
 * It determines whether to read from a file or a URL based on command-line arguments.
 */
async function main() {
  let path; // Variable to hold the path or URL
  let out;  // Variable to hold the output file path if specified

  // Check if the '--out' flag is provided for outputting to a file
  if (process.argv[2] === '--out') {
    out = process.argv[3]; // The output file path
    path = process.argv[4]; // The input file or URL
  } else {
    path = process.argv[2]; // If no '--out', treat the first argument as the path
  }

  // Determine whether to fetch content from a URL or read from a file
  let contentsPromise = (path.slice(0, 4) === 'http')
      ? webCat(path) // Fetch from the web if it's a URL
      : cat(path);   // Read from the file if it's not a URL

  // Wait for the contents to be fetched or read
  let contents = await contentsPromise;

  // If an output file path is provided, write the contents to the file
  if (out) {
      await write(out, contents);
  } else {
      // Otherwise, print the contents to the console
      console.log(contents);
  }
}

// Start the program by calling the main function
main();
