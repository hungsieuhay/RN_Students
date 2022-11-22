import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const options = [
  {id: 1, name: 'paper', source: require('../assets/images/paper.png')},
  {id: 2, name: 'rock', source: require('../assets/images/rock.png')},
  {id: 3, name: 'scissors', source: require('../assets/images/scissors.png')},
];

export const TieGame = () => {
  const [userOption, setUserOption] = useState({});
  const [comOption, setComOption] = useState({});
  const [result, setResult] = useState();

  const handleUserPress = item => {
    setUserOption(item);
    console.log(userOption);
  };

  const handleComOption = () => {
    const optionIdRandom = Math.floor(Math.random() * 3) + 1;
    const randomOption = options.find(option => option.id === optionIdRandom);
    setComOption(randomOption);
  };

  const handlePlayAgain = () => {
    setResult();
    setUserOption({});
    setComOption({});
  };

  useEffect(() => {
    setTimeout(() => {
      if (Object.keys(userOption).length && Object.keys(comOption).length) {
        if (userOption.name === comOption.name) {
          setResult('Draw');
          console.log(result);
        } else if (userOption.name === 'rock') {
          if (comOption.name === 'scissors') {
            setResult('Rock smashes scissors! You win!');
            console.log(result);
          } else {
            setResult('Paper covers rock! You lose.');
          }
        } else if (userOption.name === 'paper') {
          if (comOption.name === 'rock') {
            setResult('Paper covers rock! You win!');
            console.log(result);
          } else {
            setResult('Scissors cuts paper! You lose.');
            console.log(result);
          }
        } else if (userOption.name === 'scissors') {
          if (comOption.name === 'paper') {
            setResult('Scissors cuts paper! You win!');
            console.log(result);
          } else {
            setResult('Rock smashes scissors! You lose.');
            console.log(result);
          }
        }
      } else {
        return;
      }
    }, 500);
  }, [userOption, comOption, result]);

  return (
    <View style={styles.mainScreen}>
      <Text style={styles.title}>Tie game!</Text>
      {result ? (
        <View style={styles.resultScreen}>
          <Text style={styles.resultText}>{result}</Text>
          <Button title="Play again" onPress={handlePlayAgain} />
        </View>
      ) : (
        <View>
          <View style={styles.contaner}>
            <View style={styles.option}>
              <Text style={styles.userName}>You</Text>
              {Object.keys(userOption).length ? (
                <Image source={userOption.source} style={styles.image} />
              ) : (
                <Image
                  source={require('../assets/images/question_mark.png')}
                  style={styles.image}
                />
              )}
            </View>
            <Button
              title="Play"
              onPress={handleComOption}
              disabled={Object.keys(userOption).length === 0}
            />
            <View style={styles.option}>
              <Text style={styles.comName}>Computer</Text>
              <View>
                {Object.keys(comOption).length ? (
                  <Image source={comOption.source} style={styles.image} />
                ) : (
                  <Image
                    source={require('../assets/images/question_mark.png')}
                    style={styles.image}
                  />
                )}
              </View>
            </View>
          </View>
          <View>
            {options.map(item => (
              <View key={item.id}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleUserPress(item)}>
                  <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    padding: 10,
  },
  resultScreen: {
    borderWidth: 2,
    borderColor: '#000',
    width: '100%',
    height: 200,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  resultText: {
    fontSize: 40,
    color: 'green',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'pink',
  },
  contaner: {
    borderWidth: 2,
    borderColor: '#000',
    paddingVertical: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#065fd4',
    width: '100%',
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  image: {
    width: 150,
    height: 150,
    marginHorizontal: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'red',
  },
  comName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'blue',
  },
  option: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
