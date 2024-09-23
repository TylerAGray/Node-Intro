// Import required modules
const fs = require('fs'); // File system module for file operations
const process = require('process'); // Process module to handle command-line arguments and exit
const axios = require('axios'); // Axios library for making HTTP requests

/** 
 * Handle output: write to file if 'out' is provided, else print to console.
 * @param {string} text - The text to be written or printed.
 * @param {string} out - The optional output file path.
 */
function handleOutput(text, out) {
  if (out) {
    // If an output file is specified, write the text to that file
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        // Log error if writing fails and exit with an error code
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1); // Exit with an error code
      }
    });
  } else {
    // If no output file is specified, print the text to the console
    console.log(text);
  }
}

/** 
 * Read a file at the given path and handle the output.
 * @param {string} path - The path to the file to be read.
 * @param {string} out - The optional output file path.
 */
function cat(path, out) {
  // Read the file at the specified path
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      // Log error if reading fails and exit with an error code
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1); // Exit with an error code
    } else {
      // If reading is successful, handle the output (write to file or print)
      handleOutput(data, out);
    }
  });
}

/** 
 * Fetch a web page at the given URL and handle the output.
 * @param {string} url - The URL of the web page to be fetched.
 * @param {string} out - The optional output file path.
 */
async function webCat(url, out) {
  try {
    // Make a GET request to the URL
    let resp = await axios.get(url);
    // Handle the output of the fetched data
    handleOutput(resp.data, out);
  } catch (err) {
    // Log error if fetching fails and exit with an error code
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1); // Exit with an error code
  }
}

// Initialize variables for path and output file
let path;
let out;

// Check for command-line arguments to determine output file and input path
if (process.argv[2] === '--out') {
  out = process.argv[3]; // Set the output file path
  path = process.argv[4]; // Set the input path (file or URL)
} else {
  path = process.argv[2]; // If no '--out', treat the first argument as the path
}

// Determine whether the input path is a URL or a file path
if (path.slice(0, 4) === 'http') {
  // If it starts with 'http', treat it as a URL and fetch the web page
  webCat(path, out);
} else {
  // Otherwise, treat it as a file path and read the file
  cat(path, out);
}

