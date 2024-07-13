import { useParams } from "react-router-dom";
import PostList from '../PostList';

function TrendPage() {
    const { value } = useParams();
    return (
         <PostList key={value} feedType='TOPIC' feedValue={value} offset={0} limit={10} />
    );
}

export default TrendPage;