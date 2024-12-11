import { Injectable, NotFoundException } from "@nestjs/common";
import { DepartmentRepository } from "./department.repository";
import { SubDepartmentRepository } from "./sub-department.repository";
import { CreateDepartmentInput } from "./dto/create-department.input";
import { UpdateDepartmentInput } from "./dto/update-department.input";
import { Department } from "./entities/department.entity";
import { SubDepartment } from "./entities/sub-department.entity";
import { UserRepository } from "@/user/user.repository";

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    private readonly subDepartmentRepository: SubDepartmentRepository,
    private readonly userRepository: UserRepository
  ) {}

  async create(
    createDepartmentInput: CreateDepartmentInput,
    userId: number
  ): Promise<Department> {
    const subDepartments = createDepartmentInput.subDepartments?.map((sub) => {
      const subDepartment = new SubDepartment();
      subDepartment.name = sub.name;
      return subDepartment;
    });

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const department = await this.departmentRepository.create({
      name: createDepartmentInput.name,
      subDepartments,
      createdBy: user,
    });

    return department;
  }

  async findAll(userId: number): Promise<Department[]> {
    return this.departmentRepository.findAllWithRelations(userId);
  }

  async update(
    updateDepartmentInput: UpdateDepartmentInput
  ): Promise<Department> {
    const department = await this.departmentRepository.findById(
      updateDepartmentInput.id
    );

    if (!department) {
      throw new NotFoundException("Department not found");
    }

    department.name = updateDepartmentInput.name;
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    return this.departmentRepository.deleteById(id);
  }
}
