import './FavoriteButton.css';

function FavoriteButton({ company, isFavorited, onToggleFavorite }) {
    if (!company) {
      return null;
    }
  
    return (
      <button onClick={() => onToggleFavorite(company)}>
        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    );
  }
  
  export default FavoriteButton;
  