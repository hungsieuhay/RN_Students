import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editStudent, getStudents, goToStudentAddMode } from '../features/student/studentSlice';

const StudentScreen = () => {
  // const [numberItem, setNumberItem] = useState(5);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { studentList, isLoading } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handleEditStudent = (student) => {
    navigation.navigate('Student Detail');
    dispatch(editStudent(student));
  };

  const handleAddRedirect = () => {
    navigation.navigate('Student Detail');
    dispatch(goToStudentAddMode());
  };
  const ItemView = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleEditStudent(item)}>
        <ImageBackground
          source={{
            uri: 'https://img.freepik.com/free-photo/hand-painted-watercolor-background-with-sky-clouds-shape_24972-1095.jpg',
          }}
          style={styles.container}
        >
          <View style={styles.avatar}>
            <Image source={{ uri: item.avatar }} style={styles.image} />
          </View>
          <View style={styles.infor}>
            <Text>Name: {item.name}</Text>
            <Text>Age: {item.age}</Text>
            <Text>email: {item.email}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={studentList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={ItemView}
        ItemSeparatorComponent={ItemSeparatorView}
        ListFooterComponent={isLoading ? <ActivityIndicator size='large' /> : null}
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.1}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddRedirect}>
        <Text>ADD</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    flex: 1,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#C8C8C8',
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
