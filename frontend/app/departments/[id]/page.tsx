import DepartmentDetails from "@/app/departments/components/department-details";

export default function GetDepartmentByIdPage({
  params,
}: {
  params: { id: string };
}) {
  return <DepartmentDetails id={params.id} />;
}
