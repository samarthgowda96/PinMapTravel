import express from 'express';
import {postPins,getPins} from '../controllers/pins.js'
const router = express.Router(); 

router.post('/',postPins);
router.get('/',getPins);


export default router;

