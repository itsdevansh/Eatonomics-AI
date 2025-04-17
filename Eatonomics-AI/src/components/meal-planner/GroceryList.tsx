import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { List } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface GroceryItem {
  ingredient_name: string;
  quantity: string;
  price: number;
}

interface GroceryListProps {
  groceries: GroceryItem[];
  checkedItems: { [key: string]: boolean };
  onToggleItem: (itemName: string) => void;
}

export const GroceryList = ({ groceries, checkedItems, onToggleItem }: GroceryListProps) => {
  const calculateTotal = (items: GroceryItem[]) => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <List className="h-6 w-6" />
          Grocery List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {groceries.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={checkedItems[item.ingredient_name]}
                  onCheckedChange={() => onToggleItem(item.ingredient_name)}
                />
                <span className={checkedItems[item.ingredient_name] ? "line-through" : ""}>
                  {item.ingredient_name}
                </span>
              </div>
              <span className="font-medium">${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-end pt-4 border-t">
            <span className="font-semibold">
              Total: ${calculateTotal(groceries)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};