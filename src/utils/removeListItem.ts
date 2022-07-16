const removeListItem = (array: any[], id: string): any[] => {
    const updatedArray = array.filter((item: any) => item.id !== id);
    return updatedArray;
};

export default removeListItem;
