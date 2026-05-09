import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigate } from "react-router-dom"

import { loginSchema } from "../schemas/authSchema"
import type { LoginFormData } from "../types/authTypes"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true)

      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data
      )

      console.log(response.data)

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      )

      toast.success("Login Successful")

      navigate("/dashboard")
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
      <h2 className="text-2xl font-bold text-center">
        Login
      </h2>

      {/* EMAIL */}
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

      {/* PASSWORD */}
      <div>
        <div className="flex gap-2">
          <input
            type={
              showPassword
                ? "text"
                : "password"
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
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        <p className="text-red-500 text-sm mt-1">
          {errors.password?.message}
        </p>
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800 disabled:bg-gray-500"
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </form>
  )
}

export default LoginForm