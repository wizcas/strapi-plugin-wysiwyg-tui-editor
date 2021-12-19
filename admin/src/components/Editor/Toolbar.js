import React from 'react';
import styled from 'styled-components';
import { Button } from '@strapi/design-system/Button';
import SwitchIcon from '@strapi/icons/Layout';
import MediaIcon from '@strapi/icons/PicturePlus';
import ExpandIcon from '@strapi/icons/Expand';

export default function Toolbar({
  previewStyle,
  onChangePreviewStyle,
  onAddMedia,
  onExpand,
}) {
  return (
    <ToolbarLayout>
      <Button
        type="button"
        onClick={onChangePreviewStyle}
        startIcon={<SwitchIcon />}
        variant="secondary"
      >
        {previewStyle === 'vertical' ? 'Tabbed preview' : 'Sided preview'}
      </Button>
      <Button
        type="button"
        startIcon={<MediaIcon />}
        onClick={onAddMedia}
        variant="secondary"
      >
        Add media
      </Button>
      {onExpand && (
        <Button
          type="button"
          onClick={onExpand}
          startIcon={<ExpandIcon />}
          variant="secondary"
        >
          Expand
        </Button>
      )}
    </ToolbarLayout>
  );
}

const ToolbarLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem 0;
  & > *:not(:first-child) {
    margin-left: 0.25rem;
  }
`;
