const searchListItems = (
    array: any[],
    targetProperty: string,
    querySearch: string
) => {
    const items = array.filter((item: any) =>
        item[targetProperty].toLowerCase().includes(querySearch.toLowerCase())
    );

    return items;
};

export default searchListItems;
