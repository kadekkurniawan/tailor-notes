const replaceListItem = (array: any[], id: string, newItem: Object) => {
    const updatedArray = array.map((item: any) => {
        if (item.id === id) return newItem;
        return item;
    });
    return updatedArray;
};

export default replaceListItem;
