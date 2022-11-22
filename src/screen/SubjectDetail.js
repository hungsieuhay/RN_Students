import React, { useEffect, useMemo, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import subjectsApi from '../api/subjectApi';
import { addSubject, updateSubject } from '../features/subject/subjectSlice';

const SubjectDetail = ({ navigation, route }) => {
  const [subjectName, setSubjectName] = useState('');
  const [teacher, setTeacher] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [subjectNameError, setSubjectNameError] = useState('');
  const [teacherError, setTeacherError] = useState('');
  const [classRoomError, setClassRoomError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();
  const { subjectList, isAdd, subjectUpdated } = useSelector((state) => state.subject);
  // const { studentRegister } = route.params;
  // console.log(studentRegister);

  useEffect(() => {
    if (!isAdd) {
      setSubjectName(subjectUpdated.subjectName);
      setTeacher(subjectUpdated.teacher);
      setClassRoom(subjectUpdated.classRoom);
    }
  }, [subjectUpdated, isAdd]);

  // const newSubjectUpdated = useMemo(() => {
  //   if (studentRegister) {
  //     const newSubject = {
  //       ...subjectUpdated,
  //       students: [...subjectUpdated.students, studentRegister],
  //       isRegister: true,
  //     };
  //     console.log(newSubject);
  //     return newSubject;
  //   }
  // }, [studentRegister, subjectUpdated]);
  // console.log('newSubjectUpdated: ', newSubjectUpdated.students);

  const handleSubmit = async () => {
    if (isAdd) {
      if (subjectName !== '' && teacher !== '' && classRoom !== '') {
        const formValue = {
          id: (subjectList.length + 1).toString(),
          subjectName: subjectName,
          teacher: teacher,
          classRoom: classRoom,
          students: [],
          isRegister: false,
        };
        dispatch(addSubject(formValue));
        setIsSuccess(true);
        setSubjectName('');
        setTeacher('');
        setClassRoom('');
        try {
          await subjectsApi.add(formValue);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const updateSubjectdata = {
        id: subjectUpdated.id,
        subjectName: subjectName,
        teacher: teacher,
        classRoom: classRoom,
        students: subjectUpdated.students,
        isRegister: subjectUpdated.isRegister,
      };
      dispatch(updateSubject(updateSubjectdata));
      setIsEdited(true);
      setSubjectName('');
      setTeacher('');
      setClassRoom('');
      try {
        await subjectsApi.update(updateSubjectdata);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeSubjectName = (text) => {
    if (text.length > 50) {
      setSubjectNameError('Class name too long... Retype name');
    } else {
      setSubjectNameError('');
      setSubjectName(text);
    }
  };

  const handleChangeTeacher = (text) => {
    if (text.length > 50) {
      setTeacherError('Teacher name too long... Retype name');
    } else {
      setTeacherError('');
      setTeacher(text);
    }
  };

  const handleChangeClassroom = (text) => {
    if (text.length > 10) {
      setClassRoomError('Classroom name too long... Retype name');
    } else {
      setClassRoomError('');
      setClassRoom(text);
    }
  };

  const handleDoneToast = () => {
    setIsSuccess(false);
    navigation.goBack('Subject');
  };

  const handleEditToast = () => {
    setIsSuccess(false);
    navigation.goBack('Subject');
  };

  return (
    <View>
      <View style={styles.input}>
        <Text style={styles.title}>Subject name</Text>
        <TextInput
          style={styles.inputField}
          defaultValue={subjectName}
          onChangeText={(text) => handleChangeSubjectName(text)}
        />
      </View>
      {subjectNameError && <Text style={styles.errorMessage}>{subjectNameError}</Text>}

      <View style={styles.input}>
        <Text style={styles.title}>Teacher</Text>
        <TextInput
          style={styles.inputField}
          defaultValue={teacher}
          onChangeText={(text) => handleChangeTeacher(text)}
        />
      </View>
      {teacherError && <Text style={styles.errorMessage}>{teacherError}</Text>}
      <View style={styles.input}>
        <Text style={styles.title}>Classroom</Text>
        <TextInput
          style={styles.inputField}
          defaultValue={classRoom}
          onChangeText={(text) => handleChangeClassroom(text)}
        />
      </View>
      {classRoomError && <Text style={styles.errorMessage}>{classRoomError}</Text>}

      <Button
        title='submit'
        onPress={handleSubmit}
        disabled={!!subjectNameError || !!teacherError || !!classRoomError}
      />
      {/* <View>
        {newSubjectUpdated.students.length > 0 &&
          newSubjectUpdated.students.map((item) => <Text key={item.id}>{item.name}</Text>)}
      </View> */}
      {isSuccess && (
        <View style={styles.toast}>
          <Text>Success</Text>
          <Button title='done' onPress={handleDoneToast} />
        </View>
      )}
      {isEdited && (
        <View style={styles.toast}>
          <Text>Subject has been edited</Text>
          <Button title='done' onPress={handleEditToast} />
        </View>
      )}
    </View>
  );
};

export default SubjectDetail;

const styles = StyleSheet.create({
  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginRight: 20,
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    margin: 4,
  },
  imagePress: {
    borderWidth: 3,
    borderColor: 'blue',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    width: '80%',
    height: 40,
    fontSize: 16,
    padding: 8,
  },
  errorMessage: {
    fontSize: 12,
    color: 'red',
  },
  buttonSubmit: {
    width: '100%',
    height: 30,
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
