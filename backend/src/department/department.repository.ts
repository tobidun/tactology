import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./entities/department.entity";

@Injectable()
export class DepartmentRepository {
  constructor(
    @InjectRepository(Department)
    private readonly repository: Repository<Department>
  ) {}

  async create(departmentData: Partial<Department>): Promise<Department> {
    const department = this.repository.create(departmentData);
    return this.repository.save(department);
  }

  async findAllWithRelations(userId: number): Promise<Department[]> {
    return this.repository.find({
      where: { createdBy: { id: userId } },
      relations: ["createdBy", "subDepartments"],
    });
  }

  async findById(id: number): Promise<Department | null> {
    return this.repository.findOne({ where: { id } });
  }

  async deleteById(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async save(department: Department): Promise<Department> {
    return this.repository.save(department);
  }
}
