import React from "react";
import { Text } from "@/modules/common/ui/text";
import PreviewWithModal from "../preview-with-modal";
import useUserStore from "@/modules/store/user-store";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/modules/supabase/utils/actions";
import { toast } from "sonner";
import { CircleDot, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/modules/common/ui/button";
import { useRouter } from "next/navigation";

export default function DeleteAccountModal() {
  const setIsDeleteAccount = useUserStore((state) => state.setIsDeleteAccount);
  const user = useUserStore((state) => state.user);

  const router = useRouter();

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: async () => {
      await deleteUser(user?.id || "");
    },
    onSuccess: () => {
      setIsDeleteAccount(false);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <PreviewWithModal
      closeModal={() => setIsDeleteAccount(false)}
      title='Delete Account'
      width='w-[90vw] md:w-[70vw] lg:w-[30rem]'
      ariaLabel='Delete Account'>
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col items-center'>
          <Text variant={"h5"} className='font-semibold'>
            Are you sure you want to delete your account?
          </Text>
          <Text variant={"p"}>This action will delete all your data.</Text>
        </div>

        <div className='w-full rounded-lg max grid place-items-center border border-orange-400 bg-orange-100 p-4'>
          <TriangleAlert
            size={35}
            strokeWidth={1.5}
            className='text-orange-400 mb-4'
          />
          <div className='flex flex-col space-y-2'>
            <div className='flex items-center space-x-2 '>
              <CircleDot
                size={20}
                strokeWidth={1.5}
                className='text-orange-400'
              />
              <Text variant={"p"} className='font-medium'>
                This action cannot be undone.
              </Text>
            </div>

            <div className='flex items-start space-x-2'>
              <CircleDot
                size={20}
                strokeWidth={1.5}
                className='text-orange-400'
              />
              <Text variant={"p"} className='font-medium'>
                Your tasks, groups, files, and personal information will be
                deleted.
              </Text>
            </div>
            <div className='flex items-start space-x-2'>
              <CircleDot
                size={20}
                strokeWidth={1.5}
                className='text-orange-400'
              />
              <Text variant={"p"} className='font-medium'>
                You will no longer be able to access this account.
              </Text>
            </div>
          </div>
        </div>
        <div className=''>
          <Text variant={"p"} className='text-center'>
            If you&apos;re facing issues, you can{" "}
            <Link href={"/dashboard"} className='text-blue-500'>
              Contact Support
            </Link>{" "}
            instead.
          </Text>
        </div>

        <div className='flex items-center justify-between'>
          <Button variant={"outline"} onClick={() => setIsDeleteAccount(false)}>
            Cancel
          </Button>
          <Button
            isLoading={isPending}
            variant={"destructive"}
            onClick={() => deleteAccount()}>
            Delete Account
          </Button>
        </div>
      </div>
    </PreviewWithModal>
  );
}
