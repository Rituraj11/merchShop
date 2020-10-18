// -----------Category Calls -------------
// Create Category call
export const createCategory = (userId, token, category) => {
    return fetch(`http://localhost:5000/api/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)    
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err))
};


// Get a Category
export const getCategory = categoryId => {
    return fetch(`http://localhost:5000/api/category/${categoryId}`,{
        method: 'GET',
    })
        .then( response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

// Get all categories call
export const getAllCategories = () => {
    return fetch('http://localhost:5000/api/categories', {
        method: 'GET',
    })
        .then( response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

// Delete category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`http://localhost:5000/api/category/${categoryId}/${userId}`,{
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err))
}

// Update category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`http://localhost:5000/api/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: category  
    })
    .then( response => {
        
        return response.json();
    })
    .catch(err => console.log(err))
};    

// --------- Product calls ----------------
// Create product call
export const createProduct = (userId, token, product) => {
    return fetch(`http://localhost:5000/api/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then( response => {
        return response.json()
    })
      .catch( err => console.log(err))
}

// Get all products call
export const getAllProduct = () => {
    return fetch('http://localhost:5000/api/products', {
        method: 'GET',
    })
        .then( response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

// Delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`http://localhost:5000/api/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        } 
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err))
};


// Get a product
export const getProduct = productId => {
    return fetch(`http://localhost:5000/api/product/${productId}`,{
        method: 'GET',
    })
        .then( response => {
            return response.json()
        })
        .catch( err => console.log(err))
}

//Update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`http://localhost:5000/api/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product   
    })
    .then( response => {
        return response.json();
    })
    .catch(err => console.log(err))
};