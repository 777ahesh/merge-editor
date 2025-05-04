import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MergeEditorModule } from './components/merge-editor/merge-editor.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MergeEditorModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
