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

export const GET_DEPARTMENT_BY_ID = gql`
  query department($id: Float!) {
    department(id: $id) {
      name
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
  mutation updateDepartment($input: UpdateDepartmentInput!) {
    updateDepartment(input: $input) {
      id
      name
      subDepartments {
        name
      }
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation deleteDepartment($id: ID!) {
    deleteDepartment(id: $id) {
      id
    }
  }
`;
