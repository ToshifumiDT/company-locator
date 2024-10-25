function CompanyList({ companies, onCompanyClick, favorites, onToggleFavorite }) {
   // Display message if the company list is empty
  if (companies.length === 0) {
    return <p>No companies found for this municipality.</p>;
  }

  return (
    <div>
      <h2>Company List</h2>
      <ul className="company-list">
        {companies.map((company) => {
           // Check if the company is included in favorites
          const isFavorited = favorites.some((fav) => fav.id === company.id); 

          return (
            <li key={company.id} className="company-item">
              {/* Show details when the company name is clicked */}
              <div className="company-info">
                <div className="company-name" onClick={() => onCompanyClick(company)}>
                  {company.name} (Established: {company.established})
                </div>
                <div className="company-id">Org. Number: {company.id}</div>
              </div>
              {/* Favorite button */}
              <button
                className="favorite-button"
                onClick={() => onToggleFavorite(company)}
              >
                {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


export default CompanyList;