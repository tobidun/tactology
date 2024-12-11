import { Repository } from "typeorm";
import { SubDepartment } from "./entities/sub-department.entity";
export declare class SubDepartmentRepository {
    private readonly repository;
    constructor(repository: Repository<SubDepartment>);
    create(subDepartmentData: Partial<SubDepartment>): Promise<SubDepartment>;
}
