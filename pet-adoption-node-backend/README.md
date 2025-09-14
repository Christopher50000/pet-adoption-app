# Pet API Server

This is a simple Node.js/Express server that provides an API to manage pets, including uploading images for each pet. The server uses **Multer** for handling file uploads and stores uploaded images in a local `uploads/` folder.

---

## Features

- **GET /api/pets**: Retrieve all pets (with a simulated delay of 3 seconds).
- **POST /api/pets**: Add a new pet with a name and optional image upload.

---

## Dependencies

This project relies on the following Node.js packages:

### express
- Web server framework used to create API endpoints.

### body-parser
- Parses incoming JSON request bodies to make them accessible via `req.body`.

### multer
- Handles file uploads from clients and stores them on the server.

### path
- Node.js core module for working with file and directory paths.


## Installation

1. Clone the repository:

```bash
git clone <repository_url>
Navigate to the project folder and install dependencies:


cd <project_folder>
npm install
Create an uploads folder in the project root (this is where uploaded images will be stored):

npm install express body-parser multer

mkdir uploads

Start the server: node server.js
The server will run on: http://localhost:3000
 ```


# API Endpoints
 ## GET /api/pets
Returns a list of all pets in JSON format.
Example response:

```json

[
  { "id": 1, "name": "Bandit", "image": null },
  { "id": 2, "name": "Thomas", "image": null },
  { "id": 3, "name": "Pumpkin", "image": null }
]
```
## POST /api/pets

Adds a new pet. Accepts multipart/form-data with the following fields:
pet: JSON string with pet data (e.g., { "name": "Rex" })

image: Optional image file

Example Node.js handling (server.js):

```.js
app.post('/api/pets', upload.single('image'), (req, res) => {
    const newPetDataString = req.body['pet']; // pet data as string
    const newPetData = JSON.parse(newPetDataString); // convert to object

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const newId = pets.length ? Math.max(...pets.map(p => p.id)) + 1 : 1;

    const newPet = {
        id: newId,
        name: newPetData.name,
        image: imagePath
    };

    pets.push(newPet);
    res.status(201).json(newPet);
});
```
## Notes
Uploaded images are stored in the uploads/ folder and served statically at /uploads.

The server uses in-memory storage for pets, so all data will be reset when the server restarts.

Make sure the uploads/ folder exists and is writable.


## Folder Structure
project-root/
│
├─ uploads/ # Stores uploaded images
├─ server.js # Main Node.js server file
├─ package.json # Project dependencies
