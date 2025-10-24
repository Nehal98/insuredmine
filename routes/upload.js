const express = require('express');
const multer = require('multer');
const { Worker } = require('worker_threads');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  const worker = new Worker('./workers/uploadWorker.js', {
    workerData: { filePath: req.file.path }
  });

  worker.on('message', msg => res.json({ message: msg }));
  worker.on('error', err => res.status(500).json({ error: err.message }));
});

module.exports = router;
