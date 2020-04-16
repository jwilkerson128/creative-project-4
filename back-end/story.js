const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

//
// Paragraph schema and model
//

// This is the schema.
const paragraphSchema = new mongoose.Schema({
  text: String,
  author: String,
  lastPart: String,
  created: {
    type: Date,
    default: Date.now
  },
});

// create a Paragraph model from the Paragraph schema
const Paragraph = mongoose.model('Paragraph', paragraphSchema);

//
// Story schema and model
//

// This is the schema.
const storySchema = new mongoose.Schema({
  paragraphs: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Paragraph'
  }],
  illustration_path: String,
  title: String,
  author: String,
  created: {
    type: Date,
    default: Date.now
  },
  complete: {
    type: String,
    default: "unfinished",
  }
});

// create a Story model from the Story schema
const Story = mongoose.model('Story', storySchema);


/* API Endpoints */

/* All of these endpoints start with "/" here, but will be configured by the
   module that imports this one to use a complete path, such as "/api/user" */

router.get("/inprogress", async (req, res) => {
  try {
    let stories = await Story.find({
      complete: "unfinished"
    }).sort({
      created: 1
    }).populate('paragraphs');
    return res.send(stories);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/complete", async (req, res) => {
  try {
    let stories = await Story.find({
      complete: "finished"
    }).sort({
      created: -1
    }).populate('paragraphs');
    return res.send(stories);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate('paragraphs');
    return res.send(story);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/", upload.single('photo'), async (req, res) => {
  // check parameters
  if (!req.file || !req.body.title || !req.body.name) {
    return res.status(400).send({
      message: "Must include a photo, a title, and an author name."
    })
  };

  const story = new Story({
    paragraphs: [],
    illustration_path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
    author: req.body.name
  });
  try {
    await story.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  // check parameters
  if (!req.body.paragraph || !req.body.name || !req.body.storyFinished) {
    return res.status(400).send({
      message: "Must include a paragraph, an author name, and whether the story is finished."
    })
  };

  if (req.body.storyFinished === 'unfinished' && !req.body.lastPart) {
    return res.status(400).send({
      message: "Must include part for the next user to read if the story is not finished."
    })
  };

  try {
    const paragraph = new Paragraph({
      text: req.body.paragraph,
      author: req.body.name,
      lastPart: req.body.lastPart
    });
    await paragraph.save()

    let story = await Story.findById(req.params.id);
    await story.paragraphs.push(paragraph._id);
    story.complete = req.body.storyFinished;
    await story.save();

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let story = await Story.findById(req.params.id);
    for (let para of story.paragraphs) {
      await Paragraph.deleteOne({
        _id: para._id
      });
    }
    await Story.deleteOne({
      _id: req.params.id
    })
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  routes: router,
  model: Story,
};