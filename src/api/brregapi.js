export const fetchCompanies = async (municipalityCode) => {
    // API endpoint URL
  const url = `https://data.brreg.no/enhetsregisteret/api/enheter?kommunenummer=${municipalityCode}&size=10000&fraStiftelsesdato=2022-01-01&tilStiftelsesdato=2024-12-31`;

  try {
    // API request
    const response = await fetch(url);
    // Check for errors in the response
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch company data: ${response.status} - ${errorData}`);
    }

    // Convert the data to JSON format
    const data = await response.json();

    // Extract the necessary company information
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
