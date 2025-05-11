import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  Renderer2,
} from '@angular/core';
// Declare monaco for TypeScript
declare const monaco: any;

@Component({
  selector: 'app-merge-editor',
  templateUrl: './merge-editor.component.html',
  styleUrls: ['./merge-editor.component.scss'],
})
export class MergeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('originalContainer') originalContainer!: ElementRef;
  @ViewChild('modifiedContainer') modifiedContainer!: ElementRef;
  @ViewChild('resultContainer') resultContainer!: ElementRef;
  @ViewChild('horizontalResizeHandle') horizontalResizeHandle!: ElementRef;
  @ViewChild('verticalResizeHandle') verticalResizeHandle!: ElementRef;

  private originalEditor: any;
  private modifiedEditor: any;
  private resultEditor: any;
  private diffEditor: any;
  private currentDiffIndex = 0;
  private diffDecorations: string[] = [];
  private differences: any[] = [];
  private resolvedDifferences: Set<number> = new Set(); // Track resolved differences by index

  // Expose conflict counter to template
  public pendingConflictsCount = 0;

  // New properties for resizing
  private isHorizontalResizing = false;
  private isVerticalResizing = false;
  private initialX = 0;
  private initialY = 0;
  private initialLeftWidth = 0;
  private initialRightWidth = 0;
  private initialTopHeight = 0;
  private initialBottomHeight = 0;
  private resizeObserver: ResizeObserver | null = null;
  public currentTheme = 'vs'; // Default light theme
  public supportedThemes = [
    { id: 'vs', name: 'Light' },
    { id: 'vs-dark', name: 'Dark' },
    { id: 'hc-black', name: 'High Contrast' },
  ];

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

  // New properties for language selection and code pasting
  public currentLanguage = 'javascript';
  public supportedLanguages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'plaintext', name: 'Plain Text' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
    { id: 'json', name: 'JSON' },
    { id: 'xml', name: 'XML' },
    { id: 'markdown', name: 'Markdown' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'csharp', name: 'C#' },
    { id: 'cpp', name: 'C++' },
    { id: 'php', name: 'PHP' },
    { id: 'ruby', name: 'Ruby' },
    { id: 'go', name: 'Go' },
    { id: 'sql', name: 'SQL' },
  ];

  // For code paste dialog
  public showPasteDialog = false;
  public pasteTarget: 'original' | 'modified' = 'original';
  public pasteContent = '';

  // Add this property to store previous content
  private previousResultContent: string = '';

  // Add these properties to store initial state
  private initialOriginalContent: string = '';
  private initialModifiedContent: string = '';

  // Add these properties to the top of the class
  public showLandingPage = true;

  // Add this method to the class
  public openEditor(): void {
    this.showLandingPage = false;
    
    // Since we're revealing the editor after it's already rendered but hidden,
    // we need to refresh the layout of Monaco editors
    setTimeout(() => {
      this.refreshEditorLayouts();
    }, 100);
  }

  // Add this method to revert changes
  public revertLastChange(): void {
    if (this.previousResultContent) {
      this.resultEditor.setValue(this.previousResultContent);
      this.resultContent = this.previousResultContent;

      // Refresh diff view to update conflicts
      this.setupDiffView();
    }
  }

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadMonaco();
  }

  ngAfterViewInit(): void {
    if (this.monacoLoaded) {
      this.initializeEditors();
      this.initializeResizeHandlers();
    } else {
      this.monacoLoadPromise?.then(() => {
        this.initializeEditors();
        this.initializeResizeHandlers();
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
    if (this.diffEditor) {
      this.diffEditor.dispose();
    }
    // Remove resize observers
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Remove event listeners
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
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
    this.monacoLoadPromise = loadScript(
      'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs/loader.min.js'
    ).then(() => {
      return new Promise<void>((resolve) => {
        (window as any).require.config({
          paths: {
            vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs',
          },
        });
        (window as any).require(['vs/editor/editor.main'], () => {
          this.monacoLoaded = true;
          resolve();
        });
      });
    });
  }

  private initializeEditors(): void {
    // Add class names to the container elements for CSS targeting
    this.originalContainer.nativeElement.classList.add('originalContainer');
    this.modifiedContainer.nativeElement.classList.add('modifiedContainer');

    // Create original editor
    this.originalEditor = monaco.editor.create(
      this.originalContainer.nativeElement,
      {
        value: this.originalContent,
        language: this.currentLanguage, // Use the current language
        theme: this.currentTheme,
        readOnly: true, // Allow editing for direct paste
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
      }
    );

    // Create modified editor
    this.modifiedEditor = monaco.editor.create(
      this.modifiedContainer.nativeElement,
      {
        value: this.modifiedContent,
        language: this.currentLanguage, // Use the current language
        theme: this.currentTheme,
        readOnly: true, // Allow editing for direct paste
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
      }
    );

    // Initialize result with modified content
    this.resultContent = this.modifiedContent;

    // Create result editor
    this.resultEditor = monaco.editor.create(
      this.resultContainer.nativeElement,
      {
        value: this.resultContent,
        language: this.currentLanguage, // Use the current language
        theme: this.currentTheme,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        glyphMargin: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
      }
    );

    // Store initial content for reset functionality
    this.initialOriginalContent = this.originalContent;
    this.initialModifiedContent = this.modifiedContent;

    // Setup editor change events
    this.originalEditor.onDidChangeModelContent(() => {
      this.originalContent = this.originalEditor.getValue();
      this.setupDiffView();
    });

    this.modifiedEditor.onDidChangeModelContent(() => {
      this.modifiedContent = this.modifiedEditor.getValue();
      this.setupDiffView();
    });

    // Setup diff view
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
    // Create invisible diff editor to compute diffs
    const diffContainer = document.createElement('div');
    diffContainer.style.height = '0';
    diffContainer.style.width = '0';
    diffContainer.style.overflow = 'hidden';
    document.body.appendChild(diffContainer);

    // Create diff editor with additional options for character-level diffs
    this.diffEditor = monaco.editor.createDiffEditor(diffContainer, {
      renderSideBySide: false,
      readOnly: true,
      ignoreTrimWhitespace: false,
      renderIndicators: true,
      enableSplitViewResizing: false,
      renderMarginRevertIcon: true,
      diffCodeLens: true,
      diffWordWrap: 'inherit',
    });

    // Set models for diff editor
    this.diffEditor.setModel({
      original: monaco.editor.createModel(this.originalContent, this.currentLanguage),
      modified: monaco.editor.createModel(this.modifiedContent, this.currentLanguage),
    });

    // Compute differences
    setTimeout(() => {
      // Force re-computation of differences
      this.differences = [];
      this.computeDifferences();
      this.highlightDifferences();
      this.updatePendingConflictsCount();

      // Clean up the temporary container
      document.body.removeChild(diffContainer);
    }, 800);
  }

  private computeDifferences(): void {
    const diffModel = this.diffEditor.getModel();
    const originalLineCount = diffModel.original.getLineCount();
    const modifiedLineCount = diffModel.modified.getLineCount();

    this.differences = [];

    // Get line changes from the diff algorithm
    const lineChanges = this.diffEditor.getLineChanges();

    if (lineChanges) {
      lineChanges.forEach((change: any) => {
        const {
          originalStartLineNumber,
          originalEndLineNumber,
          modifiedStartLineNumber,
          modifiedEndLineNumber,
          charChanges,
        } = change;

        // Store both line-level and character-level changes
        this.differences.push({
          originalStartLineNumber,
          originalEndLineNumber,
          modifiedStartLineNumber,
          modifiedEndLineNumber,
          charChanges: charChanges || [],
          type: this.getDiffType(
            originalStartLineNumber,
            originalEndLineNumber,
            modifiedStartLineNumber,
            modifiedEndLineNumber
          ),
          resolved: false,
        });
      });
    }

    // Sort differences by line number
    this.differences.sort(
      (a, b) => a.modifiedStartLineNumber - b.modifiedStartLineNumber
    );

    // Update pending conflicts count
    this.updatePendingConflictsCount();
  }

  private getDiffType(
    originalStart: number,
    originalEnd: number,
    modifiedStart: number,
    modifiedEnd: number
  ): string {
    if (originalStart === 0) {
      return 'addition'; // New content added
    } else if (modifiedStart === 0) {
      return 'deletion'; // Content deleted
    } else {
      return 'modification'; // Content modified
    }
  }

  private highlightDifferences(): void {
    // Clear existing decorations
    if (this.diffDecorations.length > 0) {
      this.originalEditor.deltaDecorations(this.diffDecorations, []);
      this.modifiedEditor.deltaDecorations(this.diffDecorations, []);
    }

    let originalDecorations: any[] = [];
    let modifiedDecorations: any[] = [];

    // Process each difference
    this.differences.forEach((diff, index) => {
      // Skip resolved differences
      if (this.resolvedDifferences.has(index)) {
        return;
      }

      // Highlight changed lines with light background
      if (diff.originalStartLineNumber > 0) {
        for (
          let i = diff.originalStartLineNumber;
          i <= diff.originalEndLineNumber;
          i++
        ) {
          originalDecorations.push({
            range: new monaco.Range(i, 1, i, 1000),
            options: {
              isWholeLine: true,
              className: 'merge-editor-changed-line',
              linesDecorationsClassName: 'merge-editor-changed-line-indicator',
              // Add "-" icon to the line number margin
              lineNumberClassName: 'merge-editor-deletion-line-number',
              glyphMarginClassName: 'merge-editor-deletion-glyph',
              glyphMarginHoverMessage: { value: 'Deletion' },
            },
          });
        }
      }

      if (diff.modifiedStartLineNumber > 0) {
        for (
          let i = diff.modifiedStartLineNumber;
          i <= diff.modifiedEndLineNumber;
          i++
        ) {
          modifiedDecorations.push({
            range: new monaco.Range(i, 1, i, 1000),
            options: {
              isWholeLine: true,
              className: 'merge-editor-changed-line',
              linesDecorationsClassName: 'merge-editor-changed-line-indicator',
              // Add "+" icon to the line number margin
              lineNumberClassName: 'merge-editor-addition-line-number',
              glyphMarginClassName: 'merge-editor-addition-glyph',
              glyphMarginHoverMessage: { value: 'Addition' },
            },
          });
        }
      }

      // Add character-level highlights
      if (diff.charChanges && diff.charChanges.length > 0) {
        diff.charChanges.forEach((charChange: any) => {
          // Original text deletions (red)
          if (charChange.originalStartLineNumber > 0) {
            originalDecorations.push({
              range: new monaco.Range(
                charChange.originalStartLineNumber,
                charChange.originalStartColumn,
                charChange.originalEndLineNumber,
                charChange.originalEndColumn
              ),
              options: {
                inlineClassName: 'merge-editor-deleted-text',
                hoverMessage: { value: 'Deleted text' },
              },
            });
          }

          // Modified text additions (green)
          if (charChange.modifiedStartLineNumber > 0) {
            modifiedDecorations.push({
              range: new monaco.Range(
                charChange.modifiedStartLineNumber,
                charChange.modifiedStartColumn,
                charChange.modifiedEndLineNumber,
                charChange.modifiedEndColumn
              ),
              options: {
                inlineClassName: 'merge-editor-added-text',
                hoverMessage: { value: 'Added text' },
              },
            });
          }
        });
      }
    });

    // Apply decorations
    const origDecoIds = this.originalEditor.deltaDecorations(
      [],
      originalDecorations
    );
    const modDecoIds = this.modifiedEditor.deltaDecorations(
      [],
      modifiedDecorations
    );

    // Store decoration IDs
    this.diffDecorations = [...origDecoIds, ...modDecoIds];

    // Navigate to first unresolved difference
    this.navigateToNextUnresolvedDiff();
  }

  private navigateToDiff(index: number): void {
    if (this.differences.length === 0) return;

    // Ensure index is within bounds
    this.currentDiffIndex = Math.max(
      0,
      Math.min(index, this.differences.length - 1)
    );

    const diff = this.differences[this.currentDiffIndex];

    // Scroll editors to the line
    if (diff.originalStartLineNumber > 0) {
      this.originalEditor.revealLineInCenter(diff.originalStartLineNumber);
    }

    if (diff.modifiedStartLineNumber > 0) {
      this.modifiedEditor.revealLineInCenter(diff.modifiedStartLineNumber);
      this.resultEditor.revealLineInCenter(diff.modifiedStartLineNumber);

      // Position cursor in result editor
      this.resultEditor.setPosition({
        lineNumber: diff.modifiedStartLineNumber,
        column: 1,
      });
      this.resultEditor.focus();
    }
  }

  // Navigate to next unresolved difference
  private navigateToNextUnresolvedDiff(): void {
    if (this.differences.length === 0) return;

    let startIdx = this.currentDiffIndex;
    let index = startIdx;

    // Find the next unresolved diff
    do {
      if (!this.resolvedDifferences.has(index)) {
        this.navigateToDiff(index);
        return;
      }

      index = (index + 1) % this.differences.length;
    } while (index !== startIdx);

    // If we get here, all diffs are resolved
    if (this.differences.length > 0) {
      this.navigateToDiff(0);
    }
  }

  // Update the count of pending conflicts
  private updatePendingConflictsCount(): void {
    const pendingCount =
      this.differences.length - this.resolvedDifferences.size;
    this.pendingConflictsCount = pendingCount;
  }

  // Mark a difference as resolved
  private markDiffAsResolved(index: number): void {
    if (index >= 0 && index < this.differences.length) {
      this.resolvedDifferences.add(index);
      this.updatePendingConflictsCount();
      this.highlightDifferences(); // Refresh the highlights
    }
  }

  // Actions that can be called from the UI
  public selectOriginalBlock(): void {
    this.previousResultContent = this.resultEditor.getValue();
    if (
      this.differences.length === 0 ||
      this.currentDiffIndex >= this.differences.length
    )
      return;

    const diff = this.differences[this.currentDiffIndex];

    // Skip if there's no original content
    if (diff.originalStartLineNumber <= 0) return;

    // Get content from original editor for this block
    const originalModel = this.originalEditor.getModel();
    let originalContent = '';

    for (
      let i = diff.originalStartLineNumber;
      i <= diff.originalEndLineNumber;
      i++
    ) {
      originalContent += originalModel.getLineContent(i) + '\n';
    }
    originalContent = originalContent.trimEnd(); // Remove trailing newline

    // Update the result editor with this block
    this.updateResultBlock(
      diff.modifiedStartLineNumber,
      diff.modifiedEndLineNumber,
      originalContent
    );

    // Mark as resolved
    this.markDiffAsResolved(this.currentDiffIndex);

    // Navigate to next unresolved diff
    this.navigateToNextUnresolvedDiff();
  }

  public selectModifiedBlock(): void {
    this.previousResultContent = this.resultEditor.getValue();
    if (
      this.differences.length === 0 ||
      this.currentDiffIndex >= this.differences.length
    )
      return;

    const diff = this.differences[this.currentDiffIndex];

    // Skip if there's no modified content
    if (diff.modifiedStartLineNumber <= 0) return;

    // Get content from modified editor for this block
    const modifiedModel = this.modifiedEditor.getModel();
    let modifiedContent = '';

    for (
      let i = diff.modifiedStartLineNumber;
      i <= diff.modifiedEndLineNumber;
      i++
    ) {
      modifiedContent += modifiedModel.getLineContent(i) + '\n';
    }
    modifiedContent = modifiedContent.trimEnd(); // Remove trailing newline

    // Update the result editor with this block
    this.updateResultBlock(
      diff.modifiedStartLineNumber,
      diff.modifiedEndLineNumber,
      modifiedContent
    );

    // Mark as resolved
    this.markDiffAsResolved(this.currentDiffIndex);

    // Navigate to next unresolved diff
    this.navigateToNextUnresolvedDiff();
  }

  public selectCurrentCharChange(): void {
    if (
      this.differences.length === 0 ||
      this.currentDiffIndex >= this.differences.length
    )
      return;

    const diff = this.differences[this.currentDiffIndex];
    if (!diff.charChanges || diff.charChanges.length === 0) return;

    const position = this.resultEditor.getPosition();

    // Find the character change that contains the current position
    const charChange = this.findCharChangeAtPosition(
      diff.charChanges,
      position
    );
    if (!charChange) return;

    // Get the original text for this change
    const originalModel = this.originalEditor.getModel();
    let originalText = '';

    if (charChange.originalStartLineNumber > 0) {
      if (
        charChange.originalStartLineNumber === charChange.originalEndLineNumber
      ) {
        // Single line change
        originalText = originalModel.getValueInRange({
          startLineNumber: charChange.originalStartLineNumber,
          startColumn: charChange.originalStartColumn,
          endLineNumber: charChange.originalEndLineNumber,
          endColumn: charChange.originalEndColumn,
        });
      } else {
        // Multi-line change
        for (
          let i = charChange.originalStartLineNumber;
          i <= charChange.originalEndLineNumber;
          i++
        ) {
          if (i === charChange.originalStartLineNumber) {
            originalText +=
              originalModel
                .getLineContent(i)
                .substring(charChange.originalStartColumn - 1) + '\n';
          } else if (i === charChange.originalEndLineNumber) {
            originalText += originalModel
              .getLineContent(i)
              .substring(0, charChange.originalEndColumn - 1);
          } else {
            originalText += originalModel.getLineContent(i) + '\n';
          }
        }
      }
    }

    // Update the specific character range
    this.updateResultCharRange(
      charChange.modifiedStartLineNumber,
      charChange.modifiedStartColumn,
      charChange.modifiedEndLineNumber,
      charChange.modifiedEndColumn,
      originalText
    );

    // Check if all char changes have been resolved and mark the diff as resolved if so
    // This is a simplified approach - for a real implementation, you'd need to track which specific char changes are resolved
    this.markDiffAsResolved(this.currentDiffIndex);

    // Navigate to next unresolved diff
    this.navigateToNextUnresolvedDiff();
  }

  public selectIncomingCharChange(): void {
    if (
      this.differences.length === 0 ||
      this.currentDiffIndex >= this.differences.length
    )
      return;

    const diff = this.differences[this.currentDiffIndex];
    if (!diff.charChanges || diff.charChanges.length === 0) return;

    const position = this.resultEditor.getPosition();

    // Find the character change that contains the current position
    const charChange = this.findCharChangeAtPosition(
      diff.charChanges,
      position
    );
    if (!charChange) return;

    // Get the modified text for this change
    const modifiedModel = this.modifiedEditor.getModel();
    let modifiedText = '';

    if (charChange.modifiedStartLineNumber > 0) {
      if (
        charChange.modifiedStartLineNumber === charChange.modifiedEndLineNumber
      ) {
        // Single line change
        modifiedText = modifiedModel.getValueInRange({
          startLineNumber: charChange.modifiedStartLineNumber,
          startColumn: charChange.modifiedStartColumn,
          endLineNumber: charChange.modifiedEndLineNumber,
          endColumn: charChange.modifiedEndColumn,
        });
      } else {
        // Multi-line change
        for (
          let i = charChange.modifiedStartLineNumber;
          i <= charChange.modifiedEndLineNumber;
          i++
        ) {
          if (i === charChange.modifiedStartLineNumber) {
            modifiedText +=
              modifiedModel
                .getLineContent(i)
                .substring(charChange.modifiedStartColumn - 1) + '\n';
          } else if (i === charChange.modifiedEndLineNumber) {
            modifiedText += modifiedModel
              .getLineContent(i)
              .substring(0, charChange.modifiedEndColumn - 1);
          } else {
            modifiedText += modifiedModel.getLineContent(i) + '\n';
          }
        }
      }
    }

    // Update the specific character range
    this.updateResultCharRange(
      charChange.modifiedStartLineNumber,
      charChange.modifiedStartColumn,
      charChange.modifiedEndLineNumber,
      charChange.modifiedEndColumn,
      modifiedText
    );

    // Mark as resolved
    this.markDiffAsResolved(this.currentDiffIndex);

    // Navigate to next unresolved diff
    this.navigateToNextUnresolvedDiff();
  }

  private findCharChangeAtPosition(charChanges: any[], position: any): any {
    return charChanges.find((change) => {
      if (
        position.lineNumber < change.modifiedStartLineNumber ||
        position.lineNumber > change.modifiedEndLineNumber
      ) {
        return false;
      }

      if (
        position.lineNumber === change.modifiedStartLineNumber &&
        position.lineNumber === change.modifiedEndLineNumber
      ) {
        return (
          position.column >= change.modifiedStartColumn &&
          position.column <= change.modifiedEndColumn
        );
      }

      if (position.lineNumber === change.modifiedStartLineNumber) {
        return position.column >= change.modifiedStartColumn;
      }

      if (position.lineNumber === change.modifiedEndLineNumber) {
        return position.column <= change.modifiedEndColumn;
      }

      return true;
    });
  }

  private updateResultBlock(
    startLineNumber: number,
    endLineNumber: number,
    content: string
  ): void {
    const model = this.resultEditor.getModel();
    const lineCount = model.getLineCount();

    // Adjust for out-of-bounds
    startLineNumber = Math.max(1, Math.min(startLineNumber, lineCount));
    endLineNumber = Math.max(1, Math.min(endLineNumber, lineCount));

    // Get the range for the entire block
    const range = new monaco.Range(
      startLineNumber,
      1,
      endLineNumber,
      model.getLineMaxColumn(endLineNumber)
    );

    // Replace the block with new content
    this.resultEditor.executeEdits('merge-action', [
      {
        range: range,
        text: content,
        forceMoveMarkers: true,
      },
    ]);
  }

  private updateResultCharRange(
    startLine: number,
    startColumn: number,
    endLine: number,
    endColumn: number,
    content: string
  ): void {
    const model = this.resultEditor.getModel();
    const lineCount = model.getLineCount();

    // Adjust for out-of-bounds
    startLine = Math.max(1, Math.min(startLine, lineCount));
    endLine = Math.max(1, Math.min(endLine, lineCount));

    // Get the range for the specific characters
    const range = new monaco.Range(startLine, startColumn, endLine, endColumn);

    // Replace the specific characters with new content
    this.resultEditor.executeEdits('merge-char-action', [
      {
        range: range,
        text: content,
        forceMoveMarkers: true,
      },
    ]);
  }

  // Navigation methods
  public nextDifference(): void {
    if (this.differences.length === 0) return;

    let nextIndex = this.currentDiffIndex;
    // Find the next unresolved diff
    for (let i = 1; i <= this.differences.length; i++) {
      const idx = (this.currentDiffIndex + i) % this.differences.length;
      if (!this.resolvedDifferences.has(idx)) {
        nextIndex = idx;
        break;
      }
    }

    this.navigateToDiff(nextIndex);
  }

  // Add these two public methods to your MergeEditorComponent class

  /**
   * Accepts all changes from the original document
   */
  public acceptAllOriginal(): void {
    this.previousResultContent = this.resultEditor.getValue();
    // Check if there are any differences to resolve
    if (this.differences.length === 0) return;

    // Process each unresolved difference
    for (let i = 0; i < this.differences.length; i++) {
      // Skip already resolved differences
      if (this.resolvedDifferences.has(i)) continue;

      const diff = this.differences[i];

      // Skip if there's no original content
      if (diff.originalStartLineNumber <= 0) continue;

      // Get content from original editor for this block
      const originalModel = this.originalEditor.getModel();
      let originalContent = '';

      for (
        let j = diff.originalStartLineNumber;
        j <= diff.originalEndLineNumber;
        j++
      ) {
        originalContent += originalModel.getLineContent(j) + '\n';
      }
      originalContent = originalContent.trimEnd(); // Remove trailing newline

      // Update the result editor with this block
      this.updateResultBlock(
        diff.modifiedStartLineNumber > 0
          ? diff.modifiedStartLineNumber
          : diff.originalStartLineNumber,
        diff.modifiedEndLineNumber > 0
          ? diff.modifiedEndLineNumber
          : diff.originalEndLineNumber,
        originalContent
      );

      // Mark as resolved
      this.resolvedDifferences.add(i);
    }

    // Update UI
    this.updatePendingConflictsCount();
    this.highlightDifferences();

    // Navigate to first difference to show the results
    if (this.differences.length > 0) {
      this.navigateToDiff(0);
    }
  }

  /**
   * Accepts all changes from the modified document
   */
  public acceptAllModified(): void {
    // Save current content before changes
    this.previousResultContent = this.resultEditor.getValue();
    // Check if there are any differences to resolve
    if (this.differences.length === 0) return;

    // Process each unresolved difference
    for (let i = 0; i < this.differences.length; i++) {
      // Skip already resolved differences
      if (this.resolvedDifferences.has(i)) continue;

      const diff = this.differences[i];

      // Skip if there's no modified content
      if (diff.modifiedStartLineNumber <= 0) continue;

      // Get content from modified editor for this block
      const modifiedModel = this.modifiedEditor.getModel();
      let modifiedContent = '';

      for (
        let j = diff.modifiedStartLineNumber;
        j <= diff.modifiedEndLineNumber;
        j++
      ) {
        modifiedContent += modifiedModel.getLineContent(j) + '\n';
      }
      modifiedContent = modifiedContent.trimEnd(); // Remove trailing newline

      // Update the result editor with this block
      this.updateResultBlock(
        diff.modifiedStartLineNumber,
        diff.modifiedEndLineNumber,
        modifiedContent
      );

      // Mark as resolved
      this.resolvedDifferences.add(i);
    }

    // Update UI
    this.updatePendingConflictsCount();
    this.highlightDifferences();

    // Navigate to first difference to show the results
    if (this.differences.length > 0) {
      this.navigateToDiff(0);
    }
  }

  public previousDifference(): void {
    if (this.differences.length === 0) return;

    let prevIndex = this.currentDiffIndex;
    // Find the previous unresolved diff
    for (let i = 1; i <= this.differences.length; i++) {
      const idx =
        (this.currentDiffIndex - i + this.differences.length) %
        this.differences.length;
      if (!this.resolvedDifferences.has(idx)) {
        prevIndex = idx;
        break;
      }
    }

    this.navigateToDiff(prevIndex);
  }

  // Save the merged result
  public saveResult(): void {
    const result = this.resultEditor.getValue();
    console.log('Saving merged result:', result);
    // Here you would typically send this to your backend or perform other actions
  }

  // Resize Handlers
  private initializeResizeHandlers(): void {
    // Setup horizontal resize between original and modified editors
    this.renderer.listen(
      this.horizontalResizeHandle.nativeElement,
      'mousedown',
      (e) => {
        this.isHorizontalResizing = true;
        this.initialX = e.clientX;

        const editors = this.horizontalResizeHandle.nativeElement.parentElement;
        const originalPanel = editors.querySelector(
          '.editor-panel:first-child'
        ) as HTMLElement;
        const modifiedPanel = editors.querySelector(
          '.editor-panel:last-child'
        ) as HTMLElement;

        this.initialLeftWidth = originalPanel.getBoundingClientRect().width;
        this.initialRightWidth = modifiedPanel.getBoundingClientRect().width;

        // Prevent text selection during resize
        e.preventDefault();
        this.renderer.addClass(
          this.horizontalResizeHandle.nativeElement,
          'dragging'
        );
      }
    );

    // Setup vertical resize between editors and result
    this.renderer.listen(
      this.verticalResizeHandle.nativeElement,
      'mousedown',
      (e) => {
        this.isVerticalResizing = true;
        this.initialY = e.clientY;

        const container = this.verticalResizeHandle.nativeElement.parentElement;
        const editorsContainer = container.querySelector(
          '.editors-container'
        ) as HTMLElement;
        const resultPanel = container.querySelector(
          '.result-panel'
        ) as HTMLElement;

        this.initialTopHeight = editorsContainer.getBoundingClientRect().height;
        this.initialBottomHeight = resultPanel.getBoundingClientRect().height;

        // Prevent text selection during resize
        e.preventDefault();
        this.renderer.addClass(
          this.verticalResizeHandle.nativeElement,
          'dragging'
        );
      }
    );

    // Global mouse move and up handlers
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    // Setup resize observer to update editor layouts when container sizes change
    this.setupResizeObserver();
  }

  // Use arrow function to preserve 'this' context
  private handleMouseMove = (e: MouseEvent) => {
    if (this.isHorizontalResizing) {
      const dx = e.clientX - this.initialX;
      const container = this.horizontalResizeHandle.nativeElement.parentElement;
      const containerWidth = container.getBoundingClientRect().width;
      const originalPanel = container.querySelector(
        '.editor-panel:first-child'
      ) as HTMLElement;
      const modifiedPanel = container.querySelector(
        '.editor-panel:last-child'
      ) as HTMLElement;

      // Calculate new widths (percentages)
      const newLeftWidth =
        ((this.initialLeftWidth + dx) / containerWidth) * 100;
      const newRightWidth =
        ((this.initialRightWidth - dx) / containerWidth) * 100;

      // Apply min widths (20%)
      if (newLeftWidth > 20 && newRightWidth > 20) {
        this.renderer.setStyle(originalPanel, 'flex', `0 0 ${newLeftWidth}%`);
        this.renderer.setStyle(modifiedPanel, 'flex', `0 0 ${newRightWidth}%`);
        this.refreshEditorLayouts();
      }
    }

    if (this.isVerticalResizing) {
      const dy = e.clientY - this.initialY;
      const container = this.verticalResizeHandle.nativeElement.parentElement;
      const editorsContainer = container.querySelector(
        '.editors-container'
      ) as HTMLElement;
      const resultPanel = container.querySelector(
        '.result-panel'
      ) as HTMLElement;

      // Calculate new heights
      const newTopHeight = this.initialTopHeight + dy;
      const newBottomHeight = this.initialBottomHeight - dy;

      // Apply min heights (100px)
      if (newTopHeight > 100 && newBottomHeight > 100) {
        this.renderer.setStyle(editorsContainer, 'height', `${newTopHeight}px`);
        this.renderer.setStyle(resultPanel, 'height', `${newBottomHeight}px`);
        this.refreshEditorLayouts();
      }
    }
  };

  // Use arrow function to preserve 'this' context
  private handleMouseUp = () => {
    if (this.isHorizontalResizing) {
      this.isHorizontalResizing = false;
      this.renderer.removeClass(
        this.horizontalResizeHandle.nativeElement,
        'dragging'
      );
    }

    if (this.isVerticalResizing) {
      this.isVerticalResizing = false;
      this.renderer.removeClass(
        this.verticalResizeHandle.nativeElement,
        'dragging'
      );
    }

    this.refreshEditorLayouts();
  };

  private setupResizeObserver(): void {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        this.refreshEditorLayouts();
      });

      // Observe the container elements
      this.resizeObserver.observe(this.originalContainer.nativeElement);
      this.resizeObserver.observe(this.modifiedContainer.nativeElement);
      this.resizeObserver.observe(this.resultContainer.nativeElement);
    }
  }

  private refreshEditorLayouts(): void {
    if (this.originalEditor) {
      this.originalEditor.layout();
    }

    if (this.modifiedEditor) {
      this.modifiedEditor.layout();
    }

    if (this.resultEditor) {
      this.resultEditor.layout();
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.refreshEditorLayouts();
  }

  /**
   * Change the language for all editors
   */
  public changeLanguage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.currentLanguage = select.value;

    if (this.originalEditor && this.modifiedEditor && this.resultEditor) {
      const originalModel = this.originalEditor.getModel();
      const modifiedModel = this.modifiedEditor.getModel();
      const resultModel = this.resultEditor.getModel();

      monaco.editor.setModelLanguage(originalModel, this.currentLanguage);
      monaco.editor.setModelLanguage(modifiedModel, this.currentLanguage);
      monaco.editor.setModelLanguage(resultModel, this.currentLanguage);
    }
  }

  /**
   * Open the paste dialog
   */
  public openPasteDialog(target: 'original' | 'modified'): void {
    this.pasteTarget = target;
    this.pasteContent =
      target === 'original'
        ? this.originalEditor.getValue()
        : this.modifiedEditor.getValue();
    this.showPasteDialog = true;
  }

  /**
   * Cancel the paste operation
   */
  public cancelPaste(): void {
    this.showPasteDialog = false;
    this.pasteContent = '';
  }

  /**
   * Confirm and apply pasted code
   */
  public confirmPaste(): void {
    if (this.pasteTarget === 'original') {
      this.originalContent = this.pasteContent;
      this.initialOriginalContent = this.pasteContent; // Update initial state
      this.originalEditor.setValue(this.pasteContent);
    } else {
      this.modifiedContent = this.pasteContent;
      this.initialModifiedContent = this.pasteContent; // Update initial state
      this.modifiedEditor.setValue(this.pasteContent);
      
      // Update result editor with modified content
      this.resultContent = this.pasteContent;
      this.resultEditor.setValue(this.pasteContent);
    }

    // Clear resolved differences since content has changed
    this.resolvedDifferences.clear();
    
    // Dispose of previous diff editor if it exists
    if (this.diffEditor) {
      this.diffEditor.dispose();
    }
    
    // Add a longer delay to ensure Monaco has time to process
    setTimeout(() => {
      // Rebuild the diff view from scratch
      this.setupDiffView();
    }, 1000);

    this.showPasteDialog = false;
    this.pasteContent = '';
  }
  /**
   * Updates the result editor with content from the modified editor
   */
  public updateResultFromModified(): void {
    if (this.modifiedEditor) {
      // Get current content from modified editor
      const modifiedContent = this.modifiedEditor.getValue();
      this.resultContent = modifiedContent;

      // Update result editor
      if (this.resultEditor) {
        this.resultEditor.setValue(modifiedContent);
      }

      // Refresh diff view to update conflicts
      this.setupDiffView();
    }
  }

   // Add theme change method
  public changeTheme(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.currentTheme = select.value;
    
    if (this.originalEditor && this.modifiedEditor && this.resultEditor) {
      monaco.editor.setTheme(this.currentTheme);
    }
  }

  /**
   * Resets all differences to their initial state
   */
  public resetDifferences(): void {
    // Confirm with user before resetting
    if (confirm('Reset all differences? This will clear any changes you have made.')) {
      // Clear resolved differences
      this.resolvedDifferences.clear();
      
      // Reset original and modified content to initial state if needed
      // (Only needed if you're allowing editing of these panels)
      this.originalEditor.setValue(this.initialOriginalContent);
      this.modifiedEditor.setValue(this.initialModifiedContent);
      
      // Reset result content to show differences again
      this.resultEditor.setValue(this.initialModifiedContent);
      this.resultContent = this.initialModifiedContent;
      
      // Recompute differences
      this.setupDiffView();
      
      // Update UI
      this.updatePendingConflictsCount();
      this.highlightDifferences();
      
      // Navigate to the first difference
      if (this.differences.length > 0) {
        this.navigateToDiff(0);
      }
    }
  }

  /**
   * Force recalculation of differences between original and modified content
   */
  public recalculateDifferences(): void {
    // Dispose of previous diff editor if it exists
    if (this.diffEditor) {
      this.diffEditor.dispose();
    }
    
    // Clear any previously resolved differences
    this.resolvedDifferences.clear();
    
    // Recreate the diff view with a clean state
    this.setupDiffView();
  }
}
