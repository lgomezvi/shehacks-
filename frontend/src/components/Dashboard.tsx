// app/components/Dashboard.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardProps {
  email: string;
}

export default function Dashboard({ email }: DashboardProps) {
  // Dummy data
  const userData = {
    projects: [
      { id: 1, name: "Project Alpha", status: "In Progress" },
      { id: 2, name: "Project Beta", status: "Completed" },
      { id: 3, name: "Project Gamma", status: "Planning" }
    ],
    recentActivity: [
      "Updated Project Alpha documentation",
      "Submitted final report for Project Beta",
      "Created new task in Project Gamma"
    ],
    stats: {
      totalProjects: 3,
      completedTasks: 12,
      pendingTasks: 5
    }
  }

  return (
    <div className="space-y-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {email}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-bold">Total Projects</h3>
              <p className="text-2xl">{userData.stats.totalProjects}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="font-bold">Completed Tasks</h3>
              <p className="text-2xl">{userData.stats.completedTasks}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="font-bold">Pending Tasks</h3>
              <p className="text-2xl">{userData.stats.pendingTasks}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {userData.projects.map(project => (
                <li key={project.id} className="flex justify-between items-center">
                  <span>{project.name}</span>
                  <span className="text-sm text-gray-500">{project.status}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {userData.recentActivity.map((activity, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {activity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}