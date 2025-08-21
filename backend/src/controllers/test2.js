const hasSolvedProblem = async (username, titleSlug) => {
    const baseUrl = "https://leetcode.com/api/submissions/";
    let offset = 0;
    const limit = 20;  // Number of submissions to fetch per request
    let lastKey = null;
    let problemSolved = false;
  
    while (true) {
      console.log(`Fetching submissions with offset: ${offset}, lastKey: ${lastKey}`);
  
      try {
        // Construct the URL for the request with pagination
        const url = `${baseUrl}?offset=${offset}&limit=${limit}&lastkey=${lastKey || ""}`;
  
        const response = await fetch(url);
        const data = await response.json();
  
        // Log the raw data to understand the response structure
        console.log("Raw Response Data:", data);
  
        if (!data || !data.submissions || data.submissions.length === 0) {
          console.log("❌ No more submissions found or no submissions available.");
          break; // Stop if no more submissions are available
        }
  
        console.log(`Fetched ${data.submissions.length} submissions.`);
        
        // Check if the problem has been solved
        for (let submission of data.submissions) {
          if (submission.titleSlug === titleSlug && submission.status === "Accepted") {
            console.log(`✅ Found solved problem: ${titleSlug}`);
            problemSolved = true;
            break;
          }
        }
  
        if (problemSolved) {
          break; // Stop the loop if the problem is solved
        }
  
        // If there are more submissions, update the offset and lastKey for pagination
        offset += limit;
        lastKey = data.last_key || null; // Update lastKey for the next batch
        console.log(`Moving to next batch with offset: ${offset}, lastKey: ${lastKey}`);
  
      } catch (error) {
        console.error("Error fetching submissions:", error);
        return false;
      }
    }
  
    return problemSolved;
  };
  
  // Example Usage
  hasSolvedProblem("tanaynagde", "create-hello-world-function").then((solved) =>
    console.log(solved ? "✅ Problem Solved" : "❌ Problem Not Solved")
  );
  