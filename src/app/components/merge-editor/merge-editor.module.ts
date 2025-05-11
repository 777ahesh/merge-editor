import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MergeEditorComponent } from './merge-editor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MergeEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MergeEditorComponent
  ]
})
export class MergeEditorModule { }