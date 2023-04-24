import { CardList } from "../../components/cardList/CardList";
import { Paginate } from "../../components/pagination/Pagination";
import { Sort } from "../../components/sort/Sort";
import { cast } from "../../utils/utils";
import { useSelector } from "react-redux";

export const CatalogPage = ({search}) => {

    const cards = useSelector(s => s.cards.posts);

    return <>
        <Sort />
        {search && (
            <p className='countPosts'>
                По запросу {search} найдено {cast(cards.length)}
            </p>
        )}
        <CardList cards={cards}/>
        <Paginate/>
    </>
};