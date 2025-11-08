import React, { useEffect, useState } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((plant) => ({
          ...plant,
          inStock: plant.inStock !== undefined ? plant.inStock : true,
        }));
        setPlants(updatedData);
      })
      .catch((err) => console.error("Error fetching plants:", err));
  }, []);

  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const handleToggleStock = (id) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        return { ...plant, inStock: !plant.inStock };
      }
      return plant;
    });
    setPlants(updatedPlants);
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />

      <div className="searchbar">
        <label htmlFor="search">Search Plants:</label>
        <input
          id="search"
          type="text"
          placeholder="Type a name to search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <PlantList plants={filteredPlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
