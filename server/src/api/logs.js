const { Router } = require('express'),
      LogEntry = require('../models/LogEntry');
      
      router = Router();

router.get('/', (req, res) => {
    res.json({
        message: '🗺',
    });
});

router.post('/', async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch(error) {
        next(error);
    }
});

module.exports = router;