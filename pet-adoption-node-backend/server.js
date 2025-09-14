const express = require('express'); //for creating the server
const bodyParser = require('body-parser'); //for parsing JSON
const multer = require('multer'); //for file upload
const path = require('path'); //for file paths

const app = express(); //create the server
const port = 3000; //port number

app.use(bodyParser.json()); // Parse JSON bodies

app.use('/uploads',express.static('uploads')) //serve uploaded files from the uploads folder and makes them public

//Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); //destination for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); //unique filename
        cb(null, uniqueSuffix + path.extname(file.originalname)); //filename for uploaded files
    }
});

const upload = multer({ storage: storage }); //create multer instance


// Temporary in-memory pet storage
let pets = [
    { id: 1, name: 'Bandit',image:null },
    { id: 2, name: 'Thomas',image:null },
    { id: 3, name: 'Pumpkin',image:null }
];

// GET all pets
app.get('/api/pets', (req, res) => {
    console.log("Getting pets");
    setTimeout(()=>{
        res.json(pets);
    },3000) //Simulate delay to allow spinner to show

});

// POST a new pet
app.post('/api/pets', upload.single('image'), (req, res) => {

    const newPetDataString = req.body['pet']; //pet data is a string from Angular
    const newPetData = JSON.parse(newPetDataString); //convert string to object

    console.log(newPetData);//print pet data

    //if file is uploaded, set image path and set it the new pet data
    const imagePath = req.file.path ? `/uploads/${req.file.filename}`:null; //if file is uploaded, set image path

    //set the new id for the pet incremented
    const newId = pets.length ? Math.max(...pets.map(p => p.id)) + 1 : 1;

    //set the new pet data
    const newPet =
        {
            id:newId,
            name:newPetData.name,
            image:imagePath
        };


    console.log(newPet);

    pets.push(newPet);
    res.status(201).json(newPet);
});

// Start the server
app.listen(port, () => {
    console.log(`Pet API running at http://localhost:${port}`);
});