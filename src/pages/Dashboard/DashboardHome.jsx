import React from 'react'
import DashboardSidebar from './DashboardSidebar'
import DashboardOverview from './DashboardOverview'

const DashboardHome = () => {
  return (
    <>
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <DashboardOverview />
      </main>
    </div>
    </>
  )
}

export default DashboardHome