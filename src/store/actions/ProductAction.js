export const saveProductList = (list) => {
    return {
        type: 'ADD_PRODUCT_LIST',
        payload: {
            list
        }
    }
}