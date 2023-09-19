//* Campos del formulario 
// Inputs
const productInput = document.querySelector('#product');
const descriptionInput = document.querySelector('#description');
// Form
const form = document.querySelector('#new-product');
// products lists
const tableBody = document.querySelector("#tableBody");

// variable for edit mode - default value is true
let edit;

//*Classes

// class and methods for product
class Products {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products = [...this.products, product];
    }

    deleteProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
    }

    editProduct(uptatedProduct) {
        this.products = this.products.map((product) =>
            product.id === uptatedProduct.id ? uptatedProduct : product
        );
    }
}