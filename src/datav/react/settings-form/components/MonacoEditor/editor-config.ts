import * as monaco from 'monaco-editor';
import { isObj, isArr } from '../../../../shared';

export type languageType = 'plaintext' | 'html' | 'javascript' | 'json' | 'sql';

export const defaultOpts: monaco.editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  contextmenu: false,
  fixedOverflowWidgets: true,
  fontFamily: 'Menlo-Regular, Monaco, Menlo, Consolas, "Ubuntu Mono", monospace',
  formatOnPaste: true,
  formatOnType: true,
  insertSpaces: true,
  lineDecorationsWidth: 7,
  lineHeight: 15,
  lineNumbersMinChars: 3,
  minimap: {
    enabled: false,
  },
  quickSuggestions: false,
  readOnly: false,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  scrollbar: {
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
    alwaysConsumeMouseWheel: false,
    arrowSize: 0,
  },
  snippetSuggestions: 'none',
  tabSize: 2,
  theme: 'vs-dark',
  wordBasedSuggestions: false,
  wordWrap: 'on',
  cursorStyle: 'line',
  selectOnLineNumbers: true,
  autoIndent: 'advanced',
  glyphMargin: false,
  renderLineHighlight: 'line',
  renderWhitespace: 'none',
  scrollBeyondLastColumn: 2,
};

export const registerDatavDarkTheme = () => {
  const themeName = 'datav-dark-theme';
  monaco.editor.defineTheme(themeName, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'key', foreground: 'dddddd' },
      { token: 'string.key.json', foreground: 'dddddd' },
      { token: 'string.value.json', foreground: 'b4e98c' },
    ],
    colors: {
      'editor.background': '#0e1013',
      'editor.lineHighlightBackground': '#1f2329',
      'editorLineNumber.foreground': '#576369',
      'editorCursor.foreground': '#2483ff',
    },
  });
  return themeName;
};

type CompletionItem = monaco.languages.CompletionItem;

let suggestLabels: string[] = [];
const createSuggestions = (range: monaco.IRange) => {
  const suggestions: CompletionItem[] = [];
  for (let i = 0; i < suggestLabels.length; i++) {
    const id = suggestLabels[i];
    suggestions.push({
      label: `:${id}`,
      insertText: id,
      kind: monaco.languages.CompletionItemKind.Variable,
      detail: 'CallbackId',
      range,
    });
  }
  return suggestions;
};

const registerCompletionMap = new Map();
export const registerApiCompletion = (languageId: languageType, callbackIds: string[]) => {
  if (callbackIds && callbackIds.length > 0) {
    suggestLabels = callbackIds;
    if (registerCompletionMap.has(languageId)) {
      return;
    }
    registerCompletionMap.set(languageId, 1);

    monaco.languages.registerCompletionItemProvider(languageId, {
      triggerCharacters: [':'],
      provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };
        return {
          suggestions: createSuggestions(range),
        };
      },
    });
  }
};

export const handleInputCode = (languageId: languageType, code: string | any[] | { [key: string]: any }): string => {
  let val = code;
  if (isObj(val) || isArr(val)) {
    val = JSON.stringify(val, null, 2);
  }
  return typeof val === 'string' ? val : `${val}`;
};

export const handleCodeInput = (languageId: languageType, code: string | any[] | { [key: string]: any }): any => {
  if (languageId === 'json') {
    if (isObj(code) || isArr(code)) {
      return code;
    }
    let val = '';
    try {
      val = JSON.parse(code as string);
    } catch (error) {
      val = `${code}`;
    }
    return val;
  } else {
    return code;
  }
};

export const equalsInputCode = (old: any, newData: any): boolean => {
  const oldStr = typeof old === 'string' ? old : JSON.stringify(old);
  const newStr = typeof newData === 'string' ? newData : JSON.stringify(newData);
  const a = oldStr.replace(/\r|\n|\s/g, '');
  const b = newStr.replace(/\r|\n|\s/g, '');
  return a === b;
};

export const formatDocument = (editor: monaco.editor.IStandaloneCodeEditor, languageId: languageType) => {
  if (languageId === 'sql') {
    // todo
  } else {
    editor.getAction('editor.action.formatDocument').run();
  }
};
