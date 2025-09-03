// Create this file: backend/routes/clothes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();


// Configure where to store uploaded files temporarily
const storage = multer.diskStorage({
  // Where to store files
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Store in 'uploads' folder
  },
  // What to name the files
  filename: function (req, file, cb) {
    // Create unique filename: timestamp + original name
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only image files are allowed!'), false); // Reject
  }
};

// Create the multer middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No photo uploaded' });
    }

    // For now, just return basic file info
    // Later add background removal and AI analysis here
    const fileInfo = {
      id: Date.now(), // Temporary ID
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
      // add these after we set up the AI services
      backgroundRemovedUrl: null,
      detectedTags: {
        clothingType: 'Unknown',
        primaryColor: 'Unknown',
        season: 'Unknown'
      }
    };

    res.json({
      message: 'Photo uploaded successfully!',
      file: fileInfo
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload photo' });
  }
});

// Get all clothes (implement this later)
router.get('/', (req, res) => {
  res.json({ message: 'Get all clothes - coming soon!' });
});

module.exports = router;