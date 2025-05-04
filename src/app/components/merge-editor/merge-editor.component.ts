import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

// Declare monaco for TypeScript
declare const monaco: any;

@Component({
  selector: 'app-merge-editor',
  templateUrl: './merge-editor.component.html',
  styleUrls: ['./merge-editor.component.scss']
})
export class MergeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('originalContainer') originalContainer!: ElementRef;
  @ViewChild('modifiedContainer') modifiedContainer!: ElementRef;
  @ViewChild('resultContainer') resultContainer!: ElementRef;

  private originalEditor: any;
  private modifiedEditor: any;
  private resultEditor: any;
  private diffNavigator: any;
  
  // Sample content for demo purposes
  private originalContent = `function helloWorld() {
  console.log("Hello World!");
  return true;
}

function sumNumbers(a, b) {
  return a + b;
}

function fetchData() {
  return fetch('https://api.example.com/data')
    .then(response => response.json());
}`;

  private modifiedContent = `function helloWorld() {
  console.log("Hello Angular World!");
  return true;
}

function sumNumbers(a, b) {
  // Add validation
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Parameters must be numbers');
  }
  return a + b;
}

function fetchData(endpoint) {
  return fetch(\`https://api.example.com/\${endpoint}\`)
    .then(response => response.json());
}`;

  private resultContent = '';
  private monacoLoaded = false;
  private monacoLoadPromise: Promise<void> | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadMonaco();
  }

  ngAfterViewInit(): void {
    if (this.monacoLoaded) {
      this.initializeEditors();
    } else {
      this.monacoLoadPromise?.then(() => {
        this.initializeEditors();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.originalEditor) {
      this.originalEditor.dispose();
    }
    if (this.modifiedEditor) {
      this.modifiedEditor.dispose();
    }
    if (this.resultEditor) {
      this.resultEditor.dispose();
    }
  }

  private loadMonaco(): void {
    if ((window as any).monaco) {
      this.monacoLoaded = true;
      return;
    }

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      });
    };

    // Load required Monaco scripts
    this.monacoLoadPromise = loadScript('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js')
      .then(() => {
        return new Promise<void>((resolve) => {
          (window as any).require.config({
            paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' }
          });
          (window as any).require(['vs/editor/editor.main'], () => {
            this.monacoLoaded = true;
            resolve();
          });
        });
      });
  }

  private initializeEditors(): void {
    // Create original editor
    this.originalEditor = monaco.editor.create(this.originalContainer.nativeElement, {
      value: this.originalContent,
      language: 'javascript',
      theme: 'vs',
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      glyphMargin: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3
    });

    // Create modified editor
    this.modifiedEditor = monaco.editor.create(this.modifiedContainer.nativeElement, {
      value: this.modifiedContent,
      language: 'javascript',
      theme: 'vs',
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      glyphMargin: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3
    });

    // Initialize result with modified content
    this.resultContent = this.modifiedContent;

    // Create result editor
    this.resultEditor = monaco.editor.create(this.resultContainer.nativeElement, {
      value: this.resultContent,
      language: 'javascript',
      theme: 'vs',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'on',
      glyphMargin: true,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3
    });

    // Setup diff editor
    this.setupDiffView();

    // Handle window resize
    window.addEventListener('resize', () => {
      if (this.originalEditor && this.modifiedEditor && this.resultEditor) {
        this.originalEditor.layout();
        this.modifiedEditor.layout();
        this.resultEditor.layout();
      }
    });
  }

  private setupDiffView(): void {
    // Create diff editor model
    const originalModel = this.originalEditor.getModel();
    const modifiedModel = this.modifiedEditor.getModel();
    
    // Compute line diffs
    const diffComputer = new monaco.editor.DiffNavigator(
      this.originalEditor,
      this.modifiedEditor,
      {
        followsCaret: true,
        ignoreCharChanges: false
      }
    );
    
    // Set up the diff navigator
    this.diffNavigator = diffComputer;
    
    // Compute the diff and add decorations
    const diffs = monaco.editor.createDiffEditor(document.createElement('div'), {
      originalEditor: this.originalEditor,
      modifiedEditor: this.modifiedEditor,
      renderSideBySide: false
    });
    
    this.decorateChanges(originalModel, modifiedModel);
  }

  private decorateChanges(originalModel: any, modifiedModel: any): void {
    const diff = monaco.editor.createDiffEditor(document.createElement('div'));
    diff.setModel({
      original: originalModel,
      modified: modifiedModel
    });
    
    setTimeout(() => {
      const diffModel = diff.getModel();
      const changes = diffModel.original.getLinesContent().map((line: string, i: number) => {
        const modifiedLine = i < diffModel.modified.getLinesContent().length 
          ? diffModel.modified.getLinesContent()[i] 
          : '';
        
        return {
          originalLine: line,
          modifiedLine: modifiedLine,
          lineNumber: i + 1,
          changed: line !== modifiedLine
        };
      });
      
      // Add decorations for the original editor
      const originalDecorations = changes
        .filter((change: { changed: any; }) => change.changed)
        .map((change: { lineNumber: any; }) => ({
          range: new monaco.Range(change.lineNumber, 1, change.lineNumber, 1),
          options: {
            isWholeLine: true,
            linesDecorationsClassName: 'merge-editor-deleted-line',
            className: 'merge-editor-deleted-line',
            glyphMarginClassName: 'merge-editor-deleted-glyph'
          }
        }));
      
      this.originalEditor.deltaDecorations([], originalDecorations);
      
      // Add decorations for the modified editor
      const modifiedDecorations = changes
        .filter((change: { changed: any; }) => change.changed)
        .map((change: { lineNumber: any; }) => ({
          range: new monaco.Range(change.lineNumber, 1, change.lineNumber, 1),
          options: {
            isWholeLine: true,
            linesDecorationsClassName: 'merge-editor-added-line',
            className: 'merge-editor-added-line',
            glyphMarginClassName: 'merge-editor-added-glyph'
          }
        }));
      
      this.modifiedEditor.deltaDecorations([], modifiedDecorations);
    }, 500);
  }

  // Actions that can be called from the UI
  public selectCurrent(): void {
    const currentPosition = this.resultEditor.getPosition();
    const currentLine = currentPosition.lineNumber;
    
    // Get content from original editor for this line
    const originalContent = this.originalEditor.getModel().getLineContent(currentLine);
    
    // Update the result editor with this line
    this.updateResultLine(currentLine, originalContent);
  }
  
  public selectIncoming(): void {
    const currentPosition = this.resultEditor.getPosition();
    const currentLine = currentPosition.lineNumber;
    
    // Get content from modified editor for this line
    const modifiedContent = this.modifiedEditor.getModel().getLineContent(currentLine);
    
    // Update the result editor with this line
    this.updateResultLine(currentLine, modifiedContent);
  }
  
  private updateResultLine(lineNumber: number, content: string): void {
    const model = this.resultEditor.getModel();
    const lineCount = model.getLineCount();
    
    if (lineNumber > lineCount) {
      return;
    }
    
    // Get the range for the entire line
    const range = new monaco.Range(
      lineNumber, 
      1, 
      lineNumber, 
      model.getLineMaxColumn(lineNumber)
    );
    
    // Replace the line with new content
    this.resultEditor.executeEdits('merge-action', [{
      range: range,
      text: content,
      forceMoveMarkers: true
    }]);
  }

  // Navigation methods
  public nextDifference(): void {
    if (this.diffNavigator) {
      this.diffNavigator.next();
    }
  }
  
  public previousDifference(): void {
    if (this.diffNavigator) {
      this.diffNavigator.previous();
    }
  }

  // Save the merged result
  public saveResult(): void {
    const result = this.resultEditor.getValue();
    console.log('Saving merged result:', result);
    // Here you would typically send this to your backend or perform other actions
    // For demo purposes, we just log it
  }
}