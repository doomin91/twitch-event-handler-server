import { ApiProperty } from '@nestjs/swagger';

export class ExcelBodyDto {
  @ApiProperty({ type: 'file', description: '엑셀파일' })
  excel: any;
}
