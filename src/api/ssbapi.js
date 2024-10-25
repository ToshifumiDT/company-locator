export const fetchMunicipalities = async () => {
      // API endpoint URL
    const url = 'https://data.ssb.no/api/klass/v1/versions/1847.json'; 
  
    try {
      // API request
      const response = await fetch(url);
      // Check for errors in the response
      if (!response.ok) {
        throw new Error('Failed to fetch municipalities');
      }
  
      // Convert the data to JSON format
      const data = await response.json();
  
      // Extract the necessary data (municipality code and name)
      return data.classificationItems.map((municipality) => ({
        code: municipality.code,   
        name: municipality.name,    
      }));
    } catch (error) {
      // Error handling
      console.error('Error fetching municipalities:', error);
      throw error;
    }
  };
  