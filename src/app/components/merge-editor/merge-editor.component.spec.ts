import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeEditorComponent } from './merge-editor.component';

describe('MergeEditorComponent', () => {
  let component: MergeEditorComponent;
  let fixture: ComponentFixture<MergeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
