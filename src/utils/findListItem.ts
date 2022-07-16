const findListItem = (array: any[], id: string): any => {
    const item = array.find((item: any) => item.id === id);
    return item;
};

export default findListItem;
