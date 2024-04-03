import express from 'express';
import hl7Routes from './hl7.routes';

const apiRoutes = express.Router();

apiRoutes.use("/hl7", hl7Routes)

export default apiRoutes