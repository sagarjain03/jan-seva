"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Users, CheckCircle, Clock, Plus, Edit, Trash2, BarChart3, Home } from "lucide-react"
import type { Scheme, Application } from "@/types"

interface AdminDashboardProps {
  schemes: Scheme[]
  applications: Application[]
  onAddScheme: (scheme: Partial<Scheme>) => void
  onToggleSchemeStatus: (schemeId: string) => void
  onNavigate: (path: string) => void
}

export default function AdminDashboard({
  schemes,
  applications,
  onAddScheme,
  onToggleSchemeStatus,
  onNavigate,
}: AdminDashboardProps) {
  const [newScheme, setNewScheme] = useState<Partial<Scheme>>({})

  const handleAddScheme = () => {
    if (newScheme.name && newScheme.description) {
      onAddScheme(newScheme)
      setNewScheme({})
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="flex space-x-2">
          <Button onClick={() => onNavigate("/dashboard")} variant="outline">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schemes">Manage Schemes</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{schemes.length}</p>
                    <p className="text-sm text-gray-600">Total Schemes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{applications.length}</p>
                    <p className="text-sm text-gray-600">Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {applications.filter((app) => app.status === "approved").length}
                    </p>
                    <p className="text-sm text-gray-600">Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-8 h-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {applications.filter((app) => app.status === "pending" || app.status === "under-review").length}
                    </p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schemes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Scheme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Scheme Name"
                  value={newScheme.name || ""}
                  onChange={(e) => setNewScheme((prev) => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Category"
                  value={newScheme.category || ""}
                  onChange={(e) => setNewScheme((prev) => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <Textarea
                placeholder="Description"
                value={newScheme.description || ""}
                onChange={(e) => setNewScheme((prev) => ({ ...prev, description: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Benefits"
                  value={newScheme.benefits || ""}
                  onChange={(e) => setNewScheme((prev) => ({ ...prev, benefits: e.target.value }))}
                />
                <Input
                  placeholder="Application Deadline"
                  value={newScheme.applicationDeadline || ""}
                  onChange={(e) => setNewScheme((prev) => ({ ...prev, applicationDeadline: e.target.value }))}
                />
              </div>
              <Button onClick={handleAddScheme} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Scheme
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schemes.map((scheme) => (
                    <TableRow key={scheme.id}>
                      <TableCell>{scheme.name}</TableCell>
                      <TableCell>{scheme.category}</TableCell>
                      <TableCell>
                        <Badge variant={scheme.isActive ? "default" : "secondary"}>
                          {scheme.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => onToggleSchemeStatus(scheme.id)}>
                            {scheme.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application ID</TableHead>
                    <TableHead>Scheme</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.id}</TableCell>
                      <TableCell>{app.schemeName}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            app.status === "approved"
                              ? "default"
                              : app.status === "rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{app.submittedAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            Update Status
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <BarChart3 className="w-16 h-16 text-gray-400" />
                  <p className="text-gray-500 ml-4">Chart placeholder</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schemes.slice(0, 3).map((scheme, index) => (
                    <div key={scheme.id} className="flex items-center justify-between">
                      <span>{scheme.name}</span>
                      <Badge>{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
