import React from 'react';
import '../../styles/DoctorPage.css'; // Assume we create an external CSS file for styles

export const DoctorPage = () => {
  return (
    <div className="doctor-page">
      <h1 className="page-title">Add Patient Information</h1>
      <form className="patient-form">
        <div className="form-group">
          <label htmlFor="patient-name">Patient Name</label>
          <input 
            id="patient-name" 
            placeholder="Enter patient name" 
            name="patient-name" 
            type="text" 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input 
            id="dob" 
            type="date" 
            name="dob" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            id="phone" 
            name="phone" 
            type="tel" 
            placeholder="Phone Number" 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="medical-history">Medical History</label>
          <textarea 
            id="medical-history" 
            name="medical-history" 
            placeholder="Medical History" 
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="allergies">Allergies</label>
          <textarea 
            id="allergies" 
            name="allergies" 
            placeholder="Allergies" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="medications">Current Medications</label>
          <textarea 
            id="medications" 
            name="medications" 
            placeholder="Current Medications" 
          />
        </div>

        <div className="form-group">
          <label htmlFor="symptoms">Symptoms</label>
          <textarea 
            id="symptoms" 
            name="symptoms" 
            placeholder="Symptoms" 
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Patient</button>
      </form>
    </div>
  );
};
