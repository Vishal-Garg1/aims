import express from 'express';
import { createEnrollment, getAllEnrollments, getEnrollmentById, getEnrollmentsByCourseId, updateEnrollment, deleteEnrollment, instructorApproveEnrollment, advisorApproveEnrollment } from '../controllers/enrollment.controller.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { advisorApproval, canEnrollStudent, instructorApproval, onlyAdmin } from '../middlewares/authorizationMiddleware.js';

const router = express.Router();
router.use(authenticate);

router.post('/', canEnrollStudent, createEnrollment);
router.get('/', getAllEnrollments);
router.get('/:id', getEnrollmentById);
router.get('/course/:courseID', getEnrollmentsByCourseId);
router.put('/:id', onlyAdmin, updateEnrollment);
router.delete('/:id', onlyAdmin, deleteEnrollment);
router.patch('/:id/instructor-approve', instructorApproval, instructorApproveEnrollment);
router.patch('/:id/advisor-approve', advisorApproval, advisorApproveEnrollment);

export default router;
