import { useState, useEffect } from "react";
import { WeekSelector } from "@/components/meal-planner/WeekSelector";
import { MealList } from "@/components/meal-planner/MealList";
import { GroceryList } from "@/components/meal-planner/GroceryList";

// API functions (these should be implemented in your API utilities)
import { fetchMeals, fetchWeek, fetchGroceryList } from "../services/api";

const MealPlanner = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [meals, setMeals] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const token = localStorage.getItem("token")
  // Fetch the current week and data
  useEffect(() => {
    const getWeekData = async () => {
      const week = await fetchWeek(token);  // Fetch the current week
      const weeks = JSON.parse(week)
      if (weeks.length != 0) {
        setWeekData(weeks);
        setSelectedWeek(weeks[0]);
      }
    };
    
    getWeekData();
  }, []);

  // Fetch meals and groceries for the selected week
  useEffect(() => {
    const getMealData = async () => {
      const fetchedMeals = await fetchMeals(selectedWeek, token);  // Fetch meals for the selected week
      if (JSON.parse(fetchedMeals).length != 0) {
        setMeals(JSON.parse(fetchedMeals));
      }
    };

    const getGroceryData = async () => {
      const fetchedGroceries = await fetchGroceryList(selectedWeek, token);  // Fetch groceries for the selected week
      if (fetchedGroceries) {
        setGroceries(JSON.parse(fetchedGroceries).groceries);
      }
    };

    if (weekData.length != 0) {
      getMealData();
      getGroceryData();
    }
  }, [selectedWeek, weekData]);

  const toggleGroceryItem = (itemName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <WeekSelector
        selectedWeek={selectedWeek}
        onWeekChange={setSelectedWeek}
        weeks={weekData}  // Assume this will be just one week
      />
      <div className="space-y-8">
        {/* Render Meals or a message if the list is empty */}
        {meals.length > 0 ? (
          <MealList meals={meals} />
        ) : (
          <p className="text-center text-gray-500">No meals available for this week.</p>
        )}

        {/* Render Groceries or a message if the list is empty */}
        {groceries.length > 0 ? (
          <GroceryList
            groceries={groceries}
            checkedItems={checkedItems}
            onToggleItem={toggleGroceryItem}
          />
        ) : (
          <p className="text-center text-gray-500">No groceries available for this week.</p>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;
