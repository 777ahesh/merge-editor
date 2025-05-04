// Type definitions for Monaco Editor
// Since we're using CDN, we need to declare the global monaco namespace

declare namespace monaco {
    export type MarkerSeverity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  
    export interface IPosition {
      column: number;
      lineNumber: number;
    }
  
    export interface IRange {
      startLineNumber: number;
      startColumn: number;
      endLineNumber: number;
      endColumn: number;
    }
  
    export class Range {
      constructor(
        startLineNumber: number,
        startColumn: number,
        endLineNumber: number,
        endColumn: number
      );
      public readonly startLineNumber: number;
      public readonly startColumn: number;
      public readonly endLineNumber: number;
      public readonly endColumn: number;
      public isEmpty(): boolean;
      public containsPosition(position: IPosition): boolean;
      public containsRange(range: IRange): boolean;
      public strictContainsRange(range: IRange): boolean;
      public plusRange(range: IRange): Range;
      public intersectRanges(range: IRange): Range | null;
      public equalsRange(other: IRange | null): boolean;
      public getEndPosition(): IPosition;
      public getStartPosition(): IPosition;
      public setEndPosition(endLineNumber: number, endColumn: number): Range;
      public setStartPosition(startLineNumber: number, startColumn: number): Range;
      public collapseToStart(): Range;
      public toString(): string;
      public static lift(range: IRange): Range;
      public static isIRange(obj: any): obj is IRange;
      public static isEmpty(range: IRange): boolean;
      public static containsPosition(range: IRange, position: IPosition): boolean;
      public static containsRange(range: IRange, otherRange: IRange): boolean;
      public static strictContainsRange(range: IRange, otherRange: IRange): boolean;
      public static plusRange(a: IRange, b: IRange): Range;
      public static intersectRanges(a: IRange, b: IRange): Range | null;
      public static equalsRange(a: IRange | null, b: IRange | null): boolean;
      public static compareRangesUsingStarts(a: IRange | null, b: IRange | null): number;
      public static compareRangesUsingEnds(a: IRange | null, b: IRange | null): number;
      public static spansMultipleLines(range: IRange): boolean;
    }
  
    export interface ISelectionChangeEvent {
      readonly selection: Selection;
      readonly secondarySelections: Selection[];
    }
  
    export interface IModelDecoration {
      readonly id: string;
      readonly ownerId: number;
      readonly range: IRange;
      readonly options: IModelDecorationOptions;
    }
  
    export interface IModelDecorationsChangeAccessor {
      deltaDecorations(
        oldDecorations: string[],
        newDecorations: IModelDeltaDecoration[]
      ): string[];
    }
  
    export interface IModelDeltaDecoration {
      range: IRange;
      options: IModelDecorationOptions;
    }
  
    export interface IModelDecorationOptions {
      isWholeLine?: boolean;
      className?: string;
      hoverMessage?: IMarkdownString | IMarkdownString[];
      glyphMarginHoverMessage?: IMarkdownString | IMarkdownString[];
      beforeContentClassName?: string;
      afterContentClassName?: string;
      glyphMarginClassName?: string;
      linesDecorationsClassName?: string;
      marginClassName?: string;
      inlineClassName?: string;
      inlineClassNameAffectsLetterSpacing?: boolean;
      stickiness?: TrackedRangeStickiness;
    }
  
    export interface IMarkdownString {
      value: string;
      isTrusted?: boolean;
      supportThemeIcons?: boolean;
      supportHtml?: boolean;
      baseUri?: UriComponents;
      uris?: { [href: string]: UriComponents };
    }
  
    export enum TrackedRangeStickiness {
      AlwaysGrowsWhenTypingAtEdges = 0,
      NeverGrowsWhenTypingAtEdges = 1,
      GrowsOnlyWhenTypingBefore = 2,
      GrowsOnlyWhenTypingAfter = 3
    }
  
    export interface UriComponents {
      scheme: string;
      authority: string;
      path: string;
      query: string;
      fragment: string;
    }
  
    export interface ITextModel {
      readonly uri: Uri;
      getLineContent(lineNumber: number): string;
      getLinesContent(): string[];
      getLineCount(): number;
      getLineMaxColumn(lineNumber: number): number;
      getValueInRange(range: IRange): string;
      getValueLength(): number;
      getValueLineBreak(): string;
    }
  
    export interface IDiffEditorModel {
      original: ITextModel;
      modified: ITextModel;
    }
  
    export interface editor {
      create(element: HTMLElement, options?: any, override?: any): any;
      createDiffEditor(element: HTMLElement, options?: any, override?: any): any;
      createDiffNavigator(diffEditor: any, opts?: any): any;
      
      // Models
      setModelLanguage(model: any, languageId: string): void;
      
      // Constants
      EditorType: {
        ICodeEditor: string;
        IDiffEditor: string;
      };
  
      BareFontInfo: any;
      ConfigurationChangedEvent: any;
      ContentSizeChangedEvent: any;
      CursorChangeReason: any;
      EditorAutoClosingStrategy: any;
      EditorAutoSurroundStrategy: any;
      EditorOption: any;
      EndOfLinePreference: any;
      EndOfLineSequence: any;
      FontInfo: any;
      InternalEditorOptions: any;
      OverviewRulerLane: any;
      PositionAffinity: any;
      RenderLineNumbersType: any;
      ScrollType: any;
      TextModelResolvedOptions: any;
      TrackedRangeStickiness: typeof TrackedRangeStickiness;
      WrappingIndent: any;
  
      // Classes
      DiffNavigator: any;
      Range: typeof Range;
    }
  
    export interface Uri {
      scheme: string;
      authority: string;
      path: string;
      query: string;
      fragment: string;
      fsPath: string;
      with(change: { scheme?: string; authority?: string; path?: string; query?: string; fragment?: string }): Uri;
      toString(skipEncoding?: boolean): string;
      toJSON(): any;
      static isUri(thing: any): thing is Uri;
      static parse(value: string, strict?: boolean): Uri;
      static file(path: string): Uri;
      static from(components: UriComponents): Uri;
    }
  
    export const editor: editor;
  
    export namespace languages {
      export function register(language: any): void;
      export function setMonarchTokensProvider(languageId: string, provider: any): any;
      export function registerCompletionItemProvider(languageId: string, provider: any): any;
      export function registerHoverProvider(languageId: string, provider: any): any;
    }
  }