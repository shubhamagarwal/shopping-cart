export const saveProductList = (list) => {
    console.log('inAction', list)
    return {
        type: 'ADD_PRODUCT_LIST',
        payload: {
            list
        }
    }
}