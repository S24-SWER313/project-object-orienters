import { useParams } from "react-router-dom";

function TrendPage() {
    const { value } = useParams();
    console.log('Received Value:', value);
    return (
        <>
            <h1>Component B</h1>
            <p>Received Value: {value}</p>

          
        </>
    );
}

export default TrendPage;