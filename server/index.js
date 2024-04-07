const express = require("express");
const port = 5001;
const bodyParser = require('body-parser');
const User = require('./models/User')
const Addpet = require("./models/Addpet")
const AdoptionRequest =require("./models/AdoptionRequest")
const Admin = require('./models/Admin')

const app = express();
const authRoutes = require('./routes/authRoutes');
const AdminRoute =require('./routes/AdminRouts')
const requireToken = require('./Middlewares/AuthTokenRequired');
const AdminToken = require("./Middlewares/AdminToken");
app.use(bodyParser.json());
app.use(authRoutes);
app.use("/Admin",AdminRoute)


require('./db');
// require('./models/User');
// const createAdmin = async () => {
//     const newAdmin = new Admin({
//         name: 'admin',
//         email: 'admin@gmail.com',
//         password: '123'
//     });

//     try {
//         await newAdmin.save();
//         console.log('Admin saved successfully');
//     } catch (error) {
//         console.error('Error saving admin:', error);
//     }
// };

// createAdmin();

app.get('/', requireToken,(req,res)=>{
    console.log((req.user));
    res.send(req.user);
})
app.get('/token', AdminToken,(req,res)=>{
    console.log((req.user));
    res.send(req.user);
})

app.post('/Addpet', async (req, res) => {
    const petData = req.body;
    const existingEvent = await Addpet.findOne({ petName: petData.petName });
  
    if (existingEvent) {
      return res.status(400).json({ message: 'Pet already exists' });
    }
  
    try {
      const event = new Addpet(petData);
      await event.save();
      res.status(200).json({ message: 'Pet saved successfully', event: event });
    } catch (error) {
      res.status(500).json({ message: 'Error Add Pet' });
    }
  });

  app.get('/getPets', async (req, res) => {
    try {
      const pets = await Addpet.find({});
      res.json(pets);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching pet data' });
    }
  });

  app.delete('/deletePet/:petId', async (req, res) => {
  const petId = req.params.petId;

  try {
    const deletedPet = await Addpet.findByIdAndDelete(petId);

    if (!deletedPet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pet', error: error.message });
  }
});

// Inside your '/submitAdoptionRequest' route
app.post('/AdoptionRequest', async (req, res) => {
  try {
    const adoptionData = req.body;
    
    // Create a new AdoptionRequest instance using the schema
    const adoptionRequest = new AdoptionRequest({
      petData: JSON.stringify(adoptionData.petData), // Convert petData to a JSON string
      adopteeName: adoptionData.adopteeName,
      adopteeMobile: adoptionData.adopteeMobile,
      adopteeEmail: adoptionData.adopteeEmail,
      // Add other fields as needed
    });

    await adoptionRequest.save();
    console.log('Adoption request saved to the database');
    res.status(200).json({ message: 'Adoption request saved successfully' });
  } catch (error) {
    console.error('Error saving adoption request:', error);
    res.status(500).json({ message: 'Error saving adoption request', error: error.message });
  }
});


// Inside your Express server
app.get('/getAdoptionRequests', async (req, res) => {
  try {
    const adoptionRequests = await AdoptionRequest.find({});
    res.json(adoptionRequests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching adoption requests', error: error.message });
  }
});




// app.get('/admin',(req,res)=>{
//      const createAdmin = async () => {
//             const newAdmin = new Admin({
//                 name: 'admin',
//                 email: 'admin@gmail.com',
//                 password: '123'
//             });
        
//             try {
//                 await newAdmin.save();
//                 console.log('Admin saved successfully');
//             } catch (error) {
//                 console.error('Error saving admin:', error);
//             }
//         };
        
//         createAdmin();
//     console.log((req.user));
//     res.send(req.user);
// })


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})