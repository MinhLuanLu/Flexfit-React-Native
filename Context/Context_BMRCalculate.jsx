import React from 'react';
// Create the context
import { useState } from 'react';
export const BMRContext = React.createContext();

// Create the provider component
export const BMRProvider = ({ children }) => {
  const [publicFitnessLevel, setPublicFitnessLevel] = React.useState('');
  const [publicGoal, setPublicGoal] = React.useState('');
  const [publicAge, setPublicAge] = React.useState();  
  const [publicHeight, setPublicHeight] = React.useState();  
  const [publicWeight, setPublicWeight] = React.useState();
  const [publicFatPrecent, setPublicFatPercent] = React.useState();  
  const [publicActiveLevel, setPublicActiveLevel] = React.useState('');

  
  
  const [publicBMR, setPublicBMR] = React.useState();/////////////////////////// use them to store and displaly to screen
  const [publicTDEE, setPublicTDEE] = React.useState();
  const [publicCalorie, setPublicCalorie] = useState(null);
  const [publicProtein, setPublicProtein] = useState(null);
  const [publicFat, setPublicFat] = useState(null);
  const [publicCarb, setPublicCarb] = useState(null);

  const [publicCalorieLeft, setPublicCalorieLeft] = useState();//maybe delete


  const [publicTotalCalorieDidTake, setPublicTotalCalorieDidTake] = useState(null); /////////////////////////// use them to calulate the Macro of Scan Picture
  const [publicTotalProteinDidTake, setPublicTotalProteinDidTake] = useState(null);
  const [publicTotalFatDidTake, setPublicTotalFatDidTake] = useState(null);
  const [publicTotalCarbDidTake, setPublicTotalCarbDidTake] = useState(null);

  
 const [publicObjectCalorie, setPublicObjectCalorie] = useState(null);
 const [publicObjectProtein, setPublicObjectProtein] = useState(null);
 const [publicObjectFat, setpublicObjectFat] = useState(null);
 const [publicObjectCarb, setPublicObjectCarb] = useState(null);

 const [publicTotalCalorieDefault, setPublicTotalCalorieDefault] = useState(null)/////////////////////////// use them to calulate the Macro of Scan Picture
 const [publicTotalProteinDefault, setPublicTotalProteinDefault] = useState(null)
 const [publicTotalFatDefault, setPublicTotalFatDefault] = useState(null)
 const [publicTotalCarbDefault, setPublicTotalCarbDefault] = useState(null)
 //////////////////////////////////////////////////////////
 const [publicCaloriePercentLeft, setPublicCaloriePercentLeft ] = useState(null);
 const [publicProteinPercentLeft, setPublicProteinPercentLeft] = useState(null)
 const [publicFatPercentLeft, setPublicFatPercentLeft] = useState(null)
 const [publicCarbPercentLeft, setPublicCarbPercentLeft] = useState(null)


  return (
    <BMRContext.Provider value={{ publicAge, setPublicAge, 
                                  publicHeight,setPublicHeight, 
                                  publicWeight, setPublicWeight, 
                                  publicFitnessLevel,setPublicFitnessLevel, 
                                  publicGoal,setPublicGoal, 
                                  publicFatPrecent, setPublicFatPercent, 
                                  publicActiveLevel,setPublicActiveLevel,

                                  ////Get data and update the Macro from Database everytime User login
                                  publicBMR, setPublicBMR,
                                  publicTDEE, setPublicTDEE,
                                  publicCalorie, setPublicCalorie,
                                  publicProtein, setPublicProtein,
                                  publicFat, setPublicFat,
                                  publicCarb, setPublicCarb,



                                  publicCalorieLeft, setPublicCalorieLeft,
                                  
                                  //Display the Completed Calorie precent in charts
                                  publicTotalProteinDidTake, setPublicTotalProteinDidTake,///////////////////////////
                                  publicTotalCalorieDidTake, setPublicTotalCalorieDidTake,
                                  publicTotalFatDidTake, setPublicTotalFatDidTake,
                                  publicTotalCarbDidTake, setPublicTotalCarbDidTake,


                                  ///Update and save the Macro of Object when user Scan and using for the charts
                                  publicObjectCalorie, setPublicObjectCalorie,
                                  publicObjectProtein, setPublicObjectProtein,
                                  publicObjectFat, setpublicObjectFat,
                                  publicObjectCarb, setPublicObjectCarb,

                                   //// Get the User Macro Default from database
                                   publicTotalCalorieDefault, setPublicTotalCalorieDefault,
                                   publicTotalProteinDefault, setPublicTotalProteinDefault,
                                   publicTotalFatDefault, setPublicTotalFatDefault,
                                   publicTotalCarbDefault, setPublicTotalCarbDefault,

                                   publicCaloriePercentLeft, setPublicCaloriePercentLeft,
                                   publicProteinPercentLeft, setPublicProteinPercentLeft,
                                   publicFatPercentLeft, setPublicFatPercentLeft,
                                   publicCarbPercentLeft, setPublicCarbPercentLeft




                                  }}>
      {children}
    </BMRContext.Provider>
  );
};
