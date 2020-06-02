import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import * as backend from './Backend';
import { AuthContext, StreamClientContext } from "../App";

export default function People() {
  const stream: any = useContext(StreamClientContext);
  const authState = useContext(AuthContext);
  const [users, setUsers] = useState<string[]>([])

  async function followUser(user: string) {
    await stream.feed('timeline').follow('user', user)
    Alert.alert(
      `Followed ${user}!`,
      '',
      [
        { text: 'OK' }
      ]
    )
  }

  function renderUserActions(user: string) {
    Alert.alert(
      'Select Action',
      '',
      [
        { text: 'Cancel', onPress: () => {} },
        { text: "Follow", onPress: () => followUser(user) }
      ],
      { cancelable: true }
    );
  }

  useEffect(() => {
    backend
      .users(authState.backendToken)
      .then(setUsers)
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={users.map((u) => {
          return { key: u }
        })}
        renderItem={({ item }) => (
          <Text style={styles.item} onPress={() => renderUserActions(item.key)}>
            {item.key}
          </Text>
        )}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
