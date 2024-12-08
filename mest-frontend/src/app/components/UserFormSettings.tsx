"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserPicture from "@/app/components/UserPicture";

// Define the Zod schema for the form
const userSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  nickname: z.string().min(1, "Username required"),
});

type UserSettingsFormData = z.infer<typeof userSettingsSchema>;

const UserSettingsPage = () => {
  const { user, isLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      nickname: user?.nickname || "",
    },
  });

  const onSubmit = (data: UserSettingsFormData) => {
    console.log("Form data submitted:", data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-800 text-white rounded-lg shadow-md">
      <div className="flex items-center gap-6">
        <div className="rounded-full overflow-hidden border-2 border-gray-500">
          <UserPicture size="md" />
        </div>

        <form className="flex-1" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-sm text-gray-400 block" htmlFor="name">
              Username
            </label>
            <input
              {...register("name")}
              className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white"
              id="name"
              type="text"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-400 block" htmlFor="email">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white"
              id="email"
              type="email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-400 block" htmlFor="nickname">
              Nickname (optional)
            </label>
            <input
              {...register("nickname")}
              className="w-full p-2 mt-1 rounded-lg bg-gray-700 text-white"
              id="nickname"
              type="text"
            />
            {errors.nickname && (
              <span className="text-red-500 text-sm">
                {errors.nickname.message}
              </span>
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettingsPage;
