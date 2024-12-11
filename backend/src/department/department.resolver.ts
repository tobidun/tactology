import { Resolver, Query, Mutation, Args, ID, Context } from "@nestjs/graphql";
import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { Department } from "./entities/department.entity";
import { CreateDepartmentInput } from "./dto/create-department.input";
import { UpdateDepartmentInput } from "./dto/update-department.input";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  createDepartment(
    @Args("input") createDepartmentInput: CreateDepartmentInput,
    @Context("req") req: any
  ) {
    const user = req.user.payload;
    console.log(user);

    if (!user || !user.sub) {
      throw new UnauthorizedException("User not authorized");
    }

    const userId = user.sub;
    return this.departmentService.create(createDepartmentInput, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Department])
  departments(@Context("req") req: any) {
    const user = req.user.payload;

    if (!user || !user.sub) {
      throw new UnauthorizedException("User not authorized");
    }

    const userId = user.sub;
    return this.departmentService.findAll(userId);
  }

  @Mutation(() => Department)
  updateDepartment(
    @Args("input") updateDepartmentInput: UpdateDepartmentInput
  ) {
    return this.departmentService.update(updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  deleteDepartment(@Args("id", { type: () => ID }) id: number) {
    return this.departmentService.remove(id);
  }
}
