import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { MealCard } from "./MealCard";

interface MealListProps {
  meals: Array<{
    meal_name: string;
    nutritional_info: Array<{
      macro: string;
      quantity: string;
    }>;
    ingredients: Array<{
      ingredient_name: string;
      quantity: string;
    }>;
    recipe: string;
  }>;
}

export const MealList = ({ meals }: MealListProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calendar className="h-6 w-6" />
          Weekly Meals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <MealCard key={index} {...meal} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};