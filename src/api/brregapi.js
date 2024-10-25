export const fetchCompanies = async (municipalityCode, year) => {
  // Dynamically generate the API URL using the specified year
  const url = `https://data.brreg.no/enhetsregisteret/api/enheter?kommunenummer=${municipalityCode}&size=10000&fraStiftelsesdato=${year}-01-01&tilStiftelsesdato=${year}-12-31`;

  try {
    // API request
    const response = await fetch(url);

    // Handle errors if there are any
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch company data: ${response.status} - ${errorData}`);
    }

    // Retrieve data in JSON format
    const data = await response.json();

    // Extract and return necessary company information
    return data._embedded.enheter.map((company) => ({
      id: company.organisasjonsnummer,
      name: company.navn,
      established: company.stiftelsesdato
    }));
  } catch (error) {
    // Error handling
    console.error('Error fetching companies:', error.message);
    throw error;
  }
};
