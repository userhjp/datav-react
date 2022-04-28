import { loader } from '@monaco-editor/react';
import chromeTheme from './themes/chrome';
import monokaiTheme from './themes/monokai';
import { format } from './format';
import { isArr, isObj } from '../../../../shared';

export type languageType = 'plaintext' | 'html' | 'javascript' | 'json' | 'sql' | string;
let initialized = false;

export const initMonaco = () => {
  if (initialized) return;
  loader.init().then((monaco) => {
    monaco.editor.defineTheme('monokai', monokaiTheme as any);
    monaco.editor.defineTheme('chrome-devtools', chromeTheme as any);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: 'React',
      allowJs: true,
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: true,
    });
    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      async provideDocumentFormattingEdits(model) {
        return [
          {
            text: await format(model['getDesignerLanguage']?.() || 'typescript', model.getValue()),
            range: model.getFullModelRange(),
          },
        ];
      },
    });
    initialized = true;
  });
};

export const handleInputCode = (languageId: languageType, code: string | any[] | { [key: string]: any }): string => {
  let val = code;
  if (isObj(val) || isArr(val)) {
    val = JSON.stringify(val, null, 2);
  }
  return typeof val === 'string' ? val : `${val || ''}`;
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

export const defaultOpts = {
  glyphMargin: false,
  tabSize: 2,
  smoothScrolling: true,

  automaticLayout: true, // 自适应布局
  contextmenu: false,
  overviewRulerBorder: true, // 是否需要滚动条边框
  fixedOverflowWidgets: true,
  foldingStrategy: 'indentation', // 代码折叠
  autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" |
  // fontFamily: 'Menlo-Regular, Monaco, Menlo, Consolas, "Ubuntu Mono", monospace',
  formatOnPaste: true,
  formatOnType: true,
  lineDecorationsWidth: 0, // 为线条装饰保留的宽度（以像素为单位）默认10
  lineHeight: 15,
  lineNumbersMinChars: 5, // 控制行号的宽度，方法是为渲染至少一定数量的数字保留水平空间。默认为5。
  minimap: {
    enabled: false, // 是否显示缩略图
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
  scrollBeyondLastColumn: 5, // 使滚动可以超出最后一列多少列。默认为5。
};

/** 常用方法
  editor.getValue() 获取编辑器中的所有文本
  editor.getSelection() 获取编辑器中被选中文案的 range 返回对象：
  {
      startLineNumber: 0,
      startColumnNumber: 0,
      endLineNumber: 0,
      endColumnNumber: 0,
  }
  editor.executeEdits('insert-code', [ // 在指定位置插入代码
  {
      range: {
        startLineNumber,
        startColumn,
        endLineNumber,
        endColumn,
      },
      text,
    },
  ])

  editor.getModel().findMatches(str|regexp) // 通过字符串或正则表达式查找编辑器内匹配的文本，并返回匹配文本 range 的集合。

  editor.getModel().getValueInRange(range) // 通过 range 获取范围内的文本，返回一个字符串。

  editor.getModel().getLinesContent(lineNumber) // 如果传入 lineNumber，则返回对应行的文本字符串，不传参则返回所有行的文本字符串的集合。

  editor.addAction() // 在右键菜单里增加一栏自定义的操作。

  // 在编辑器中用波浪线标出错误提示。
  monaco.editor.setModelMarkers(editor.getModel(), 'owner', [
  {
    startLineNumber,
    startColumn,
    endLineNumber,
    endColumn,
    message, // 提示文案
    severity: monaco.MarkerSeverity.Error, // 提示的类型
  },
])
*/
