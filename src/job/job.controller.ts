import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Job } from './entities/job.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@ApiTags('Jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Job>> {
    return this.jobService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }

  //Smart Contracts part

  @UseGuards(JwtAuthGuard)
  @Get('/:id/contract')
  getContract(@Param('id') id: string) {
    return this.jobService.getContract(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/contract')
  async generateContract(@Param('id') id: string, @Body() contractDto: CreateContractDto) {
    contractDto.job_id = parseInt(id)
    return await this.jobService.createContract(contractDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/contract/deploy')
  async deployContract(@Param('id') id: string) {
    return this.jobService.deployContract();
  }
}
