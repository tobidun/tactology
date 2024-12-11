import { DepartmentService } from "./department.service";
import { Department } from "./entities/department.entity";
import { CreateDepartmentInput } from "./dto/create-department.input";
import { UpdateDepartmentInput } from "./dto/update-department.input";
export declare class DepartmentResolver {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    createDepartment(createDepartmentInput: CreateDepartmentInput, req: any): Promise<Department>;
    departments(req: any): Promise<Department[]>;
    updateDepartment(updateDepartmentInput: UpdateDepartmentInput): Promise<Department>;
    deleteDepartment(id: number): Promise<boolean>;
}
