const { Router } = require('express'),
      LogEntry = require('../models/LogEntry');
      
      router = Router();

router.get('/', async (req, res, next) => {
    try{
        const logs = await LogEntry.find();
        res.json(logs);
    } catch(error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch(error) {
        if (error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;