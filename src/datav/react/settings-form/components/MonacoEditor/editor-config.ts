import * as monaco from 'monaco-editor';
import { isObj, isArr } from '../../../../shared';

export type languageType = 'plaintext' | 'html' | 'javascript' | 'json' | 'sql';

export const defaultOpts: monaco.editor.IStandaloneEditorConstructionOptions = {
  glyphMargin: false,
  tabSize: 2,
  smoothScrolling: true,

  automaticLayout: true,
  contextmenu: false,
  fixedOverflowWidgets: true,
  foldingStrategy: 'indentation', // 代码折叠
  autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" |
  fontFamily: 'Menlo-Regular, Monaco, Menlo, Consolas, "Ubuntu Mono", monospace',
  formatOnPaste: true,
  formatOnType: true,
  lineDecorationsWidth: 0, // 为线条装饰保留的宽度（以像素为单位）默认10
  lineHeight: 15,
  lineNumbersMinChars: 5, // 控制行号的宽度，方法是为渲染至少一定数量的数字保留水平空间。默认为5。
  minimap: {
    enabled: false,
  },
  quickSuggestions: false,
  roundedSelection: true, // 使用圆角边框渲染编辑器选择。默认为true
  scrollBeyondLastLine: false, // 设置编辑器是否可以滚动到最后一行之后
  scrollbar: {
    verticalScrollbarSize: 5, // 滚动条
    horizontalScrollbarSize: 5,
    alwaysConsumeMouseWheel: false,
    arrowSize: 0,
  },
  snippetSuggestions: 'none', // 启用代码建议
  wordBasedSuggestions: false, // 控制是否应根据文档中的单词计算完成。默认为true。
  wordWrap: 'off', // 控制代码换行时机
  cursorStyle: 'line', // 光标样式
  selectOnLineNumbers: true, // 单击行号时是否应选择相应的行？默认为true
  autoIndent: 'advanced', // 控制当用户键入、粘贴、移动或缩进行时，编辑器是否应自动调整缩进。默认为高级。
  // glyphMargin: false,
  renderLineHighlight: 'line', // 启用当前行高亮显示的渲染。默认为所有
  renderWhitespace: 'selection', // 启用空白的呈现。默认为“选择”。
  scrollBeyondLastColumn: 0, // 使滚动可以超出最后一列多少列。默认为5。
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
  if (val && (isObj(val) || isArr(val))) {
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
