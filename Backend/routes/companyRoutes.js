import express from 'express';
import { CreateProfile, PostInternship, UpdateProfile } from '../webapi/controllers/CompanyController';

const comRoute = express.Router()

comRoute.port('/CreateProfile', CreateProfile)
comRoute.put('/UpdateProfile', UpdateProfile)
comRoute.post('/PostInternship', PostInternship)


export default comRoute;