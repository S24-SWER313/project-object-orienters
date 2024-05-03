import { useEffect, useState } from "react";
import Meal from './Meal';

function MealsHomePage() {
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/profiles/rawan/posts')
            .then(res => res.json())
            .then(data => {
                // Assuming data._embedded.postList is the correct path
                console.log(data);
                if (data._embedded.postList) {
                    setMeals(data._embedded.postList);

                }
            });
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}> {/* Added flexWrap for better layout handling */}
            {meals.map(element => (
                <Meal
                    // key={element.contentID}  // It's good practice to include a unique 'key' prop when rendering a list
                    // id={element.contentID}
                     category={element} // Assuming you want to display the text data as category
                />
            ))}
        </div>
    );
}

export default MealsHomePage;
