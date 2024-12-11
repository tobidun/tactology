"use client";

import { useQuery, useMutation } from "@apollo/client";
import { GET_DEPARTMENTS, CREATE_DEPARTMENT, UPDATE_DEPARTMENT } from "@/lib/graphql/queries";
import { Department } from "@/lib/types";

export function useDepartments() {
  const { data, loading, error } = useQuery(GET_DEPARTMENTS);
  const [createDepartment] = useMutation(CREATE_DEPARTMENT);
  const [updateDepartment] = useMutation(UPDATE_DEPARTMENT);

  return {
    departments: data?.departments as Department[],
    loading,
    error,
    createDepartment,
    updateDepartment
  };
}