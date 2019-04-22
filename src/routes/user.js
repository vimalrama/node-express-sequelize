import { Router } from 'express';
const userController = require('../controllers/user')

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

router.get('/users',()=>{
  userController.getAllUser()
  .then((users)=>{
    res.status(200)
  }).catch((err) => {
    res.status(500).json({message:err.message})
  })
})

router.get('/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

export default router;