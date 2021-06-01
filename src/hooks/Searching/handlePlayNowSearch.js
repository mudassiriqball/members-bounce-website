
export default function handlePlayNowSearch(list, val, setQuery, setIsSearch, setSerachList) {
    setQuery(val);
    if (val === '') {
        setIsSearch(false);
        setSerachList([]);
    }
    else {
        setIsSearch(true);
        setSerachList(list && list.filter(item => {
            try {
                const itemData = `${item && item.club.toUpperCase()} ${item && item.region && item.region.toUpperCase()} ${item && item.type && item.type.toUpperCase()}`;
                const textData = val.toUpperCase();
                return itemData.indexOf(textData) > -1;
            } catch (error) {
                return false;
            }
        }));
    }
}