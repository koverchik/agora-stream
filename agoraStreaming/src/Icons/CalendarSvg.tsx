import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

import {TabIconPropsType} from './types';

export const CalendarSvg: FC<TabIconPropsType> = (props) => {
  const {color, size} = props;
  const largerSize = +size * 1.3;

  return (
    <Svg
      width={largerSize}
      height={largerSize}
      viewBox="0 0 131 126"
      fill={color}>
      <Path d="M39.1,38.8c-2.3,0-4.1-1.9-4.1-4.1V19.7c0-2.3,1.9-4.1,4.1-4.1c2.3,0,4.1,1.9,4.1,4.1v14.9C43.2,36.9,41.4,38.8,39.1,38.8  L39.1,38.8z M89.1,38.8c-2.3,0-4.2-1.9-4.2-4.1V19.7c0-2.3,1.9-4.1,4.2-4.1c2.3,0,4.1,1.9,4.1,4.1v14.9  C93.2,36.9,91.4,38.8,89.1,38.8L89.1,38.8z M103.5,103.1V47.7H23.9v55.4H103.5L103.5,103.1z M10.3,33.2c0-5.5,4.4-9.9,9.9-9.9h13.3  v4.4c-1.7,1.5-2.8,3.8-2.8,6.2c0,4.6,3.7,8.3,8.3,8.3c4.6,0,8.3-3.7,8.3-8.3c0-2.5-1.1-4.7-2.8-6.2v-4.4h38.9v4.4  c-1.7,1.5-2.8,3.8-2.8,6.2c0,4.6,3.7,8.3,8.3,8.3c4.6,0,8.3-3.7,8.3-8.3c0-2.5-1.1-4.7-2.8-6.2v-4.4h12.6c5.5,0,9.9,4.4,9.9,9.9  v68.9c0,5.5-4.4,9.9-9.9,9.9h-87c-5.5,0-9.9-4.4-9.9-9.9V33.2L10.3,33.2z M33.7,85.8h11.5v11.5H33.7V85.8L33.7,85.8z M33.7,69.6  h11.5v11.5H33.7V69.6L33.7,69.6z M49.9,69.6h11.5v11.5H49.9V69.6L49.9,69.6z M66.1,69.6h11.5v11.5H66.1V69.6L66.1,69.6z M82.3,69.6  h11.5v11.5H82.3V69.6L82.3,69.6z M82.3,53.4h11.5v11.5H82.3V53.4L82.3,53.4z M66.1,53.4h11.5v11.5H66.1V53.4L66.1,53.4z M49.9,53.4  h11.5v11.5H49.9V53.4L49.9,53.4z M49.9,85.8h11.5v11.5H49.9V85.8L49.9,85.8z" />
    </Svg>
  );
};
