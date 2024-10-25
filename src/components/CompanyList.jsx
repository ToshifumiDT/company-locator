function CompanyList({ companies, onCompanyClick, favorites, onToggleFavorite }) {
  if (companies.length === 0) {
    return <p>No companies found for this municipality.</p>;
  }

  return (
    <div>
      <h2>Company List</h2>
      <ul className="company-list">
        {companies.map((company) => (
          <li key={company.id} className="company-item">
            {/* Display company information on the left side, arranged vertically */}
            <div className="company-info">
              <div className="company-name" onClick={() => onCompanyClick(company)}>
                {company.name} (Established: {company.established})
              </div>
              <div className="company-id">Org. Number: {company.id}</div>
            </div>
            {/* Display favorite button on the right side */}
            <button
              className="favorite-button"
              onClick={() => onToggleFavorite(company)}
            >
              {favorites.includes(company) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default CompanyList;