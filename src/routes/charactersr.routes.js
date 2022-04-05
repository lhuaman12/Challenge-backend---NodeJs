import {Router} from 'express'
import {getAllCharacters,addCharacter,editCharacter,deleteCharacter,getCharacter} from '../controllers/characterController'
import {isAuthenticated} from '../middlewares/auth'

const router = Router();

router.get('/',isAuthenticated,getAllCharacters);
router.get('/:id',isAuthenticated,getCharacter);
router.post('/',isAuthenticated,addCharacter);
router.post('/:id',isAuthenticated,editCharacter);
router.delete('/:id',isAuthenticated,deleteCharacter);

export default router;