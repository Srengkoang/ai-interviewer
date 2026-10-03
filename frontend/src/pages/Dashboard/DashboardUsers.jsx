import React from 'react'
import DashboardSidebar from './DashboardSidebar'

const DashboardUsers = () => {

  const users = [
  { id: 1, name: "John Smith", email: "john@gmail.com", role: "Frontend Developer", status: "Active", interview: "Completed" },
  { id: 2, name: "Emma Brown", email: "emma@gmail.com", role: "Backend Developer", status: "Pending", interview: "Not Yet" },
  { id: 3, name: "Michael Lee", email: "michael@gmail.com", role: "Full Stack Developer", status: "Inactive", interview: "Not Yet" },
  { id: 4, name: "Sophia Kim", email: "sophia@gmail.com", role: "UI Designer", status: "Active", interview: "Not Yet" },
  { id: 5, name: "Daniel Park", email: "daniel@gmail.com", role: "Software Engineer", status: "Active", interview: "Completed" },
  { id: 6, name: "Olivia Chen", email: "olivia@gmail.com", role: "Data Analyst", status: "Inactive", interview: "Not Yet" },
  { id: 7, name: "James Wilson", email: "james@gmail.com", role: "Frontend Developer", status: "Active", interview: "Not Yet" },
  { id: 8, name: "Ava Taylor", email: "ava@gmail.com", role: "Backend Developer", status: "Pending", interview: "Not Yet" },
  { id: 9, name: "William Davis", email: "william@gmail.com", role: "DevOps Engineer", status: "Active", interview: "Not Yet" },
  { id: 10, name: "Mia Anderson", email: "mia@gmail.com", role: "QA Engineer", status: "Inactive", interview: "Not Yet" },
  { id: 11, name: "Lucas Martin", email: "lucas@gmail.com", role: "Frontend Developer", status: "Active", interview: "Completed" },
  { id: 12, name: "Isabella Moore", email: "isabella@gmail.com", role: "Product Manager", status: "Active", interview: "Not Yet" },
  { id: 13, name: "Henry Jackson", email: "henry@gmail.com", role: "Backend Developer", status: "Pending", interview: "Completed" },
  { id: 14, name: "Charlotte White", email: "charlotte@gmail.com", role: "UX Designer", status: "Inactive", interview: "Not Yet" },
  { id: 15, name: "Benjamin Harris", email: "ben@gmail.com", role: "Software Engineer", status: "Active", interview: "Completed" },
  { id: 16, name: "Amelia Clark", email: "amelia@gmail.com", role: "Data Scientist", status: "Active", interview: "Completed" },
  { id: 17, name: "Ethan Lewis", email: "ethan@gmail.com", role: "Full Stack Developer", status: "Pending", interview: "Not Yet" },
  { id: 18, name: "Harper Walker", email: "harper@gmail.com", role: "Frontend Developer", status: "Inactive", interview: "Not Yet" },
  { id: 19, name: "Alexander Hall", email: "alex@gmail.com", role: "Backend Developer", status: "Active", interview: "Not Yet" },
  { id: 20, name: "Ella Young", email: "ella@gmail.com", role: "Software Engineer", status: "Active", interview: "Completed" },
];
  return (
    <div className="flex min-h-screen">

      <DashboardSidebar />


      <main className="flex-1 p-6">

        {/* Title */}
        <div className="mt-6">
          <h1 className="font-bold text-3xl lg:text-4xl text-[#9AB17A]">
            Users
          </h1>
        </div>


        {/* Table */}
        <div className="mt-8 overflow-x-auto">

          <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden">

            <thead>
              <tr className="bg-[#9AB17A] text-white">

                <th className="p-3 border">
                  ID
                </th>

                <th className="p-3 border">
                  Name
                </th>

                <th className="p-3 border">
                  Email
                </th>

                <th className="p-3 border">
                  Role
                </th>

                <th className="p-3 border">
                  Interview
                </th>

                <th className="p-3 border">
                  Status
                </th>

              </tr>
            </thead>


            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-gray-100"
                >

                  <td className="p-3 border text-center">
                    {user.id}
                  </td>


                  <td className="p-3 border">
                    {user.name}
                  </td>


                  <td className="p-3 border">
                    {user.email}
                  </td>


                  <td className="p-3 border">
                    {user.role}
                  </td>

                  <td className="p-3 border text-center">
                    <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.interview === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                      }`}
                    >
                    {user.interview}
                    </span>
                  </td>
                
                  <td className="p-3 border">

                    <div className="flex items-center justify-center gap-3">


                      {/* Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>


                      {/* Edit */}
                      <button
                        className="p-2 rounded hover:bg-blue-100 text-blue-600"
                      >
                        ✏️
                      </button>


                      {/* Delete */}
                      <button
                        className="p-2 rounded hover:bg-red-100 text-red-600"
                      >
                        🗑️
                      </button>


                    </div>

                  </td>


                </tr>

              ))}

            </tbody>

          </table>

        </div>


      </main>

    </div>
  )
}

export default DashboardUsers