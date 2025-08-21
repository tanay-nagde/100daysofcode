const fetchSolvedProblems = async (username, limit ) => {
    const query = `
      query getRecentSubmissions($username: String!, $limit: Int) {
        recentSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
          statusDisplay
          lang
        }
      }
    `;
  
    try {
      const response = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { username, limit } }),
      });
  
      const data = await response.json();
      return data.data?.recentSubmissionList || []; // Return fetched problems
    } catch (error) {
      console.error("Error fetching solved problems:", error);
      return [];
    }
  };
  
  // Example Usage
  fetchSolvedProblems("tanaynagde", 50)
  .then((problems) => problems.filter((problem) => problem.statusDisplay === "Accepted"))
  .then(console.log)
  .catch(console.error);
 // Fetch last 20 submissions
  