import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import studentApi from '../api/studentApi';
import { addStudent, updateStudent } from '../features/student/studentSlice';
import { editSubject, getSubjects } from '../features/subject/subjectSlice';

const studentAvatar = [
  {
    id: 1,
    avaUrl:
      'https://static1.personality-database.com/profile_images/ba3022f125dd4dba883272b692655bdb.png',
  },
  {
    id: 2,
    avaUrl: 'https://demoda.vn/wp-content/uploads/2022/01/anh-avatar-hai-meo-tom-lam-duyen.jpg',
  },
  {
    id: 3,
    avaUrl:
      'https://toigingiuvedep.vn/wp-content/uploads/2021/11/hinh-anh-jerry-hinh-anh-tom-and-jerry-de-thuong.jpg',
  },
];

const StudentDetail = ({ navigation }) => {
  const [isChoose, setIsChoose] = useState(false);
  const [image, setImage] = useState({});
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const dispatch = useDispatch();
  const { studentList, isAdd, studentUpdated } = useSelector((state) => state.student);
  const { subjectList } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(getSubjects());
    if (!isAdd) {
      setImage(studentUpdated.avatar);
      setName(studentUpdated.name);
      setAge(studentUpdated.age.toString());
      setEmail(studentUpdated.email);
    }
  }, [studentUpdated, isAdd, dispatch]);

  const handlePressImage = (ava) => {
    setImage(ava);
    setIsChoose(true);
    console.log(image);
  };

  const handleSubmit = async () => {
    if (isAdd) {
      if (name !== '' && age !== '' && email !== '' && age !== null) {
        const formValue = {
          id: (studentList.length + 1).toString(),
          avatar: image.avaUrl,
          name: name,
          age: parseInt(age),
          email: email,
        };

        dispatch(addStudent(formValue));
        setIsSuccess(true);
        setAge('');
        setEmail('');
        setName('');
        setImage('');
        try {
          await studentApi.add(formValue);
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      const updateStudentdata = {
        id: studentUpdated.id,
        avatar: image.avaUrl || studentUpdated.avatar,
        name: name,
        age: parseInt(age),
        email: email,
      };
      dispatch(updateStudent(updateStudentdata));
      setIsEdited(true);
      setAge('');
      setEmail('');
      setName('');
      setImage('');
      try {
        await studentApi.update(updateStudentdata);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeName = (text) => {
    if (text.length > 20) {
      setNameError('Name too long... Retype name');
    } else {
      setNameError('');
      setName(text);
    }
  };

  const handleChangeAge = (text) => {
    if (parseInt(text) < 0 || parseInt(text) > 100) {
      setAgeError('Wrong age... Retype age');
    } else {
      setAgeError('');
      setAge(text);
    }
  };

  const handleChangeEmail = (text) => {
    if (!text.includes('@')) {
      setEmailError('Not email type... You must include @');
    } else {
      setEmailError('');
      setEmail(text);
    }
  };

  const handleDoneToast = () => {
    setIsSuccess(false);
    navigation.goBack('Student');
  };

  const handleEditToast = () => {
    setIsSuccess(false);
    navigation.goBack('Student');
  };

  // const handlePressRegister = (subjectItem) => {
  //   dispatch(editSubject(subjectItem));
  //   navigation.navigate('Subject Detail', { studentRegister: studentUpdated });
  //   console.log('student update: ', studentUpdated);
  // };
  return (
    <View>
      <View>
        <View style={styles.input}>
          <Text style={styles.title}>Avatar</Text>
          <View>
            <Text>Choose a image</Text>
            <View style={styles.imageContainer}>
              {studentAvatar.map((item) => (
                <View key={item.id}>
                  <TouchableOpacity activeOpacity={1} onPress={() => handlePressImage(item)}>
                    <Image
                      source={{ uri: item.avaUrl }}
                      style={isChoose ? [styles.image, styles.imagePress] : [styles.image]}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.input}>
          <Text style={styles.title}>Name</Text>
          <TextInput
            style={styles.inputField}
            defaultValue={name}
            onChangeText={(text) => handleChangeName(text)}
          />
        </View>
        {nameError && <Text style={styles.errorMessage}>{nameError}</Text>}

        <View style={styles.input}>
          <Text style={styles.title}>Age</Text>
          <TextInput
            style={styles.inputField}
            defaultValue={age}
            onChangeText={(text) => handleChangeAge(text)}
            keyboardType='numeric'
          />
        </View>
        {ageError && <Text style={styles.errorMessage}>{ageError}</Text>}
        <View style={styles.input}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            style={styles.inputField}
            defaultValue={email}
            onChangeText={(text) => handleChangeEmail(text)}
            keyboardType='email-address'
          />
        </View>
        {emailError && <Text style={styles.errorMessage}>{emailError}</Text>}

        <Button
          title='submit'
          onPress={handleSubmit}
          disabled={!!nameError || !!emailError || !!ageError}
        />
      </View>
      {isSuccess && (
        <View style={styles.toast}>
          <Text>Success</Text>
          <Button title='done' onPress={handleDoneToast} />
        </View>
      )}
      {isEdited && (
        <View style={styles.toast}>
          <Text>Student has been edited</Text>
          <Button title='done' onPress={handleEditToast} />
        </View>
      )}
      <View>
        {subjectList.map((subject, index) => (
          <View key={subject.id} style={styles.subjectContainer}>
            <View style={styles.subject}>
              <Text style={styles.subjectName}>{subject.subjectName}</Text>
            </View>
            <TouchableOpacity>
              <Text>Register</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StudentDetail;

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
  subjectContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  subject: {
    padding: 8,
    margin: 5,
    borderRadius: 8,
    backgroundColor: 'green',
    width: '50%',
  },
  subjectName: {
    fontSize: 12,
    color: '#fff',
  },
});
