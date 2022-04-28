import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import cls from 'classnames';
import {
  defaultOpts,
  equalsInputCode,
  formatDocument,
  handleCodeInput,
  handleInputCode,
  languageType,
  registerDatavDarkTheme,
} from './editor-config';
import { copyText } from '../../../../shared';
import { message, Modal } from 'antd';
import { IconWidget } from '../../../components';
import { usePrefix } from '../../../hooks';

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
  completions: string[];
  fullScreenTitle: string;
  fnName: string;
  onChange: (value: any) => void;
}>;

export const MonacoEditor: React.FC<MonacoEditorProps> = (props) => {
  const {
    language = 'json',
    lineNumbers = 'on',
    wordWrap = 'off',
    height = 240,
    className = '',
    readOnly = false,
    value = '',
    fullScreenTitle,
    useMinimap = false,
    fnName = '',
    completions = [],
  } = props;
  const [loaded, setLoaded] = useState(false);
  const changedRef = useRef(false);
  const valueRef = useRef('');
  const themeName = registerDatavDarkTheme();
  const domRef = useRef<HTMLDivElement>();
  const sectionRef = useRef<HTMLDivElement>();
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const fullEditor = useRef<monaco.editor.IStandaloneCodeEditor>();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const prefix = usePrefix('monaco-input');

  const copyData = () => {
    if (editor.current) {
      copyText(editor.current.getValue());
      message.success('复制成功');
    }
  };

  const onChangeHandler = (value: string) => {
    changedRef.current = true;
    valueRef.current = value;
  };

  const blurHandler = () => {
    if (changedRef.current && !readOnly) {
      const currentValue = editor.current.getValue();
      props.onChange && props.onChange(handleCodeInput(language, currentValue));
      if (props.autoFormat && currentValue) {
        formatDocument(editor.current, language);
      }
    }
  };

  const opts = useMemo(() => {
    return Object.assign({}, defaultOpts, props.options, {
      tabSize: 2,
      value: '',
      language,
      theme: themeName,
      readOnly,
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
      if (height > 0) {
        domRef.current.style.height = `${height}px`;
      }
      ce.onDidChangeModelContent(() => onChangeHandler(ce.getValue()));
      ce.onDidBlurEditorText(blurHandler);
      if (props.autoFormat && inputCode) {
        formatDocument(ce, language);
      }
      setLoaded(true);
      editor.current = ce;
    }

    return () => {
      editor.current?.dispose();
      fullEditor.current?.dispose();
    };
  }, []);

  const closedFullModal = () => {
    if (fullEditor.current) {
      if (editor.current && !readOnly) {
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
  }, [value]);

  const openedFullModal = () => {
    const dom = sectionRef.current as HTMLElement;
    if (dom) {
      const ce = monaco.editor.create(dom, opts);
      ce.setValue(editor.current.getValue());
      ce.onDidChangeModelContent(() => onChangeHandler(ce.getValue()));
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
      <div
        ref={domRef}
        className={cls(prefix, className, 'datav-editor', {
          loaded,
          '--read-only': readOnly,
        })}
      >
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
        <div className={`datav-editor fullscreen-editor ${readOnly ? '--read-only' : ''}`}>
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
              flex: 1,
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
