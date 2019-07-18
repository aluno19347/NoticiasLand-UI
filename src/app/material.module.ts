import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@angular/material';

const modules = [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}
