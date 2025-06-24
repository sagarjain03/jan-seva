"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Users, CheckCircle, Clock, Plus, Edit, Trash2, BarChart3, Home } from "lucide-react"
import type { Scheme, Application } from "@/types"

export default function AdminDashboard() {
  const router = useRouter();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [applications] = useState<Application[]>([]); // Placeholder for applications
  const [newScheme, setNewScheme] = useState<Partial<Scheme>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);

  // Fetch schemes from backend
  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/schemes");
      const data = await response.json();
      if (response.ok) {
        setSchemes(data.schemes);
      } else {
        setError(data.error || "Failed to fetch schemes");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create new scheme
  const createScheme = async (schemeData: Partial<Scheme>) => {
    try {
      const response = await fetch("/api/schemes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(schemeData),
      });

      const data = await response.json();
      if (response.ok) {
        fetchSchemes(); // Refresh scheme list
        return data.scheme;
      } else {
        throw new Error(data.error || "Failed to create scheme");
      }
    } catch (err) {
      console.error("Create scheme error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  // Toggle scheme status
  const toggleSchemeStatus = async (schemeId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/schemes/${schemeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchSchemes(); // Refresh scheme list
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to update scheme");
      }
    } catch (err) {
      console.error("Toggle status error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  // Delete a scheme
  const deleteScheme = async (schemeId: string) => {
    if (!confirm("Are you sure you want to delete this scheme?")) return;
    
    try {
      const response = await fetch(`/api/schemes/${schemeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchSchemes(); // Refresh scheme list
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete scheme");
      }
    } catch (err) {
      console.error("Delete scheme error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  // Initialize edit form
  const initEditForm = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setNewScheme({
      name: scheme.name,
      description: scheme.description,
      category: scheme.category,
      eligibility: scheme.eligibility,
      documents: scheme.documents,
      benefits: scheme.benefits,
      applicationDeadline: scheme.applicationDeadline,
      isActive: scheme.isActive
    });
  };

  // Update existing scheme
  const updateScheme = async () => {
    if (!editingScheme || !newScheme.name || !newScheme.description) return;
    
    try {
      const response = await fetch(`/api/schemes/${editingScheme.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newScheme),
      });

      if (response.ok) {
        fetchSchemes(); // Refresh scheme list
        setEditingScheme(null);
        setNewScheme({});
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to update scheme");
      }
    } catch (err) {
      console.error("Update scheme error:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  const handleAddScheme = () => {
    if (newScheme.name && newScheme.description) {
      createScheme(newScheme);
      setNewScheme({});
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="flex space-x-2">
          <Button onClick={() => router.push("/dashboard")} variant="outline">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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
                    <p className="text-2xl font-bold">
                      {loading ? "..." : schemes.length}
                    </p>
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
              <CardTitle>
                {editingScheme ? "Edit Scheme" : "Add New Scheme"}
              </CardTitle>
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
              {editingScheme ? (
                <div className="flex space-x-2">
                  <Button 
                    onClick={updateScheme} 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Update Scheme
                  </Button>
                  <Button 
                    onClick={() => {
                      setEditingScheme(null);
                      setNewScheme({});
                    }} 
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={handleAddScheme} 
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Scheme
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Schemes</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading schemes...</p>
              ) : schemes.length === 0 ? (
                <p>No schemes found</p>
              ) : (
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleSchemeStatus(scheme.id, scheme.isActive)}
                          >
                            {scheme.isActive ? "Deactivate" : "Activate"}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => initEditForm(scheme)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteScheme(scheme.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              )}
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