//# imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');

//# /tasks

//## GET
router.get('/', (req, res) => {
  Task.find()
    .select('_id title description publisher_id duration')
    .exec()
    .then((docs) => {
      console.log(docs);
      res.json({
        count: docs.length,
        tasks: docs.map((doc) => {
          return {
            ...doc._doc,
            request: {
              type: 'GET',
              url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${doc._id}`,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//## POST
router.post('/', (req, res) => {
  // set task data
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    desc: req.body.desc,
    author_id: req.body.author_id,
    duration: {
      birth: new Date(),
      span: req.body.span,
    },
  });

  // save task to database
  task
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // response
  res.json({
    task_new: task,
    request: {
      type: 'GET',
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}${task._id}`,
    },
  });
});

//# /tasks/:task_id

//## GET
router.get('/:task_id', (req, res) => {
  const task_id = req.params.task_id;
  Task.findById(task_id)
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//## PATCH
router.patch('/:task_id', (req, res) => {
  const task_id = req.params.task_id;
  res.json(req.body);
  Task.updateOne(
    { _id: task_id },
    {
      $set: req.body,
      $inc: { __v: 1 },
    }
  )
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//## DELETE
router.delete('/:task_id', (req, res) => {
  const task_id = req.params.task_id;
  Task.remove({ _id: task_id })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//# exports
module.exports = router;
