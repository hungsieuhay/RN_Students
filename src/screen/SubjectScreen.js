import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editSubject, getSubjects, goToSubjectAddMode } from '../features/subject/subjectSlice';

const SubjectScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { subjectList } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getSubjects());
  }, [dispatch]);

  const handleEditSubject = (subject) => {
    navigation.navigate('Subject Detail');
    dispatch(editSubject(subject));
  };

  const handleRedirectAddMode = () => {
    navigation.navigate('Subject Detail');
    dispatch(goToSubjectAddMode());
  };
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleEditSubject(item)}>
        <View style={styles.container}>
          <View style={styles.infor}>
            <Text>Subject name: {item.subjectName}</Text>
            <Text>Teacher: {item.teacher}</Text>
            <Text>Class room: {item.classRoom}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={subjectList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ItemSeparatorComponent={ItemSeparatorView}
      />
      <TouchableOpacity style={styles.button} onPress={handleRedirectAddMode}>
        <Text>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubjectScreen;

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    flex: 1,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  avatar: {
    width: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 99999,
  },
  infor: {
    width: '70%',
    marginLeft: 30,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    padding: 10,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 8,
    right: 8,
  },
});
