import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Job } from './entities/job.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @ApiQuery({name: 'limit', required: false})
  @ApiQuery({name: 'page', required: false})
  @ApiQuery({name: 'search', required: false})
  @ApiQuery({name: 'sortBy', required: false})
  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Job>> {
    return this.jobService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }

  //Smart Contracts part

  @Get('/:id/contract')
  getContract(@Param('id') id: string) {
    return this.jobService.getContract(+id);
  }

  @Post('/:id/contract')
  async generateContract(@Param('id') id: string, @Body() contractDto: CreateContractDto) {
    contractDto.job_id = parseInt(id)
    return await this.jobService.createContract(contractDto);
  }

  @Post('/contract/deploy')
  async deployContract(@Param('id') id: string) {
    return this.jobService.deployContract();
  }
}
