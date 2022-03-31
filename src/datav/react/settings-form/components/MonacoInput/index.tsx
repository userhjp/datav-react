import React, { useState, useRef, useEffect } from 'react';
import Editor, { EditorProps, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { parseExpression, parse } from '@babel/parser';
import { format } from './format';
import cls from 'classnames';
import { initMonaco } from './config';
import { generateUUID } from '@/datav/shared';
import { usePrefix } from '@/datav/react/hooks';
import './config';
import './styles.less';

export type Monaco = typeof monaco;
export interface MonacoInputProps extends EditorProps {
  helpLink?: string | boolean;
  helpCode?: string;
  helpCodeViewWidth?: number | string;
  extraLib?: string;
  onChange?: (value: string) => void;
}

export const MonacoInput: React.FC<MonacoInputProps> & {
  loader?: typeof loader;
} = ({ className, language, defaultLanguage, width, helpLink, helpCode, helpCodeViewWidth, height, onMount, onChange, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const valueRef = useRef('');
  const validateRef = useRef(null);
  const submitRef = useRef(null);
  const declarationRef = useRef<string[]>([]);
  const extraLibRef = useRef<monaco.IDisposable>(null);
  const monacoRef = useRef<Monaco>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const computedLanguage = useRef<string>(language || defaultLanguage);
  const realLanguage = useRef<string>('');
  const unmountedRef = useRef(false);
  const changedRef = useRef(false);
  const uidRef = useRef(generateUUID());
  const prefix = usePrefix('monaco-input');
  const input = props.value || props.defaultValue;
  const theme = 'dark';

  useEffect(() => {
    unmountedRef.current = false;
    initMonaco();
    return () => {
      if (extraLibRef.current) {
        extraLibRef.current.dispose();
      }
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (monacoRef.current && props.extraLib) {
      updateExtraLib();
    }
  }, [props.extraLib]);

  const updateExtraLib = () => {
    if (extraLibRef.current) {
      extraLibRef.current.dispose();
    }
    extraLibRef.current = monacoRef.current.languages.typescript.typescriptDefaults.addExtraLib(props.extraLib, `${uidRef.current}.d.ts`);
  };

  const isFileLanguage = () => {
    const lang = computedLanguage.current;
    return lang === 'javascript' || lang === 'typescript';
  };

  const isExpLanguage = () => {
    const lang = computedLanguage.current;
    return lang === 'javascript.expression' || lang === 'typescript.expression';
  };

  // const renderHelper = () => {
  //   const getHref = () => {
  //     if (typeof helpLink === 'string') return helpLink;
  //     if (isFileLanguage()) {
  //       return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript';
  //     }
  //     if (isExpLanguage()) {
  //       return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators';
  //     }
  //     return '';
  //   };
  //   if (helpLink === false) return null;
  //   const href = getHref();
  //   return (
  //     href && (
  //       <Tooltip title={'标题啊啊啊啊'}>
  //         <div className={prefix + '-helper'}>
  //           <a target="_blank" href={href} rel="noreferrer">
  //             <IconWidget infer="Help" />
  //           </a>
  //         </div>
  //       </Tooltip>
  //     )
  //   );
  // };

  const onMountHandler = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    onMount?.(editor, monaco);
    const model = editor.getModel();
    const currentValue = editor.getValue();
    model['getDesignerLanguage'] = () => computedLanguage.current;
    if (currentValue) {
      format(computedLanguage.current, currentValue)
        .then((content) => {
          editor.setValue(content);
          setLoaded(true);
        })
        .catch(() => {
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
    if (props.extraLib) {
      updateExtraLib();
    }
    editor.onDidChangeModelContent(() => {
      onChangeHandler(editor.getValue());
    });
  };

  const submit = () => {
    clearTimeout(submitRef.current);
    submitRef.current = setTimeout(() => {
      onChange?.(valueRef.current);
    }, 1000);
  };

  const validate = () => {
    if (realLanguage.current === 'typescript') {
      clearTimeout(validateRef.current);
      validateRef.current = setTimeout(() => {
        try {
          if (valueRef.current) {
            if (isFileLanguage()) {
              parse(valueRef.current, {
                sourceType: 'module',
                plugins: ['typescript', 'jsx'],
              });
            } else if (isExpLanguage()) {
              parseExpression(valueRef.current, {
                plugins: ['typescript', 'jsx'],
              });
            }
          }
          monacoRef.current.editor.setModelMarkers(editorRef.current.getModel(), computedLanguage.current, []);
          declarationRef.current = editorRef.current.deltaDecorations(declarationRef.current, [
            {
              range: new monacoRef.current.Range(1, 1, 1, 1),
              options: {},
            },
          ]);
          submit();
        } catch (e) {
          declarationRef.current = editorRef.current.deltaDecorations(declarationRef.current, [
            {
              range: new monacoRef.current.Range(e.loc.line, e.loc.column, e.loc.line, e.loc.column),
              options: {
                isWholeLine: true,
                glyphMarginClassName: 'monaco-error-highline',
              },
            },
          ]);
          monacoRef.current.editor.setModelMarkers(editorRef.current.getModel(), computedLanguage.current, [
            {
              code: '1003',
              severity: 8,
              startLineNumber: e.loc.line,
              startColumn: e.loc.column,
              endLineNumber: e.loc.line,
              endColumn: e.loc.column,
              message: e.message,
            },
          ]);
        }
      }, 240);
    } else {
      submit();
      declarationRef.current = editorRef.current.deltaDecorations(declarationRef.current, [
        {
          range: new monacoRef.current.Range(1, 1, 1, 1),
          options: {},
        },
      ]);
    }
  };

  const onChangeHandler = (value: string) => {
    changedRef.current = true;
    valueRef.current = value;
    validate();
  };
  computedLanguage.current = language || defaultLanguage;
  realLanguage.current = /(?:javascript|typescript)/gi.test(computedLanguage.current) ? 'typescript' : computedLanguage.current;

  const renderHelpCode = () => {
    if (!helpCode) return null;
    return (
      <div className={prefix + '-view'} style={{ width: helpCodeViewWidth || '50%' }}>
        <Editor
          value={helpCode}
          theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
          defaultLanguage={realLanguage.current}
          language={realLanguage.current}
          options={{
            ...props.options,
            lineNumbers: 'off',
            readOnly: true,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            minimap: {
              enabled: false,
            },
            tabSize: 2,
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
              alwaysConsumeMouseWheel: false,
            },
          }}
          width="100%"
          height="100%"
        />
      </div>
    );
  };

  return (
    <div
      className={cls(prefix, className, {
        loaded,
      })}
      style={{ width, height }}
    >
      {/* {renderHelper()} */}
      <div className={prefix + '-view'}>
        <Editor
          {...props}
          theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
          defaultLanguage={realLanguage.current}
          language={realLanguage.current}
          options={{
            ...props.options,
            glyphMargin: false,
            tabSize: 2,
            smoothScrolling: true,

            automaticLayout: true,
            contextmenu: false,
            fixedOverflowWidgets: true,
            // fontFamily: 'Menlo-Regular, Monaco, Menlo, Consolas, "Ubuntu Mono", monospace',
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
            wordWrap: 'wordWrapColumn', // 控制代码换行时机
            cursorStyle: 'line', // 光标样式
            selectOnLineNumbers: true, // 单击行号时是否应选择相应的行？默认为true
            autoIndent: 'advanced', // 控制当用户键入、粘贴、移动或缩进行时，编辑器是否应自动调整缩进。默认为高级。
            // glyphMargin: false,
            renderLineHighlight: 'line', // 启用当前行高亮显示的渲染。默认为所有
            renderWhitespace: 'selection', // 启用空白的呈现。默认为“选择”。
            scrollBeyondLastColumn: 5, // 使滚动可以超出最后一列多少列。默认为5。
          }}
          value={input}
          width="100%"
          height="100%"
          onMount={onMountHandler}
        />
      </div>
      {renderHelpCode()}
    </div>
  );
};

MonacoInput.loader = loader;
