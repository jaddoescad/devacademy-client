import {firStorage} from 'src/firebase'
import {getStorage, uploadBytes, getDownloadURL, ref} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'


export const uploadImageToFirebase = (fileImage) => {
    const file = fileImage;
    const coverImageRef = ref(firStorage, `course-cover-image/${uuidv4()}`);
  
    //   var userRef = storageRef.child('course-cover-image').child(uuidv4())
    return uploadBytes(coverImageRef, fileImage)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref) // Will return a promise with the download link
    })
  };