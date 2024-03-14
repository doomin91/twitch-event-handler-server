import { Module } from '@nestjs/common';
import { ExportScraperService } from './services/export-scraper.service';

@Module({
  imports: [],
  providers: [ExportScraperService],
  exports: [ExportScraperService],
})
export class ScraperModule {}
