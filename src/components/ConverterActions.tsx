import React, { memo, useCallback } from 'react';
import { exportData } from 'helpers/utils';
import { Clear, ContentCopy, Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useAppDispatch } from 'hooks/useRedux';
import { alert } from 'redux/toastSlice';
import styled from 'styled-components';
import { ToastType } from 'types/Common';

type Props = {
  content: string;
  exportFileType: string;
  onClearInput: () => void;
  errorHandler: (error: unknown) => void;
};

const WrapperStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 1rem;
`;

const ConverterActions: React.FC<Props> = ({
  content,
  onClearInput,
  exportFileType,
  errorHandler,
}) => {
  const dispatch = useAppDispatch();

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(content || '');

    dispatch(alert('Content copied', ToastType.SUCCESS));
  }, [content, dispatch]);

  const handleExport = useCallback(() => {
    try {
      exportData(content, `export_${Date.now()}.${exportFileType}`);
    } catch (error: unknown) {
      errorHandler(error);
    }
  }, [content, errorHandler, exportFileType]);

  return (
    <WrapperStyled>
      <Button
        variant="contained"
        color="warning"
        size="small"
        title="Copy"
        fullWidth={false}
        onClick={handleCopy}
        startIcon={<ContentCopy />}
        disabled={!content}
      >
        Copy
      </Button>
      <Button
        variant="contained"
        color="error"
        size="small"
        title="Clear"
        fullWidth={false}
        onClick={onClearInput}
        startIcon={<Clear />}
        disabled={!content}
      >
        Clear
      </Button>
      <Button
        variant="contained"
        color="info"
        size="small"
        title="Export"
        fullWidth={false}
        onClick={handleExport}
        startIcon={<Save />}
        disabled={!content}
      >
        Export
      </Button>
    </WrapperStyled>
  );
};

export default memo(ConverterActions);
