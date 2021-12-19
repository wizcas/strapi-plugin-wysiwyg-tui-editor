import React from 'react';
import styled from 'styled-components';
import { prefixFileUrlWithBackendUrl, useLibrary } from '@strapi/helper-plugin';

export default function MediaLib({ isOpen, onClose, editor }) {
  const { components } = useLibrary();
  const MediaLibDialog = components['media-library'];

  function handleSelectAssets(files) {
    if (!editor) {
      console.error('editor instance not found');
      return;
    }
    const formattedFiles = files.map((f) => ({
      alt: f.alternativeText || f.name,
      url: prefixFileUrlWithBackendUrl(f.url),
      mime: f.mime,
    }));

    formattedFiles.forEach(({ url, alt }) => {
      editor.exec('AddImage', {
        imageUrl: url,
        altText: alt,
      });
      editor.insertText('\n');
    });
    onClose();
  }

  return isOpen ? (
    <ModalLayer>
      <MediaLibDialog onClose={onClose} onSelectAssets={handleSelectAssets} />
    </ModalLayer>
  ) : null;
}

const ModalLayer = styled.div`
  z-index: 100;
`;
