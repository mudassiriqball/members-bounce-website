
export default function handleTopHundredSearch(list, val, setQuery, setIsSearch, setSearchList) {
  setQuery(val);
  if (val === '') {
    setIsSearch(false);
    setSearchList([]);
  }
  else {
    setIsSearch(true);
    setSearchList(list && list.filter(item => {
      try {
        const itemData = `${item && item.course.toUpperCase()} ${item && item.region && item.region.toUpperCase()} ${item && item.courseType && item.courseType.toUpperCase()}`;
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      } catch (error) {
        return false;
      }
    }));
  }
}