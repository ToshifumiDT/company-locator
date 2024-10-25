import { fetchCompanies } from './api/brregapi';
import { useState, useEffect } from 'react';
import CompanyDetailModal from './components/CompanyDetailModal';
import CompanyList from './components/CompanyList';
import ErrorMessage from './components/ErrorMessage';
import MunicipalitySelect from './components/MunicipalitySelect';
import './App.css';

function App() {
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Fetch company data when the municipality changes
  useEffect(() => {
    if (selectedMunicipality) {
      setCompanyList([]);  // Clear the list when the municipality is changed
      setError(null);      // Clear the error as well
      // Fetch company data
      fetchCompanies(selectedMunicipality)
        .then(setCompanyList)
        .catch((err) => {
          setError('Failed to obtain company information');
          setCompanyList([]);  // Clear the list in case of an error
        });
    }
  }, [selectedMunicipality]);// Execute when selectedMunicipality changes

   // When a municipality is selected
  function handleMunicipalitySelect(municipality) {
    setSelectedMunicipality(municipality);
  }

  // When a company is clicked
  function handleCompanyClick(company) {
    setSelectedCompany(company);
    setIsModalOpen(true);
  }

  // When closing the modal
  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCompany(null); // Reset the selected company after closing the modal
  }

  // Toggle favorite
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
    <>
      {/* Municipality selection */}
      <MunicipalitySelect onSelect={handleMunicipalitySelect} />
      {/* Message when no municipality is selected */}
      {selectedMunicipality === null && <p>Please select a municipality to view companies.</p>}
      {/* Error message */}
      {error && <ErrorMessage message={error} />}
      {/* Company list */}
      <CompanyList companies={companyList} onCompanyClick={handleCompanyClick} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      {/* Company detail modal */}
      <CompanyDetailModal company={selectedCompany} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default App;
