import express from 'express';

const router = express.Router(); 

//middleware for users
router.use((req, res, next) => {
  console.log(`Request received for users: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

router.get('/', function(req, res, next) {
    res.send('Users. query='+JSON.stringify(req.query));
    //req.query.page=, req.query.limit=  
});

router.get('/:id', function(req, res, next) {
    const userId = req.params.id;
    res.send('User id = '+userId);
});

export default router;