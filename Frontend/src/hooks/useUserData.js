import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const URL = "http://localhost:3000/user/getDetails";
    const fetchUserData = async () => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        if (response.ok) {
          console.log("User data fetched successfully:", data.data);
          setUserData(data.data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error in fetchUserData:", error);
      }
    };

    fetchUserData();
  }, []);

  return { userData, setUserData };
};

export default useUserData; 