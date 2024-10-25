import './CompanyDetailModal.css';

function CompanyDetailModal({ company, isOpen, onClose }) {
    if (!isOpen || !company) {
      return null;
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
          {/* Company details */}
          <h2>{company.name}</h2>
          <p>Established: {company.established}</p>
          <p>Category: {company.category}</p>
          <p>Employees: {company.employees}</p>
          <p>Industry: {company.industry}</p>
          {/* Close button */}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }
  
  export default CompanyDetailModal;
  