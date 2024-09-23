// Import the 'fs' module to handle file system operations
const fs = require('fs');
// Import the 'process' module to access command-line arguments and exit the process
const process = require('process');
// Import the 'axios' library for making HTTP requests
const axios = require('axios');

/** 
 * Function to read a file at the given path and print its contents to the console.
 * @param {string} path - The path to the file to be read.
 */
function cat(path) {
  // Use fs.readFile to read the file asynchronously
  fs.readFile(path, 'utf8', function(err, data) {
    // Check for errors during the file reading process
    if (err) {
      // If an error occurs, log the error message and exit the process with a non-zero status
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1); // Exit with an error code
    } else {
      // If successful, print the file contents to the console
      console.log(data);
    }
  });
}

/** 
 * Function to fetch a web page at the given URL and print its contents.
 * @param {string} url - The URL of the web page to be fetched.
 */
async function webCat(url) {
  try {
    // Use axios to make a GET request to the provided URL
    let resp = await axios.get(url);
    // Print the response data (HTML content) to the console
    console.log(resp.data);
  } catch (err) {
    // If an error occurs during the HTTP request, log the error message
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1); // Exit with an error code
  }
}

// Get the path or URL from command-line arguments (the third argument)
let path = process.argv[2];

// Check if the provided path is a URL (starts with 'http')
if (path.slice(0, 4) === 'http') {
  // If it is a URL, call the webCat function to fetch and print the web page
  webCat(path);
} else {
  // If it is not a URL, call the cat function to read and print the local file
  cat(path);
}
