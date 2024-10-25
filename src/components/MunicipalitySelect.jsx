import { useState, useEffect } from 'react';
import { fetchMunicipalities } from '../api/ssbapi'; 
import './MunicipalitySelect.css';

function MunicipalitySelect({ onSelect }) {
  const [municipalities, setMunicipalities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
   // Fetch municipality data when the component is mounted
  useEffect(() => {
    fetchMunicipalities()
      .then(setMunicipalities)
      .catch((err) => setError("Failed to fetch municipalities"))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    onSelect(value);  // Pass the municipality code
  };

  if (loading) {
    return <p>Loading municipalities...</p>;  // Loading
  }

  if (error) {
    return <p>{error}</p>;  // Display error
  }

  return (
    <div>
      <label htmlFor="municipality">Select Municipality:</label>
      <select id="municipality" onChange={handleChange}>
        <option value="">Choose a municipality</option>
        {municipalities.map((municipality) => (
          <option key={municipality.code} value={municipality.code}>
            {municipality.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MunicipalitySelect;
