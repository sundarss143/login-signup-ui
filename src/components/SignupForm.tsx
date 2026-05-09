import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { signupSchema } from "../schemas/authSchema"
import type { SignupFormData } from "../types/authTypes"

const SignupForm = () => {
  const [step, setStep] = useState(1)

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false)

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const role = watch("role")

  const nextStep = async () => {
    let valid = false

    if (step === 1) {
      valid = await trigger(["name", "email"])
    }

    if (step === 2) {
      valid = await trigger([
        "password",
        "confirmPassword",
      ])
    }

    if (valid) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true)

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data
      )

      console.log(response.data)

      localStorage.setItem(
        "signupData",
        JSON.stringify(data)
      )

      toast.success("Signup Successful")
    } catch (error) {
      console.error(error)

      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md"
    >
      {/* PROGRESS BAR */}
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className={`h-2 rounded bg-black transition-all duration-300 ${
            step === 1
              ? "w-1/3"
              : step === 2
              ? "w-2/3"
              : "w-full"
          }`}
        />
      </div>

      <h2 className="text-2xl font-bold text-center">
        Signup
      </h2>

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.name?.message}
            </p>
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.email?.message}
            </p>
          </div>

          <button
            type="button"
            onClick={nextStep}
            className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
          >
            Next
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <div>
            <div className="flex gap-2">
              <input
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Password"
                {...register("password")}
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="bg-gray-200 px-3 rounded hover:bg-gray-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <div className="flex gap-2">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="bg-gray-200 px-3 rounded hover:bg-gray-300"
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword?.message}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 px-4 py-2 rounded w-full hover:bg-gray-400"
            >
              Back
            </button>

            <button
              type="button"
              onClick={nextStep}
              className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <div>
            <select
              {...register("role")}
              className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">
                Select Role
              </option>

              <option value="student">
                Student
              </option>

              <option value="developer">
                Developer
              </option>
            </select>
          </div>

          {/* CONDITIONAL FIELD */}
          {role === "developer" && (
            <div>
              <input
                type="text"
                placeholder="Company Name"
                {...register("company")}
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-300 px-4 py-2 rounded w-full hover:bg-gray-400"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? "Loading..." : "Signup"}
            </button>
          </div>
        </>
      )}
    </form>
  )
}

export default SignupForm