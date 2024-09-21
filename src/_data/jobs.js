const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  async function fetchSheetData(sheetId, sheetIndex) {
    try {
      const url = `https://api-sheets-bhansa.netlify.app/.netlify/functions/fetchSheetsData?sheetId=${sheetId}&sheetIndex=${sheetIndex}`;
      const response = await EleventyFetch(url, {
        duration: "2h", // 2 hours
        type: "json", // also supports "text" or "buffer"
      });
      if (response) {
        return response;
      }
      console.error(
        `An error occurred while retrieving sheet data. Response status: ${response.status}, Status text: ${response.statusText}`
      );``
      return [];
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
  const fetchJobsData = async () => {
    try {
      const sheetId = "1CwtNPOKukqAWD_r_R212t16pfZi-ed1tYAbd46mNcl0";
      const sheetIndex = 0;
      const jobsData = await fetchSheetData(sheetId, sheetIndex);
      const approvedJobs = jobsData
        .filter((job) => job.Approved === "TRUE")
        .map((row) => ({
          email: row["Email"],
          companyName: row["Company Name"],
          companyDescription: row["Company Description"],
          companyWebsite: row["Company Website"],
          jobTitle: row["Job Title"],
          jobType: row["Job Type"],
          jobDescription: row["Job Description"],
          jobLocation: row["Job Location"],
          jobApplicationLink: row["Job Application Link"],
          skills: row["Skills (Optional)"],
          comments: row["Comments"],
        }));
      return approvedJobs;
    } catch (error) {
      console.error("Error fetching jobs data:", error);
      return [];
    }
  };

  // fetch jobs dat
  return fetchJobsData();

};
