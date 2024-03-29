const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Import the cors middleware

const app = express();

const imageFolder = 'maps/all';

// Use cors middleware to allow requests from any origin
app.use(cors());

app.get('https://geoscrabble.netlify.app/randomImage', (req, res) => {
    fs.readdir(imageFolder, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            res.status(500).send('Internal server error');
            return;
        }
        const folderNames = files
            .filter(file => file.isDirectory())
            .map(folder => folder.name);
        if (folderNames.length === 0) {
            console.error('No folders found');
            res.status(404).send('No folders found');
            return;
        }
        const randomFolderName = folderNames[Math.floor(Math.random() * folderNames.length)];
        const folderPath = path.join(imageFolder, randomFolderName);
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(`Error reading files in folder ${randomFolderName}:`, err);
                res.status(500).send('Internal server error');
                return;
            }
            const imageFiles = files.filter(file => /\.(png|jpe?g|gif)$/i.test(file));
            if (imageFiles.length === 0) {
                console.error(`No image files found in folder ${randomFolderName}`);
                res.status(404).send(`No image files found in folder ${randomFolderName}`);
                return;
            }
            const randomImageFileName = imageFiles[Math.floor(Math.random() * imageFiles.length)];
            const randomImagePath = path.join(folderPath, randomImageFileName);
            res.send(randomImagePath);
        });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
