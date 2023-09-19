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

// class for manage the eventes in the user interface
class UI {

    // Function give alerts and feedback about the products status
    showAlert(message, type) {
        const sectionMessage = document.createElement('SECTION');
        sectionMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Type of alert
        if (type === 'error') {
            sectionMessage.classList.add('alert-danger');
        } else {
            sectionMessage.classList.add('alert-success');
        }

        // Message content
        sectionMessage.textContent = message;

        // Add the alert in the DOM
        document.querySelector('#content')
            .insertBefore(sectionMessage, document.querySelector('.add-product'));

        // Remove the alert after 3 seconds
        setTimeout(() => {
            sectionMessage.remove();
        }, 3000);
    }

    cleanHTML() {
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }
    }

}

// *Instance the objects
const interface = new UI();
const manageProducts = new Products();


//* Events

eventListeners();
function eventListeners() {
    productInput.addEventListener('input', dataProduct);
    descriptionInput.addEventListener('input', dataProduct);
    form.addEventListener('submit', newProduct);
}

//* Information product object 
const productObj = {
    product: '',
    description: '',
    id: ''
};

// * Functions 

// function to insert information from inputs to object
function dataProduct(e) {
    // brackets sintaxis is used to access to the object properties 
    productObj[e.target.name] = e.target.value;
}

// function to add a new product to Product array in the class
function newProduct(e) {
    e.preventDefault();

    // destructuring of the product object
    const { product, description, id } = productObj;

    // validate
    if (product === '' || description === '') {
        interface.showAlert('Todos los campos son obligatorios', 'error');
        return;
    }

    if (edit) {
        interface.showAlert('Editado correctamente');

        // Send the object to the edit method
        manageProducts.editProduct({ ...productObj });

        // Back the original text in the button 
        form.querySelector('button[type="submit"]').textContent = 'AGREGAR PRODUCTO';

        // Exit the edit mode
        edit = false;
    } else {
        // Generate a unique ID
        productObj.id = Date.now();

        // Add a new product 
        // We use the spread operator to send the last product and the last products copy
        manageProducts.addProduct({ ...productObj });

        // Feedback to the user
        interface.showAlert('Se agregó correctamente');

    }
    console.log(manageProducts.products);


    // Reset the object
    resetObject();

    // Reset the form
    form.reset();

    // Show the products in HTML
    interface.showProducts(manageProducts);
}

function resetObject() {
    productObj.product = '';
    productObj.description = '';
    productObj.id = '';

}