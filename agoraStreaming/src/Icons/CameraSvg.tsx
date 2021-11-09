import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

export const CameraSvg: FC = () => {
  return (
    <Svg fill="#000" width="60%" height="60%" viewBox="0 0 16 16">
      <Path
        fill-rule="evenodd"
        d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"
      />
    </Svg>
  );
};
