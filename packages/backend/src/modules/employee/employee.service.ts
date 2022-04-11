import { Injectable } from '@nestjs/common';
import { PrismaService } from 'providers/prisma.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

const tsquerySpecialChars = /[()|&:*!]/g;

const getQueryFromSearchPhrase = (searchPhrase: string) =>
  searchPhrase
    .replace(tsquerySpecialChars, ' ')
    .trim()
    .split(/\s+/)
    .join(' | ');

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}
  findAll() {
    return this.prisma.employee.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async search(textSearch: string) {
    const query = getQueryFromSearchPhrase(textSearch);
    const results = await this.prisma.$queryRaw`
      SELECT id, email, name, "lastName", nationality, phone, "civilStatus", birthday FROM "Employee"
      WHERE
        "textSearch" @@ to_tsquery('english', ${query})
      ORDER BY ts_rank("textSearch", to_tsquery('english', ${query})) DESC;
    `;

    return results;
  }
}
