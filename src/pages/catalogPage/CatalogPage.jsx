import { CardList } from "../../components/cardList/CardList";
import { Paginate } from "../../components/pagination/Pagination";
import { Sort } from "../../components/sort/Sort";
import { cast } from "../../utils/utils";
import { useSelector } from "react-redux";

export const CatalogPage = ({search}) => {

    const {posts} = useSelector(s => s.cards);

    return <>
        <Sort />
        {search && (
            <p className='countPosts'>
                По запросу {search} {cast(posts.length)}
            </p>
        )}
        <CardList cards={posts}/>
        <Paginate/>
    </>
};