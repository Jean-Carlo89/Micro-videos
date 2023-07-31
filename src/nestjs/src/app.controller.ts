import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Category } from 'core-micro-videos/category/domain';
import { CreateCategoryUseCase } from 'core-micro-videos/category/application';
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        // console.log(Category);
        console.log(CreateCategoryUseCase.UseCase);
        return this.appService.getHello();
    }
}
