import styled from '@emotion/styled';
import { ToastifyType } from '../ToastContainer';

export const $Toastify = styled.div<Pick<ToastifyType, 'theme' | 'type'>>(
  {
    boxSizing: 'border-box',
    padding: '15px 12px',
    borderRadius: '3px',
    zIndex: 1,
    minWidth: '250px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    backgroundColor: 'rgba(90, 227, 77, 0.8)',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.25)',
  },
  ({ theme, type }) => ({
    backgroundColor:
      theme === 'dark'
        ? '#0e0e0e'
        : theme === 'light'
        ? '#c5c5c5'
        : type === 'info'
        ? '#3c45a7'
        : type === 'success'
        ? 'rgba(90, 227, 77, 0.8)'
        : type === 'warning'
        ? 'rgba(255, 186, 0, 0.8)'
        : type === 'error'
        ? 'rgba(255, 0, 0, 0.8)'
        : '#ffffff',
    color: theme === 'light' ? '#0e0e0e' : '#fff',
  }),
);

export const $ToastifyText = styled.p({
  margin: 0,
  fontWeight: 600,
  padding: 0,
});

export const $ToastifyProgress = styled.div<{ progress: number }>(
  {
    position: 'absolute',
    bottom: 0,
    height: '4px',
    left: 0,
    right: 0,
    borderRadius: '3px',
    background: '#ffffffbf',
    transition: 'width 0.3s ease',
  },
  ({ progress }) => ({
    width: `${progress}%`,
  }),
);
