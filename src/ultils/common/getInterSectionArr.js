export const getInterSectionArr = (...arrays) => {
    if (arrays.length < 2) {
        return arrays;
    }

    // Hàm so sánh đối tượng dựa trên trường "name"
    const compareObjects = (obj1, obj2) => obj1.id === obj2.id;

    const commonObjects = arrays[0].filter(obj1 => {
        return arrays.slice(1).every(arr => arr.some(obj2 => compareObjects(obj1, obj2)));
    });

    console.log(commonObjects)

    return commonObjects;
}