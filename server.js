// index.js
const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // We'll use the uuid library to generate random filenames

const app = express();
const port = process.argv?.[2] ?? 8888;
console.log(`Using port ${port}`)

// Set up Multer to handle file uploads
const upload = multer({ dest: 'c:/tmp/' });

// Define a test route accessible via GET request
app.get('/test', (req, res) => {
    res.send('Test URL is working!');
});

// Define the route to handle file uploads
app.post('/ocr', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file received.' });
    }

    const params = req.query.params;
    const inputFile = req.file.path;
    const outputFile = `output_${uuidv4()}.pdf`; // You can customize the output filename

    // Replace 'your_native_command' with the actual native command you want to execute
    const nativeCommand = `ocrmypdf${params ? ' ' + params : ''} ${inputFile} ${outputFile}`;

    // Execute the native command
    exec(nativeCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing the command:', error.message);
            return res.status(500).json({ error: 'An error occurred while processing the file.' });
        }

        console.log(`Command executed successfully: ${nativeCommand}`, stdout);

        // Read the output file and send it as a response
        fs.readFile(outputFile, (err, data) => {
            if (err) {
                console.error('Error reading the output file:', err.message);
                return res.status(500).json({ error: 'An error occurred while reading the output file.' });
            }

            // Delete the uploaded and output files after processing
            fs.unlink(inputFile, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting the uploaded file:', unlinkError.message);
                }
                fs.unlink(outputFile, (unlinkOutputError) => {
                    if (unlinkOutputError) {
                        console.error('Error deleting the output file:', unlinkOutputError.message);
                    }
                });
            });

            // Set appropriate response headers and send the data as the response
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Disposition', `attachment; filename=${outputFile}`);
            res.status(200).end(data);
        });
    });
});

// Define the route to handle file uploads
app.post('/qpdf', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file received.' });
    }

    const params = req.query.params;
    const inputFile = req.file.path;
    const outputFile = `output_${uuidv4()}.pdf`; // You can customize the output filename

    // Replace 'your_native_command' with the actual native command you want to execute
    const nativeCommand = `qpdf${params ? ' ' + params : ''} ${inputFile} ${outputFile}`;

    // Execute the native command
    exec(nativeCommand, (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing the command:', error.message);
            return res.status(500).json({ error: 'An error occurred while processing the file.' });
        }

        console.log(`Command executed successfully: ${nativeCommand}`, stdout);

        // Read the output file and send it as a response
        fs.readFile(outputFile, (err, data) => {
            if (err) {
                console.error('Error reading the output file:', err.message);
                return res.status(500).json({ error: 'An error occurred while reading the output file.' });
            }

            // Delete the uploaded and output files after processing
            fs.unlink(inputFile, (unlinkError) => {
                if (unlinkError) {
                    console.error('Error deleting the uploaded file:', unlinkError.message);
                }
                fs.unlink(outputFile, (unlinkOutputError) => {
                    if (unlinkOutputError) {
                        console.error('Error deleting the output file:', unlinkOutputError.message);
                    }
                });
            });

            // Set appropriate response headers and send the data as the response
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('Content-Disposition', `attachment; filename=${outputFile}`);
            res.status(200).end(data);
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});