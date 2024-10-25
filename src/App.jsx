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

  useEffect(() => {
    if (selectedMunicipality) {
      setCompanyList([]);  // Clear the list when the municipality is changed
      setError(null);      // Clear the error as well
      fetchCompanies(selectedMunicipality)
        .then(setCompanyList)
        .catch((err) => {
          setError('Failed to obtain company information');
          setCompanyList([]);  // Clear the list in case of an error
        });
    }
  }, [selectedMunicipality]);

  function handleMunicipalitySelect(municipality) {
    setSelectedMunicipality(municipality);
  }

  function handleCompanyClick(company) {
    setSelectedCompany(company);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCompany(null); // Reset the selected company after closing the modal
  }

  function handleToggleFavorite(company) {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(company)
        ? prevFavorites.filter((fav) => fav !== company)
        : [...prevFavorites, company]
    );
  }

  return (
    <>
      <MunicipalitySelect onSelect={handleMunicipalitySelect} />
      {selectedMunicipality === null && <p>Please select a municipality to view companies.</p>}
      {error && <ErrorMessage message={error} />}
      <CompanyList companies={companyList} onCompanyClick={handleCompanyClick} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      <CompanyDetailModal company={selectedCompany} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default App;
