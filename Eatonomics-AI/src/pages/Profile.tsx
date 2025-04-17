import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { handleApiResponse } from "@/utils/apiHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {getCurrentUser, updateUser} from "../services/api"

interface UserInfo {
  username: string;
  email: string;
  age: string;
  sex: string;
  height: string;
  weight: string;
  dietPreference: string;
  allergies: string;
  activityLevel: string;
  goal: string;
  medicalConditions: string;
  phone: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    age: "25",
    sex: "Non-Binary",
    height: "170",
    weight: "70",
    dietPreference: "Omnivore",
    allergies: "None",
    activityLevel: "moderate",
    goal: "weight_loss",
    medicalConditions: "None"
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const accessToken = localStorage.getItem("token");
      console.log(accessToken);
      if (!accessToken) {
        navigate("/login");
        return;
      }

      const result = await getCurrentUser(accessToken);
      console.log(result);
      if (result.success) {
        setUserInfo((prev) => ({
          ...prev,
          ...result.data, // Merge API data with existing defaults
        }));
      } else {
        setError(result.message || "Failed to fetch user data");
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleSave = async () => {
    // Example of how to use the API handler (commented out until API routes are added)
    const accessToken = localStorage.getItem("token");
    const result = await updateUser(userInfo, accessToken)
    
    if (result.success) {
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } else {
      setIsEditing(false);
      toast.error("Profile could not be updated");
    }



  
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
            Profile
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>
            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
                disabled={!isEditing}
              />
            </div> */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Age</label>
                <Input
                  type="number"
                  value={userInfo.age}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, age: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sex</label>
                <Select
                  value={userInfo.sex}
                  onValueChange={(value) =>
                    setUserInfo({ ...userInfo, sex: value })
                  }
                  disabled={!isEditing}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Non-Binary">Non-Binary</SelectItem>
                    <SelectItem value="Transgender">Transgender</SelectItem>
                    <SelectItem value="Cisgender">Cisgender</SelectItem>
                    <SelectItem value="Heterosexual">Heterosexual</SelectItem>
                    <SelectItem value="Homosexual">Homosexual</SelectItem>
                    <SelectItem value="Bisexual">Bisexual</SelectItem>
                    <SelectItem value="Asexual">Asexual</SelectItem>
                    <SelectItem value="Pansexual">Pansexual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (cm)</label>
                <Input
                  type="number"
                  value={userInfo.height}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, height: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (kg)</label>
                <Input
                  type="number"
                  value={userInfo.weight}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, weight: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Diet Preference</label>
              <Select
                value={userInfo.dietPreference}
                onValueChange={(value) =>
                  setUserInfo({ ...userInfo, dietPreference: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select diet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Omnivore">Omnivore</SelectItem>
                  <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="Vegan">Vegan</SelectItem>
                  <SelectItem value="Gluten-Free">Gluten-Free</SelectItem>
                  <SelectItem value="Halal">Halal</SelectItem>
                  <SelectItem value="Kosher">Kosher</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Allergies</label>
              <Input
                value={userInfo.allergies}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, allergies: e.target.value })
                }
                placeholder="e.g., nuts, dairy"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Level</label>
              <Select
                value={userInfo.activityLevel}
                onValueChange={(value) =>
                  setUserInfo({ ...userInfo, activityLevel: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="very_active">Very Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Goal</label>
              <Select
                value={userInfo.goal}
                onValueChange={(value) =>
                  setUserInfo({ ...userInfo, goal: value })
                }
                disabled={!isEditing}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weight_loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Medical Conditions</label>
              <Input
                value={userInfo.medicalConditions}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, medicalConditions: e.target.value })
                }
                placeholder="e.g., diabetes, hypertension"
                disabled={!isEditing}
              />
            </div>
          </div>
          {isEditing && (
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;