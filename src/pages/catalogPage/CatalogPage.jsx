import { useContext } from "react"
import { CardList } from "../../components/cardList/CardList";
import { Sort } from "../../components/sort/Sort";
import { CardContext } from "../../context/CardContext"
import { UserContext } from "../../context/UserContext";
import { cast } from "../../utils/utils";

export const CatalogPage = () => {

    const { cards } = useContext(CardContext);
    const { statSarch } = useContext(UserContext);

    return <>
        <Sort />
        {statSarch && (
            <p className='countPosts'>
                По запросу {statSarch} найдено {cast(cards.length)}
            </p>
        )}
        <CardList />
    </>
};