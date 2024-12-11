export interface SubDepartment {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
  createdBy: {
    id: string;
    username: string;
  };
  subDepartments: SubDepartment[];
}
