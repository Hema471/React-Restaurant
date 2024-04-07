import { signal } from "@preact/signals-react"

export const isDarkMode = signal(localStorage.getItem('darkMode') == 'true'? true: false);
export const UserData = signal(localStorage.getItem('UserData') == 'true'? {loggedIn:true}: {loggedIn:false});


export const Cart = signal({ResId:"",meals:[]});


export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
