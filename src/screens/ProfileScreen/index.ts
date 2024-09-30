import {useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';

export const useProfileScreenLogic = () => {
  const [userName, setUserName] = useState<string>('');
  const [handlerName, setHandlerName] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const tableData = [
    {
      id: 1,
      title: 'Invite Freinds',
      icon: 'ShareIcon',
    },
    {
      id: 2,
      title: 'Account Info',
      icon: 'UserIcon',
    },
    {
      id: 3,
      title: 'Persnol Info',
      icon: 'UsersIcon',
    },
    {
      id: 4,
      title: 'Logout',
      icon: 'ArrowTopRightOnSquareIcon',
    },
    {
      id: 5,
      title: 'Message Center',
      icon: 'ChatBubbleBottomCenterTextIcon',
    },
    {
      id: 6,
      title: 'Login and Security',
      icon: 'LockClosedIcon',
    },
    {
      id: 7,
      title: 'Data and Privacy',
      icon: 'ShieldExclamationIcon',
    },
  ];
  useEffect(() => {
    const fetchUserData = async () => {
      const user: FirebaseAuthTypes.User | null = auth().currentUser;

      if (user) {
        try {
          const userDoc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData> =
            await firestore().collection('users').doc(user.uid).get();

          if (userDoc.exists) {
            setUserName(userDoc.data()?.name || '');
            setProfileImage(
              userDoc.data()?.profileImageUrl ||
                'https://img.icons8.com/?size=100&id=23242&format=png&color=000000',
            );
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
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
  }, [userName]);

  return {
    userName,
    handlerName,
    profileImage,
    loading,
    tableData,
  };
};

export const pickImage = async (
  setProfileImageUri: React.Dispatch<React.SetStateAction<string | null>>,
  source: 'gallery' | 'camera',
) => {
  const options: any = {mediaType: 'photo'};

  const handleResponse = async (response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.error('Image Picker Error: ', response.errorMessage);
    } else {
      const uri = response.assets?.[0].uri || null;
      if (uri) {
        setProfileImageUri(uri);

        const user = auth().currentUser;
        if (user) {
          try {
            const storageRef = storage().ref(
              `profile_pictures/${user.uid}.jpg`,
            );
            const task = storageRef.putFile(uri);
            await task;
            const downloadURL = await storageRef.getDownloadURL();
            await firestore().collection('users').doc(user.uid).update({
              profileImageUrl: downloadURL,
            });

            console.log('Profile image uploaded and URL saved to Firestore');
            setProfileImageUri(downloadURL);
          } catch (error) {
            console.error(
              'Error uploading image or updating Firestore:',
              error,
            );
          }
        }
      }
    }
  };

  if (source === 'gallery') {
    // Launch image library
    launchImageLibrary(options, handleResponse);
  } else if (source === 'camera') {
    // Launch camera
    launchCamera(options, handleResponse);
  } else {
    Alert.alert('Invalid Option', 'Please choose a valid option.');
  }
};
