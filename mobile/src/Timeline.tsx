import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StreamClientContext } from "../App";
import { useIsFocused } from "@react-navigation/native";

const Timeline: React.FC = () => {
  const isFocused = useIsFocused();
  const stream: any = useContext(StreamClientContext);
  const [feedItems, setFeedItems] = useState<any[]>([])

  useEffect(() => {
    if (isFocused) {
      stream
        .feed('timeline')
        .get()
        .then((res: any) => setFeedItems(res.results))
    }
  }, [isFocused])

  return (
    <View style={styles.container}>
      <FlatList
        data={feedItems.map((item) => {
          return { key: item.id, author: item.actor.id, message: item.message }
        })}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.message}</Text>
            <Text>{item.author}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default Timeline

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
})
