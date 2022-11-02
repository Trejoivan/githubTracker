import { useState, useEffect } from 'react';
import './App.css';
import MyCard from './Card.js';
import Axios from 'axios';

function App() {
  const [userData, setUserData] = useState([]);
  const [userCards, setUserCards] = useState([]);

  let testData = [{login: 'auraObscura', id: 87401816, node_id: 'MDQ6VXNlcjg3NDAxODE2', avatar_url: 'https://avatars.githubusercontent.com/u/87401816?v=4'},
  {login: 'katarzyna-kw', id: 73550714, node_id: 'MDQ6VXNlcjczNTUwNzE0', avatar_url: 'https://avatars.githubusercontent.com/u/73550714?v=4'}, 
  {login: 'sganas360', id: 94768901, node_id: 'U_kgDOBaYPBQ', avatar_url: 'https://avatars.githubusercontent.com/u/94768901?v=4'}]
  
  useEffect(() => {
    fetchData()
    console.log('changing');
    
  }, []);


  const fetchData = () => {

    // setUserData(testData)
    /////////////////// (GitHub API) //////////////////////////
    Axios.get('https://api.github.com/repos/Trejoivan/Strongest-link-social/commits').then((response) => {
      setUserData(response['data']);
    }).catch((error) => {
      console.error(error);
    });
  };


  const renderPages = () => {
    let cardHolder = []
    console.log('hi')
    console.log(userData);


    if (userData.length > 1) {
      console.log('bye')
      userData.map(data => {
        cardHolder.push(<MyCard props={data} ></MyCard>) ;
      });
      console.log(cardHolder)
      setUserCards(cardHolder)
    }
    let personDict = {

    }
    



    for (let i = 0; i < userData.length; i++) {
      console.log('the user')

      let person = userData[i]['commit']['author']['name']
      if (person in personDict){
        personDict[person] += 1
      }
      else {
        personDict[person] = 1
      }
    }
    console.log(personDict)

  }; 

  


  return (
    <div className="App">
      <h1>Github Contributors</h1>
      <button onClick={renderPages}> Get the data</button>
      <div className="data">{userCards}</div>
      

    </div>
  );
}

export default App;


