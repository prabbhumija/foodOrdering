import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

import { useEffect , useState } from 'react';


  const AvailableMeals = () => {
    const [meals,setMeals]=useState([]);

     useEffect(()=>  {
      const fetchMeals =async ()=>{
   const response =await fetch('https://atlantean-petal-348616-default-rtdb.firebaseio.com/Meals.json');
   const responseData = await response.json();
   const loadedMeals =[];
   for( const key in responseData){
    loadedMeals.push({
      id: key,
      name : responseData[key].name ,
      description :  responseData[key].description,
      price:  responseData[key].price,
    });
   }
     setMeals(loadedMeals);

      };
      fetchMeals();
     },[]);
    
    


    const mealsList =meals.map((meal) =>( 
    <MealItem 
    key = {meal.id}
    id={meal.id}
    name ={meal.name}
     description={meal.description}
     price={meal.price}
     />
     ));
return(
    <section className={classes.meals}>
      <Card>  <ul>
            {mealsList}
        </ul></Card>
       
    </section>

)

  };
  export default AvailableMeals;