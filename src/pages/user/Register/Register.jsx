import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'First name must be at least 3 characters')
      .required('First name is required'),
    lastName: Yup.string()
      .min(4, 'Last name must be at least 4 characters')
      .required('Last name is required'),
    userName: Yup.string()
      .min(6, 'Username must be at least 6 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    birthOfDate: Yup.date()
      .max(new Date(Date.now() - 568025136000), 'You must be at least 18 years') // 18 years in ms
      .required('Birth date is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthOfDate: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://mytshop.runasp.net/api/Account/register', values);
        alert('Registration successful!');
        resetForm();
        navigate('/login');
      } catch (error) {
        alert('Registration failed: ' + (error.response?.data || error.message));
      }
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Create New Account</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            name="firstName"
            className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          <div className="invalid-feedback">{formik.errors.firstName}</div>
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          <div className="invalid-feedback">{formik.errors.lastName}</div>
        </div>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="userName"
            className={`form-control ${formik.touched.userName && formik.errors.userName ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          <div className="invalid-feedback">{formik.errors.userName}</div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>

        {/* Birth Date */}
        <div className="mb-3">
          <label className="form-label">Birth Date</label>
          <input
            type="date"
            name="birthOfDate"
            className={`form-control ${formik.touched.birthOfDate && formik.errors.birthOfDate ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthOfDate}
          />
          <div className="invalid-feedback">{formik.errors.birthOfDate}</div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
        </div>

        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
