export const DoctorPage = () => {
  return (
    <>
      <h1>Doctor Page</h1>
      <form>
        <input placeholder="Enter patient name" name="patient-name" />
        <input type="date" placeholder="Date of Birth" name="dob" />
        <select name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input placeholder="Phone Number" name="phone" type="tel" />
        <textarea placeholder="Medical History" name="medical-history" />
        <textarea placeholder="Allergies" name="allergies" />
        <textarea placeholder="Current Medications" name="medications" />
        <textarea placeholder="Symptoms" name="symptoms" />
        <button type="submit">Add Patient</button>
      </form>
    </>
  );
};
