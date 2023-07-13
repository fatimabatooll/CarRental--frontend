import { useEffect, useState } from "react";

const useCars = (initialValue) => {
  const [cars, setCars] = useState(initialValue);

  useEffect(() => {
    const loadData = () => {
      const url = "http://localhost:8080/cars/getall";
      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            setCars([]);
            throw new Error("Error fetching cars");
          }
          return response.json();
        })
        .then((data) => {
          setCars(data);
          console.log("Fetched data:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (cars.length === 0) {
      loadData();
    }
  }, [cars]);

  return cars;
};

export default useCars;
