import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-message';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const handleRegister = async (
  name: string,
  email: string,
  password: string,
  profileImageUri: string | null,
  navigation: any,
) => {
  if (!name || !email || !password) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Please fill in all fields.',
    });
    return;
  }

  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    let profileImageUrl = null;
    if (profileImageUri) {
      const reference = storage().ref(`profile_pictures/${user.uid}`);
      await reference.putFile(profileImageUri);
      profileImageUrl = await reference.getDownloadURL();
    }

    await firestore().collection('users').doc(user.uid).set({
      name,
      email,
      profileImageUrl,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'User registered successfully!',
    });

    setTimeout(() => {
      navigation.navigate('Signin', {displayName: name});
    }, 1300);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: (error as Error).message,
    });
    console.log(error);
  }
};

export const pickImageFromGallery = (
  setProfileImageUri: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  launchImageLibrary({mediaType: 'photo'}, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.error('Image Picker Error: ', response.errorMessage);
    } else {
      setProfileImageUri(response.assets?.[0].uri || null);
    }
  });
};

export const captureImageFromCamera = (
  setProfileImageUri: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  launchCamera({mediaType: 'photo'}, response => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.errorMessage) {
      console.error('Camera Error: ', response.errorMessage);
    } else {
      setProfileImageUri(response.assets?.[0].uri || null);
    }
  });
};

export const handleGoogleSignIn = async (navigation: any) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const userCredential = await auth().signInWithCredential(
      auth.GoogleAuthProvider.credential(userInfo.idToken),
    );

    const user = userCredential.user;
    const profileImageUrl = userInfo.user.photo;

    await firestore().collection('users').doc(user.uid).set({
      name: userInfo.user.name,
      email: userInfo.user.email,
      profileImageUrl,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'User registered successfully with Google!',
    });

    setTimeout(() => {
      navigation.navigate('Home');
    }, 1300);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: (error as Error).message,
    });
    console.log(error);
  }
};

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '327304051789-3mbatsbqrg62ev3fcp0efgoh9c84misb.apps.googleusercontent.com',
  });
};
