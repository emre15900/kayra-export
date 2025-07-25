import * as React from 'react';

export type ToastActionElement = React.ReactElement;

export type ToastProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

export function Toast(props: ToastProps) {
  if (!props.open) return null;
  return (
    <div>
      <strong>{props.title}</strong>
      <div>{props.description}</div>
      {props.action}
    </div>
  );
} 