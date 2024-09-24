import {useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const useProfileScreenLogic = () => {
  const [userName, setUserName] = useState<string>('');
  const [handlerName, setHandlerName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const user: FirebaseAuthTypes.User | null = auth().currentUser;

      if (user) {
        try {
          const userDoc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> =
            await firestore().collection('users').doc(user.uid).get();

          if (userDoc.exists) {
            setUserName(userDoc.data()?.name || '');
            setProfileImage(userDoc.data()?.profileImageUrl || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // Set loading to false if no user is logged in
      }
    };

    const createHandlerName = (fullName: string): string => {
      const formattedName = fullName.replace(/\s+/g, '').toLowerCase();
      return `@iam${formattedName}`;
    };

    if (userName) {
      const generatedHandlerName = createHandlerName(userName);
      setHandlerName(generatedHandlerName);
    }

    fetchUserData();
  }, [userName]); // Added userName as a dependency

  return {
    userName,
    handlerName,
    profileImage,
    loading, // Return loading state
  };
};
