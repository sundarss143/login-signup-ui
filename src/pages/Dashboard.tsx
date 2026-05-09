import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate()

  const user = localStorage.getItem("user")

  const handleLogout = () => {
    localStorage.removeItem("user")

    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-600">
        Login Successful
      </p>

      <pre className="bg-white p-4 rounded shadow max-w-md overflow-auto">
        {user}
      </pre>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}

export default Dashboard