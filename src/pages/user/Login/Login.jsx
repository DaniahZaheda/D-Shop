import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
 onSubmit: async (values, { setSubmitting }) => {
  try {
    const res = await axios.post(
      'https://mytshop.runasp.net/api/Account/Login',
      values
    );

    const { token, userName } = res.data;

    if (!token) throw new Error('لم يرد توكن من الخادِم');

    localStorage.setItem('userToken', token);
    localStorage.setItem('userName', userName);

    // 🔔 إرسال إشعار للـ Navbar بأن المستخدم سجل دخول
    window.dispatchEvent(new Event('userLoggedIn'));

    setSubmitting(false);
    navigate('/');
  } catch (err) {
    alert('Login failed: ' + (err.response?.data || err.message));
    setSubmitting(false);
  }
},
  });

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            autoComplete="username"
          />
          <div className="invalid-feedback">{formik.errors.email}</div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            autoComplete="current-password"
          />
          <div className="invalid-feedback">{formik.errors.password}</div>
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
