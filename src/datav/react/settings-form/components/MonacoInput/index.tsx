import React, { useState, useRef, useEffect, useMemo } from 'react';
import Editor, { EditorProps, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { parseExpression, parse } from '@babel/parser';
import { format, formatDocument } from './format';
import { defaultOpts, handleCodeInput, handleInputCode, initMonaco } from './config';
import { copyText, generateUUID } from '../../../../shared';
import { IconWidget } from '../../../components';
import { message, Modal } from 'antd';
import cls from 'classnames';
import './styles.less';

export type Monaco = typeof monaco;
export interface MonacoInputProps extends EditorProps {
  extraLib?: string;
  readOnly?: boolean;
  fullScreenTitle: string;
  fnName?: string;
  autoFormat?: boolean;
  onChange?: (value: string) => void;
}

export const MonacoInput: React.FC<MonacoInputProps> & {
  loader?: typeof loader;
} = ({ className = '', language, defaultLanguage, width, readOnly, height, fullScreenTitle, fnName, onMount, onChange, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const valueRef = useRef('');
  const validateRef = useRef(null);
  const declarationRef = useRef<string[]>([]);
  const extraLibRef = useRef<monaco.IDisposable>(null);
  const monacoRef = useRef<Monaco>();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const modalEditorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const computedLanguage = useRef<string>(language || defaultLanguage);
  const realLanguage = useRef<string>('');
  const unmountedRef = useRef(false);
  const changedRef = useRef(false);
  const uidRef = useRef(generateUUID());
  const prefix = 'dv-monaco-input';
  const input = handleInputCode(language, props.value || props.defaultValue);
  const theme = 'dark';

  computedLanguage.current = language || defaultLanguage;
  realLanguage.current = /(?:javascript|typescript)/gi.test(computedLanguage.current) ? 'javascript' : computedLanguage.current;

  const opts = useMemo(() => {
    return Object.assign({}, defaultOpts, props.options, {
      tabSize: 2,
      value: '',
      language,
      readOnly,
    });
  }, [props.options]);

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

  const copyData = () => {
    if (editorRef.current) {
      copyText(editorRef.current.getValue());
      message.success('复制成功');
    }
  };

  const onMountHandler = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    onMount?.(editor, monaco);
    const model = editor.getModel();
    valueRef.current = editor.getValue();
    model['getDesignerLanguage'] = () => computedLanguage.current;
    if (valueRef.current) {
      format(computedLanguage.current, valueRef.current)
        .then((content) => {
          editor.setValue(content);
          setLoaded(true);
        })
        .catch(() => {
          setTimeout(() => {
            formatDocument(editor, computedLanguage.current);
            setLoaded(true);
          }, 0);
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
    editor.onDidBlurEditorText(() => {
      if (props.autoFormat && valueRef.current) {
        format(computedLanguage.current, valueRef.current)
          .then((content) => {
            editor.setValue(content);
          })
          .catch(() => {
            setTimeout(() => formatDocument(editorRef.current, computedLanguage.current), 0);
          });
      }
      onChange?.(handleCodeInput(language, valueRef.current));
    });
  };

  const onModalMountHandler = (editor: monaco.editor.IStandaloneCodeEditor) => {
    modalEditorRef.current = editor;
    editor.setValue(editorRef.current.getValue());
    editor.onDidChangeModelContent(() => {
      onChangeHandler(editor.getValue());
    });
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

  const closedFullModal = () => {
    if (modalEditorRef.current && !readOnly) {
      editorRef.current.setValue(modalEditorRef.current.getValue());
      editorRef.current.focus();
    }
  };

  const renderFullModal = () => {
    return (
      <Modal
        title={`${fullScreenTitle}${readOnly ? ' ( 只读 )' : ''}`}
        width="80%"
        style={{ top: 40 }}
        bodyStyle={{ padding: '20px', height: '90%' }}
        wrapClassName="fullscreen-editor-dialog"
        footer={null}
        visible={isFullScreen}
        maskClosable={false}
        onCancel={() => setIsFullScreen(false)}
        afterClose={() => closedFullModal()}
      >
        <div className={cls('fullscreen-editor', { '--read-only': readOnly })}>
          {fnName && (
            <p title="function filter(res) {" className="fake-code">
              <span className="--keyword">function</span> {`${fnName} {`}
            </p>
          )}
          <section
            style={{
              display: 'flex',
              position: 'relative',
              textAlign: 'initial',
              flex: 1,
            }}
          >
            <Editor
              {...props}
              value={editorRef.current?.getValue()}
              theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
              defaultLanguage={realLanguage.current}
              language={realLanguage.current}
              options={opts}
              width="100%"
              height="100%"
              onMount={onModalMountHandler}
            />
          </section>
          {fnName && (
            <p style={{}} className="fake-code">
              {'}'}
            </p>
          )}
        </div>
      </Modal>
    );
  };

  return (
    <div
      className={cls(prefix, className, {
        loaded,
      })}
      style={{ width, height }}
    >
      {fnName && (
        <p title="function filter(res) {" className="fake-code">
          <span className="--keyword">function</span> {`${fnName} {`}
        </p>
      )}
      <div className={cls(prefix + '-view', { '--read-only': readOnly })}>
        <Editor
          {...props}
          theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
          defaultLanguage={realLanguage.current}
          language={realLanguage.current}
          options={opts}
          value={input}
          width="100%"
          onMount={onMountHandler}
        />
        <div className="monaco-editor-actions">
          <IconWidget infer="Copy" className="action-btn" title="点击复制" onClick={copyData} />
          <IconWidget
            infer="FullScreen"
            className={`action-btn ${isFullScreen ? 'v-icon-fullscreen-exit' : 'v-icon-fullscreen'}`}
            title={`${isFullScreen ? '退出全屏' : '全屏模式下编辑或查看'}`}
            onClick={() => setIsFullScreen(!isFullScreen)}
          />
        </div>
      </div>
      {fnName && <p className="fake-code">{'}'}</p>}
      {renderFullModal()}
    </div>
  );
};

MonacoInput.loader = loader;
