// Import the 'fs' module to handle file system operations
const fs = require('fs');
// Import the 'process' module to access command-line arguments and exit the process
const process = require('process');

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

// Call the cat function with the file path provided as a command-line argument
cat(process.argv[2]);

