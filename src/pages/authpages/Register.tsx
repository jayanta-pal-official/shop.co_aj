import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authImg from "../../assets/svgs/auth/frame.svg";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createUser } from "../../querys/userQuery";
// Validation schema with Zod
const registrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be less than 20 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

type RegistrationFormInputs = z.infer<typeof registrationSchema>;

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      reset();
      toast.info("Please login");
      navigate("/auth");
    },
  });

  const onSubmit = (data: RegistrationFormInputs) => {
    let formdata = new FormData();
    let userData = {
      displayName: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
    };

    formdata.append("data", JSON.stringify(userData));
    mutate(formdata);
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message);
    }
  }, [isError]);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800">Register</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create an account to start using our services.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className={`w-full mt-2 px-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full mt-2 px-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Phone Number Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-600"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                className={`w-full mt-2 px-4 py-2 bg-transparent border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={`w-full mt-2 px-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-blue-400"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full flex gap-1 px-4 py-2 btn btn-md transition duration-200"
            >
              {isPending && (
                <span className="loading loading-spinner text-white loading-md"></span>
              )}
              Register
            </button>
          </form>
          <p className="text-black py-2">
            Have an Account
            <Link to={"/auth"} className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2">
          <img
            src={authImg}
            alt="Registration illustration"
            className="object-cover w-full h-full object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
