import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const loginUser = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User | null> => {
  try {
    const userCredential: FirebaseAuthTypes.UserCredential =
      await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};
