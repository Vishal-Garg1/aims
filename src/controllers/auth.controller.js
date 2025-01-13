import transporter from '../config/email.js';
import { generateOTP } from '../utils/otp.js';
import { generateToken, verifyToken } from '../utils/jwt.js';
import Student from '../models/student.model.js';
import Faculty from '../models/faculty.model.js';
import Admin from '../models/admin.model.js';

// Send OTP
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    
    let user;
    let role;

    user = await Student.findOne({ where: { email } });
    if (user) {
      role = 'student';
    } else {
      user = await Faculty.findOne({ where: { email } });
      if (user) {
        role = 'faculty';
      } else {
        user = await Admin.findOne({ where: { email } });
        if (user) {
          role = 'admin';
        }
      }
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending OTP' });
      }
      res.status(200).json({ message: 'OTP sent successfully', role });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    let user;
    let role;

    user = await Student.findOne({ where: { email, otp } });
    if (user) {
      role = 'student';
    } else {
      user = await Faculty.findOne({ where: { email, otp } });
      if (user) {
        role = 'faculty';
      } else {
        user = await Admin.findOne({ where: { email, otp } });
        if (user) {
          role = 'admin';
        }
      }
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiresAt) {
      user.otp = null;
      user.otpExpiresAt = null;
      await user.save();
      return res.status(400).json({ message: 'OTP has expired' });
    }

    const token = generateToken({ id: user.id, role });

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' }); 
    res.status(200).json({ message: 'Logged in successfully', role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Logout
export const logout = (req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'Lax' });
  res.status(200).json({ message: 'Logged out successfully' });
};
