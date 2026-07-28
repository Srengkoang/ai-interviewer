import React from 'react'
import DashboardSidebar from './DashboardSidebar'

const DashboardTotalInterviews = () => {

  const users = [
{ id: 1,  name: "John Smith",      interview: "Completed" },
{ id: 5,  name: "Daniel Park",     interview: "Completed" },
{ id: 11, name: "Lucas Martin",    interview: "Completed" },
{ id: 13, name: "Henry Jackson",   interview: "Completed" },
{ id: 15, name: "Benjamin Harris", interview: "Completed" },
{ id: 16, name: "Amelia Clark",    interview: "Completed" },
{ id: 20, name: "Ella Young",      interview: "Completed" },
  ];

  const completedInterviews = users.filter(
    (user) => user.interview === "Completed"
  );

  return (
    <div className="flex min-h-screen">

      <DashboardSidebar />

      <main className="flex-1 p-6">

        <div className="mt-6">
          <h1 className="font-bold text-3xl lg:text-4xl text-[#9AB17A]">
            Completed Interviews
          </h1>
        </div>

        <div className="mt-8 overflow-x-auto">

          <table className="w-full border-collapse rounded-lg shadow-lg overflow-hidden">

            <thead>
              <tr className="bg-[#9AB17A] text-white">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Role</th>
                <th className="p-3 border">Interview</th>
              </tr>
            </thead>

            <tbody>

              {completedInterviews.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-gray-100"
                >

                  <td className="p-3 border text-center">{user.id}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.role}</td>

                  <td className="p-3 border text-center">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                      Completed
                    </span>
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

export default DashboardTotalInterviews