import Enrollment from '../models/enrollment.model.js';

// Create a new enrollment (student requests enrollment)
export const createEnrollment = async (req, res) => {
  try {
    req.body.status = 'Pending Instructor Approval';
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Instructor approves the enrollment
export const instructorApproveEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.status === 'Pending Instructor Approval') {
      await enrollment.update({'status' : 'Pending Advisor Approval'});
      await enrollment.save();
      res.status(200).json(enrollment);
    }
    else res.status(400).json({ error: 'Enrollment is not pending instructor approval' });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Advisor approves the enrollment
export const advisorApproveEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    if (enrollment.status === 'Pending Advisor Approval') {
      await enrollment.update({'status' : 'Enrolled'});
      await enrollment.save();
      res.status(200).json(enrollment);
    }
    else{
      res.status(400).json({ error: 'Enrollment is pending instructor approval' });
    }
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single enrollment by ID
export const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (enrollment) {
      res.status(200).json(enrollment);
    } else {
      res.status(404).json({ error: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all enrollments of a specific course
export const getEnrollmentsByCourseId = async (req, res) => {
  try {
    const { courseID } = req.params;
    const enrollments = await Enrollment.findAll({
      where: { courseID },
      //include: [Student, Course]
    });
    if (enrollments.length > 0) {
      res.status(200).json(enrollments);
    } else {
      res.status(404).json({ error: 'No enrollments found for this course' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an enrollment by ID
export const updateEnrollment = async (req, res) => {
  try {
    const [updated] = await Enrollment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEnrollment = await Enrollment.findByPk(req.params.id);
      res.status(200).json(updatedEnrollment);
    } else {
      res.status(404).json({ error: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an enrollment by ID
export const deleteEnrollment = async (req, res) => {
  try {
    const deleted = await Enrollment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Enrollment not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
