import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom"; // Added missing import
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../services/api"
import { useNavigate } from "react-router-dom"; 

const formSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  age: z.string().refine((val) => {
    const num = parseInt(val);
    return num >= 12 && num <= 110;
  }, "Age must be between 12 and 110"),
  sex: z.enum([
    "Male",
    "Female",
    "Non-Binary",
    "Transgender",
    "Cisgender",
    "Heterosexual",
    "Homosexual",
    "Bisexual",
    "Asexual",
    "Pansexual"
  ]),
  height: z.string(),
  weight: z.string(),
  diet_preference: z.enum([
    "Omnivore",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Halal",
    "Kosher"
  ]),
  allergies: z.string(),
  activity_level: z.enum(["sedentary", "light", "moderate", "very_active"]),
  goal: z.enum(["weight_loss", "muscle_gain", "both"]),
  medical_conditions: z.string(),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      age: "",
      sex: "Male",
      height: "",
      weight: "",
      diet_preference: "Omnivore",
      allergies: "",
      activity_level: "moderate",
      goal: "weight_loss",
      medical_conditions: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
  
      await registerUser(values);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-accent pt-16 px-4"
    >
      <div className="max-w-md mx-auto bg-background rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-serif font-semibold text-center mb-6">
          Create your account
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        {...field} 
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sex</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="diet_preference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diet Preference</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select diet" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="Omnivore">Omnivore</SelectItem>
                      <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="Vegan">Vegan</SelectItem>
                      <SelectItem value="Gluten-Free">Gluten-Free</SelectItem>
                      <SelectItem value="Halal">Halal</SelectItem>
                      <SelectItem value="Kosher">Kosher</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., nuts, dairy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="activity_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="very_active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="weight_loss">Weight Loss</SelectItem>
                      <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                      <SelectItem value="stay_fit">Stay fit</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medical_conditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Conditions</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., diabetes, hypertension" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUp;