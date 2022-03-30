import {Router} from 'express'
import {getAllCharacters,addCharacter,editCharacter,deleteCharacter,getCharacter} from '../controllers/characterController'


const router = Router();

router.get('/',getAllCharacters);
router.get('/:id',getCharacter);
router.post('/',addCharacter);
router.put('/:id',editCharacter);
router.delete('/:id',deleteCharacter);

export default router