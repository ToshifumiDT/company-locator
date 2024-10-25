import '../App.css';

function FavoriteButton({ company, isFavorited, onToggleFavorite }) {
  // Do not display if company does not exist
    if (!company) {
      return null;
    }
  
    return (
      // Toggle favorite status when the button is clicked
      <button onClick={() => onToggleFavorite(company)}>
        {/* Button text based on the favorite status */}
        {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    );
  }
  
  export default FavoriteButton;
  