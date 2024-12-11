"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";

const departmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  headCount: z.number().min(0, "Head count must be positive"),
});

type DepartmentFormData = z.infer<typeof departmentSchema>;

interface DepartmentFormProps {
  initialData?: DepartmentFormData;
  onSubmit: (data: DepartmentFormData) => Promise<void>;
  submitLabel: string;
}

export function DepartmentForm({
  initialData,
  onSubmit,
  submitLabel,
}: DepartmentFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Department Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="e.g., Human Resources"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Brief description of the department's responsibilities"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="headCount">Head Count</Label>
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="headCount"
              type="number"
              className="pl-10"
              {...register("headCount", { valueAsNumber: true })}
              placeholder="Number of employees"
            />
          </div>
          {errors.headCount && (
            <p className="text-sm text-red-500">{errors.headCount.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </CardFooter>
    </form>
  );
}
