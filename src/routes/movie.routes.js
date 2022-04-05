import {Router} from 'express';
import {getAllMovies,addMovie,editMovie,deleteMovie,getMovie} from '../controllers/movieController';
import {isAuthenticated} from '../middlewares/auth';

const router = Router();

router.get('/',isAuthenticated,getAllMovies);;
router.post('/',isAuthenticated,addMovie);
router.post('/:id',isAuthenticated,editMovie);
router.delete('/:id',isAuthenticated,deleteMovie);
router.get('/:id',isAuthenticated,getMovie);

export default router


