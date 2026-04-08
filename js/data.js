// =============================================
// SHARED FUNCTION: Loads any Google Sheet CSV live
// =============================================
async function loadCSV(url) {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    return Papa.parse(csvText, { 
      header: true, 
      skipEmptyLines: true 
    }).data;
  } catch (error) {
    console.error("Error loading CSV:", error);
    return [];
  }
}
