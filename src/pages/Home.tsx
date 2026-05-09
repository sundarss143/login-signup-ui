import { useEffect, useState } from "react"

import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"

const Home = () => {
  const [isLogin, setIsLogin] = useState(true)

  const [darkMode, setDarkMode] =
    useState(false)

  useEffect(() => {
    const theme =
      localStorage.getItem("theme")

    if (theme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add(
        "dark"
      )
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)

    if (!darkMode) {
      document.documentElement.classList.add(
        "dark"
      )

      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove(
        "dark"
      )

      localStorage.setItem("theme", "light")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6 transition-all">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-all">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold dark:text-white">
            Auth UI
          </h1>

          <button
            onClick={toggleDarkMode}
            className="bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* TOGGLE */}
        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 p-2 rounded-l-lg ${
              isLogin
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 p-2 rounded-r-lg ${
              !isLogin
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  )
}

export default Home