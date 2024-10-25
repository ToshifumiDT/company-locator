import { fetchCompanies } from './api/brregapi';
import { useState, useEffect } from 'react';
import CompanyDetailModal from './components/CompanyDetailModal';
import CompanyList from './components/CompanyList';
import ErrorMessage from './components/ErrorMessage';
import MunicipalitySelect from './components/MunicipalitySelect';
import './App.css';

function App() {
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Set the default to the current year
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch company data from the API
  const handleFindCompanies = () => {
    if (selectedMunicipality && selectedYear) {
      setCompanyList([]);  // Clear the list when a new request is made
      setError(null);      // Clear the error as well

      fetchCompanies(selectedMunicipality, selectedYear) // Pass the year to the API as well
        .then(setCompanyList)
        .catch((err) => {
          setError('Failed to obtain company information');
          setCompanyList([]);  // Clear the list in case of an error
        });
    }
  };

  // Handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Function called when a municipality is selected
  function handleMunicipalitySelect(municipality) {
    setSelectedMunicipality(municipality);
  }

  // Function called when a company is clicked
  function handleCompanyClick(company) {
    setSelectedCompany(company);
    setIsModalOpen(true);
  }

  // Function to close the modal
  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCompany(null); // Reset the selected company after closing the modal
  }

  // Toggle favorite feature
  function handleToggleFavorite(company) {
    setFavorites((prevFavorites) => {
      const isFavorited = prevFavorites.some((fav) => fav.id === company.id);
      if (isFavorited) {
        return prevFavorites.filter((fav) => fav.id !== company.id);
      } else {
        return [...prevFavorites, company];
      }
    });
  }

  return (
    <div className="container">
      {/* Municipality selection */}
      <MunicipalitySelect onSelect={handleMunicipalitySelect} />
      
      {/* Year selection field */}
      <div className="year-select">
        <label htmlFor="year">Select Year: </label>
        <input
          type="number"
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          min="1900"
          max={new Date().getFullYear()}
        />
      </div>
      
      {/* "Find companies" button with a class name */}
      <div className="search-button-container">
        <button className="search-button" onClick={handleFindCompanies}>Finn bedrifter</button>
      </div>

      {/* Message if no municipality is selected */}
      {selectedMunicipality === null && <p>Please select a municipality to view companies.</p>}

      {/* Error message */}
      {error && <ErrorMessage message={error} />}

      {/* Company list */}
      <CompanyList 
        companies={companyList} 
        onCompanyClick={handleCompanyClick} 
        favorites={favorites} 
        onToggleFavorite={handleToggleFavorite} 
      />

      {/* Company detail modal */}
      <CompanyDetailModal 
        company={selectedCompany} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}

export default App;
