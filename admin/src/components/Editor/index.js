import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { useToggle, useWindowSize } from 'react-use';
import { getPreferredPreviewStyle } from '../../utils/previewStyle';
import MediaLib from './MediaLib';
import TuiEditor from './TuiEditor';
import Flyout from './Flyout';
import Toolbar from './Toolbar';

const FLYOUT_STYLE = {
  width: 'calc(100vw - 8rem)',
};

export default function Editor({
  onChange,
  name,
  value,
  required,
  intlLabel,
  labelAction,
  disabled,
}) {
  const editorRef = useRef(null);
  const { formatMessage } = useIntl();
  const { width, height } = useWindowSize();
  const [showFlyout, toggleFlyout] = useToggle(false);
  const [showMediaLib, toggleMediaLib] = useToggle(false);
  const [previewStyle, setPreviewStyle] = useState(
    getPreferredPreviewStyle(width)
  );
  const flyoutEditorHeight = `${height - 200}px`;

  useEffect(() => {
    setPreviewStyle(getPreferredPreviewStyle(width));
  }, [width]);

  function toggleStyle() {
    setPreviewStyle((style) => (style === 'vertical' ? 'tab' : 'vertical'));
  }

  const title = (
    <FieldLabel id={(showFlyout && `${name}-flyout-title`) || undefined}>
      <label>{formatMessage(intlLabel)}</label>
      {required && <Required>*</Required>}
    </FieldLabel>
  );
  const editor = useMemo(
    () => (
      <TuiEditor
        ref={editorRef}
        name={name}
        value={value}
        previewStyle={previewStyle}
        onChange={onChange}
        disabled={disabled}
        height={showFlyout ? flyoutEditorHeight : undefined}
        onFlyout={!showFlyout && (() => toggleFlyout(true))}
      />
    ),
    [showFlyout, name, value, onChange, disabled, toggleFlyout, previewStyle]
  );
  return (
    <div>
      <HeaderLayout>
        <Header>
          {title}
          {labelAction}
        </Header>
        <Toolbar
          previewStyle={previewStyle}
          onChangePreviewStyle={toggleStyle}
          onAddMedia={() => toggleMediaLib(true)}
          onExpand={() => toggleFlyout(true)}
        />
      </HeaderLayout>
      {showFlyout ? (
        <FlyoutWrapper>
          <Flyout
            name={name}
            isOpen={showFlyout}
            onClose={() => toggleFlyout(false)}
            header={title}
            style={FLYOUT_STYLE}
          >
            {editor}
          </Flyout>
        </FlyoutWrapper>
      ) : (
        editor
      )}
      <MediaLib
        isOpen={showMediaLib}
        onClose={() => toggleMediaLib(false)}
        editor={editorRef.current?.getInstance()}
      />
    </div>
  );
}

const HeaderLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;
const FieldLabel = styled.p`
  font-weight: 600;
  color: #32324d;
  font-size: 0.75rem;
  line-height: 1.33;
`;
const Required = styled.span`
  color: #d02b20;
  font-size: 0.875rem;
`;
const FlyoutWrapper = styled.div`
  z-index: 50;
`;
