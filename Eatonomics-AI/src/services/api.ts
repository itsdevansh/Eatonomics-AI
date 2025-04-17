import { useState } from "react";

export const registerUser = async (values) => {
  try {
    const response = await fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);  // User registered successfully
    } else {
      const error = await response.json();
      alert(error.detail);  // Error message
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

// Usage example


export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:8000/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Access token:", result.access_token);  // Access token returned
      return result.access_token
      // Store token in localStorage or context for use in other requests
    } else {
      const error = await response.json();
      alert(error.detail);  // Error message
      return null
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export const getCurrentUser = async (accessToken) => {
  try {
    const response = await fetch("http://localhost:8000/users/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: JSON.parse(result['data']) }; // Parse the returned data
    } else {
      const error = await response.json();
      return { success: false, message: error.detail || "Failed to fetch user data" };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, message: "Network error" };
  }
};

export const updateUser = async (userData, accessToken) => {
  try {
    const response = await fetch("http://localhost:8000/users/update_user/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Include the token in the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Send user data in the request body
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, message: result.message };
    } else {
      const error = await response.json();
      return { success: false, message: error.detail || "Failed to update user data" };
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    return { success: false, message: "Network error" };
  }
};

export const fetchGroceryList = async (week, accessToken) => {
  try {
    const response = await fetch(`http://localhost:8000/grocery/grocery-list/${week}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err.message);
    return { success: false, message: "Cannot make a request" };
  }
};

export const fetchWeek = async(accessToken) => {
  try {
    const response = await fetch('http://localhost:8000/grocery/get_week', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err.message);
  }
};

export const fetchMeals = async (week, token) => {
  try {
    const response = await fetch(`http://localhost:8000/meals/meals/${week}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      return [];
    }
    const data = await response.json(); 
    return data.data;
  } catch (error) {
    if (error.response) {
      // Handle known error responses (e.g., 404, 500)
      console.error('Error fetching meals:', error.response.data.detail || error.response.data.message);
      return [];
    } else {
      console.error('Error fetching meals:', error.message);
      return [];
    }
  }
};
