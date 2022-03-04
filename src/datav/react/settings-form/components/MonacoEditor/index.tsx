import React, { useEffect, useMemo, useRef, useState } from 'react';
// import * as monaco from 'monaco-editor';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {
  defaultOpts,
  equalsInputCode,
  formatDocument,
  handleCodeInput,
  handleInputCode,
  languageType,
  registerDatavDarkTheme,
} from './editor-config';
import { debounce, copyText } from '../../../../shared';
import { message, Modal } from 'antd';
import { IconWidget } from '../../../components';
import './index.less';

type MonacoEditorProps = Partial<{
  options: monaco.editor.IStandaloneEditorConstructionOptions;
  language: languageType;
  readOnly: boolean;
  useMinimap: boolean;
  lineNumbers: string;
  wordWrap: string;
  autoFormat: boolean;
  className: string;
  height: number;
  value: any;
  fullScreenTitle: string;
  fnName: string;
  onChange: (value: any) => void;
}>;

export const MonacoEditor: React.FC<MonacoEditorProps> = (props) => {
  const {
    language = 'json',
    lineNumbers = 'on',
    wordWrap = 'on',
    height = 240,
    className = '',
    readOnly = false,
    value = '',
    fullScreenTitle,
    useMinimap = false,
    fnName = '',
  } = props;
  const themeName = registerDatavDarkTheme();
  const domRef = useRef<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>();
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const fullEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const copyData = () => {
    if (editor) {
      copyText(editor.current.getValue());
      message.success('复制成功');
    }
  };

  const changeHandler = () => {
    // if (editor.current && props.onChange) {
    //   const val = editor.current.getValue();
    //   props.onChange(handleCodeInput(language, val));
    // }
  };
  const blurHandler = () => {
    if (editor && !readOnly) {
      const val = editor.current.getValue();
      props.onChange && props.onChange(handleCodeInput(language, val));
      if (props.autoFormat) {
        formatDocument(editor.current, language);
      }
    }
  };
  const debounceChangeHandler = debounce(changeHandler, 300);

  const opts = useMemo(() => {
    return Object.assign({}, defaultOpts, props.options, {
      tabSize: 2,
      value: '',
      language,
      theme: themeName,
      readOnly: props.readOnly,
      minimap: {
        enabled: useMinimap,
      },
      lineNumbers,
      wordWrap,
    });
  }, [props.options]);

  useEffect(() => {
    if (domRef.current) {
      const ce = monaco.editor.create(domRef.current, opts);
      const inputCode = handleInputCode(language, value);
      ce.setValue(inputCode);
      if (props.autoFormat) {
        formatDocument(ce, language);
      }
      if (height > 0) {
        domRef.current.style.height = `${height}px`;
      }
      ce.onDidChangeModelContent(debounceChangeHandler);
      ce.onDidBlurEditorText(blurHandler);

      editor.current = ce;
    }

    return () => {
      editor.current?.dispose();
      fullEditor.current?.dispose();
    };
  }, []);

  const closedFullModal = () => {
    if (fullEditor) {
      if (editor && !props.readOnly) {
        editor.current.setValue(fullEditor.current.getValue());
        editor.current.focus();
      }
      fullEditor.current?.dispose();
    }
  };

  useEffect(() => {
    const editorVal = editor.current.getValue();
    if (editor.current && !equalsInputCode(editorVal, value)) {
      const inputCode = handleInputCode(language, value);
      editor.current.setValue(inputCode);
    }
  }, [props.value]);

  const openedFullModal = () => {
    const dom = sectionRef.current as HTMLElement;
    if (dom) {
      const ce = monaco.editor.create(dom, opts);
      ce.setValue(editor.current.getValue());
      if (props.autoFormat) {
        formatDocument(ce, language);
      }
      ce.onDidChangeModelContent(debounceChangeHandler);
      ce.onDidBlurEditorText(blurHandler);

      fullEditor.current = ce;
    }
  };

  const switchFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setTimeout(() => {
      openedFullModal();
    }, 100);
  };

  return (
    <div className="monaco-editor-container">
      {fnName && (
        <p title="function filter(res) {" className="fake-code">
          <span className="--keyword">function</span> {`${fnName} {`}
        </p>
      )}
      <div ref={domRef} className={`datav-editor ${className} ${readOnly ? '--read-only' : ''}`}>
        <div className="datav-editor-actions">
          <IconWidget infer="Copy" className="action-btn" title="点击复制" onClick={copyData} />
          <IconWidget
            infer="FullScreen"
            className={`action-btn ${isFullScreen ? 'v-icon-fullscreen-exit' : 'v-icon-fullscreen'}`}
            title={`${isFullScreen ? '退出全屏' : '全屏模式下编辑或查看'}`}
            onClick={switchFullScreen}
          />
        </div>
      </div>
      {fnName && <p className="fake-code">{'}'}</p>}
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
        <div style={{ paddingBottom: fnName ? '30px' : 0 }} className={`datav-editor fullscreen-editor ${readOnly ? '--read-only' : ''}`}>
          {fnName && (
            <p title="function filter(res) {" className="fake-code">
              <span className="--keyword">function</span> {`${fnName} {`}
            </p>
          )}
          <section
            ref={sectionRef}
            style={{
              display: 'flex',
              position: 'relative',
              textAlign: 'initial',
              width: '100%',
              height: '100%',
            }}
          />
          {fnName && (
            <p style={{}} className="fake-code">
              {'}'}
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};
