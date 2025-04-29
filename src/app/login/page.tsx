export default function LoginPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-80">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <input 
            type="text" 
            placeholder="Admin User Name" 
            className="w-full p-2 mb-4 border rounded"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-2 mb-6 border rounded"
          />
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            LOGIN
          </button>
        </div>
      </div>
    )
  }