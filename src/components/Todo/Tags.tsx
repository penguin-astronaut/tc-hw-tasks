import React, { HTMLProps } from 'react';
import classNamesLib from 'classnames';
import { ITagItem } from '@base/types';

type TagsProps = {
  items: ITagItem[];
  onItemClick?: (tagId: number) => void;
  isVertical?: boolean;
  classNames?: string;
} & HTMLProps<HTMLDivElement>;

export const Tags: React.FC<TagsProps> = ({
  items,
  onItemClick,
  isVertical,
  classNames,
  ...attrs
}) => {
  const classes = classNamesLib('ui-button-group', classNames, { isVertical });
  const tagClasses = 'ui-button isLink ui-tag';
  return (
    <div className="view-sm">
      <div className={classes} {...attrs}>
        {items.map(({ id, title, isActive }) => (
          <button
            type="button"
            className={classNamesLib(tagClasses, { isActive })}
            key={id}
            onClick={() => onItemClick && onItemClick(id)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};
