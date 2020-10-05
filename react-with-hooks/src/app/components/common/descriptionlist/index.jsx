import React from 'react';

//  third party libs
import {isArray, isObject} from 'lodash';

//  styled components
import {
  DescriptionList,
  DescriptionListTitle,
} from './styled';

export default ({
  title,
  data,
  renderListItem
}) => {

  const renderListItems = () => {
    if (isArray(data)) {
      return data.map((item, i) => renderListItem(item, i));
    } else if (isObject(data)) {
      return renderListItem(data);
    }
  }

  return (
    <DescriptionList>
      {
        !!title &&
        <DescriptionListTitle>{title}</DescriptionListTitle>
      }
      {renderListItems()}
    </DescriptionList>
  );
};