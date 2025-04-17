import { toast } from "sonner";

export interface ApiResponse<T> {
  data: T | null;
  message: string;
}

export const handleApiResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  try {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: "An unexpected error occurred",
      }));
      
      toast.error(errorData.message || "Request failed");
      
      return {
        data: null,
        message: response['message'],
      };
    }

    const data = await response.json();
    return {
      data,
      message: response['message'],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    toast.error(errorMessage);
    
    return {
      data: null,
      message: "Error"
    };
  }
};

// Example usage:
/*
const fetchUserProfile = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  return handleApiResponse<UserProfile>(response);
};
*/