import React, { useContext, useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { StreamClientContext } from "../App";

const Profile: React.FC = () => {
  const stream: any = useContext(StreamClientContext);
  const [feedItems, setFeedItems] = useState<any[]>([])
  const [message, setMessage] = useState('')

  useEffect(fetchFeed, [])

  function fetchFeed() {
    stream
      .feed('user')
      .get()
      .then((response: any) => response.results)
      .then(setFeedItems)
  }

  async function createFeedItem() {
    await stream.feed('user').addActivity({
      verb: 'post',
      object: message,
      message: message,
    })

    setMessage('')
    fetchFeed()
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          onChangeText={setMessage}
          defaultValue={message}
          placeholder="What do you want to say?"
        />
        <Button title="Send" style={styles.submit} onPress={createFeedItem}/>
      </View>
      <FlatList
        data={feedItems.map((item) => {
          return { key: item.id, message: item.message }
        })}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.message}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
  },
  textInput: {
    flex: 1
  },
  submit: {},
  item: {
    padding: 10,
    fontSize: 22,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
})
