// import { getUserData } from "@/lib/helpers/get-user-data";
import useUserStore from "@/modules/store/user-store";
import {
  editProfile,
  storeImageUrlInDatabase,
  uploadFile,
} from "@/modules/supabase/utils/actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useEditProfile(userId: string) {
  // const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const {
    mutate: editProfileMutate,
    isPending: isEditingProfile,
    isError: isEditProfileError,
    error: editProfileError,
    isSuccess: isEditProfileSuccess,
  } = useMutation({
    mutationFn: async (updateData: Partial<UserDataType>) => {
      if (!user) {
        throw new Error("No user is logged in.");
      }

      return await editProfile(user.id, updateData);
    },
    onSuccess: async () => {
      toast.success("Profile updated successfully!");
      // Refetch user data to ensure it's up to date
      // const updatedUserData = await getUserData();
      // queryClient.setQueryData(["userData"], updatedUserData);
      //Not cool but try the option of reloading the page
      window.location.reload();
    },
    onError: (error) => {
      toast.error("Error updating profile: " + error.message);
    },
  });

  const {
    mutate: uploadFileMutate,
    isPending: isUploadingFile,
    isError: isUploadFileError,
    error: uploadFileError,
  } = useMutation({
    mutationFn: async (file: File) => {
      // Upload the file to Supabase Storage
      const imageUrl = await uploadFile(userId, file); // assuming `uploadFile` returns the public URL
      if (!imageUrl) {
        throw new Error("Failed to upload image.");
      }

      // Store the image URL in the database
      await storeImageUrlInDatabase(userId, imageUrl as string);
    },
    onSuccess: () => {
      toast.success("Profile picture updated successfully!");
      // Optionally, you can also update your local state or refetch queries
      window.location.reload();
    },
    onError: (error) => {
      toast.error(
        "Error uploading file: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    },
  });

  return {
    editProfileMutate,
    isEditingProfile,
    isEditProfileError,
    editProfileError,
    isEditProfileSuccess,
    uploadFileMutate,
    isUploadingFile,
    isUploadFileError,
    uploadFileError,
  };
}
