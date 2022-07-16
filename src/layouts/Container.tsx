import React, { ReactNode, HTMLProps } from 'react';
import classNames from 'classnames';

type ContainerProps = {
  className?: string;
  children: ReactNode;
} & HTMLProps<HTMLDivElement>;

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => {
  const classes = classNames('ui-container', className);

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
