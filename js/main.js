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

    showProducts({ products }) {
        this.cleanHTML();

        // iterate the products array   
        products.forEach((item) => {
            const { product, description, id } = item;

            const tableRow = document.createElement('TR');
            tableRow.dataset.id = id;

            const tableHead = document.createElement('TH');
            tableHead.setAttribute("scope", "row");
            tableHead.textContent = id;

            const tableDataProduct = document.createElement('TD');
            tableDataProduct.textContent = product;

            const tableDataDescription = document.createElement('TD');
            tableDataDescription.textContent = description;

            //Boton para eliminar las citas
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> ';

            btnEliminar.onclick = () => deleteProduct(id);

            //Boton para editar una cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>';

            btnEditar.onclick = () => loadEdition(item);


            tableRow.appendChild(tableHead);
            tableRow.appendChild(tableDataProduct);
            tableRow.appendChild(tableDataDescription);
            tableRow.appendChild(btnEliminar);
            tableRow.appendChild(btnEditar);


            tableBody.appendChild(tableRow);



        });


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

// Delete the product 
function deleteProduct(id) {
    // delete the product
    manageProducts.deleteProduct(id);

    // show the message
    interface.showAlert('El producto se eliminó correctamente');

    // Refresh the product list
    interface.showProducts(manageProducts);
}

// Edit a product
function loadEdition(item) {
    const { product, description, id } = item;

    console.log(product);

    // Fill the inputs
    productInput.value = product;
    descriptionInput.value = description;

    // Fill the object
    productObj.product = product;
    productObj.description = description;
    productObj.id = id;

    console.log(productObj);

    // Change the value on the botton
    form.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    edit = true;
}