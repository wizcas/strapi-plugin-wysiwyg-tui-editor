import React, { useEffect } from 'react';
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

  // This is a hack to modify the media dialog's z-index
  useEffect(() => {
    if (!isOpen) return;
    let timer;
    async function waitForModal() {
      return new Promise((r) => {
        timer = setTimeout(() => {
          const modalRoot = document
            .getElementById('asset-dialog-title')
            ?.closest('div[data-react-portal="true"]').firstChild;
          if (modalRoot) {
            r(modalRoot);
          } else {
            return waitForModal();
          }
        }, 10);
      });
    }
    waitForModal().then((modalRoot) => {
      modalRoot.style.zIndex = '10';
    });
    return () => {
      clearTimeout(timer);
    };
  }, [isOpen]);

  return isOpen ? (
    <MediaLibDialog onClose={onClose} onSelectAssets={handleSelectAssets} />
  ) : null;
}
