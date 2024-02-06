export const apiRequest = async (endpoint, data, method) => {
  try {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const url = baseURL + endpoint;
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    if (response.status === 200) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    // Properly handle the error here, for example:
    console.error("Error in API request:", error);
    throw error; // Re-throwing the error to let the caller handle it
  }
};
