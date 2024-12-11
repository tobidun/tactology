import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
      createdBy {
        id
        username
      }
      subDepartments {
        id
        name
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation createDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      id
      name
      subDepartments {
        id
        name
      }
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($input: UpdateDepartmentInput!) {
    updateDepartment(input: $input) {
      id
      name
    }
  }
`;
