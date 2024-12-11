"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_DEPARTMENTS, UPDATE_DEPARTMENT } from "@/lib/graphql/queries";
import { DepartmentForm } from "../../components/department-form";
import { Card, CardHeader } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function EditDepartmentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { data, loading } = useQuery(GET_DEPARTMENTS);
  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);

  if (loading) return <div>Loading...</div>;

  const department = data?.departments.find((d: any) => d.id === params.id);

  if (!department) return <div>Department not found</div>;

  const handleSubmit = async (formData: any) => {
    try {
      await updateDepartment({
        variables: {
          id: params.id,
          input: formData,
        },
      });
      toast({
        title: "Success",
        description: "Department updated successfully",
      });
      router.push("/departments");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Edit Department</h2>
            </div>
          </CardHeader>
          <DepartmentForm
            initialData={department}
            onSubmit={handleSubmit}
            submitLabel="Update Department"
          />
        </Card>
      </div>
    </div>
  );
}