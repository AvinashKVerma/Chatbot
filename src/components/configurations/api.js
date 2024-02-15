export const apiRequest = async (endpoint, data, method) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/${endpoint}`;
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
    console.error("Error in API request:", error);
    throw error; // Re-throwing the error to let the caller handle it
  }
};

export const validation = async (data) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/validate_registration`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ registration_no: data }),
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
    console.error("Error in API request:", error);
    throw error; // Re-throwing the error to let the caller handle it
  }
};

export const correctionApi = async (data, endpoint) => {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      body: data,
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
    console.error("Error in API request:", error);
    throw error; // Re-throwing the error to let the caller handle it
  }
};
