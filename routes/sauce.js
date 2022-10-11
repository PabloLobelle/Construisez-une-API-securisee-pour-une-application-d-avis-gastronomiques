const express = require('express');
const helmet = require('helmet');
const appl = express();
appl.use(helmet());

const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config')

const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/like');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, likeCtrl.likeSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce); 

module.exports = router;