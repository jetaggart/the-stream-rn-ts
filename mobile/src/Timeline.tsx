import React, { useContext } from "react";
import { Text } from 'react-native';
import { AuthContext } from "../App";


const Timeline: React.FC<{}> = (props) => {
  const auth = useContext(AuthContext);
  return <Text>{auth.user}</Text>
}

export default Timeline
