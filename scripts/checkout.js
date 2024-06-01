import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import '../data/cart-class.js'
// import '../data/backend-practice.js';

async function loadPage() {
    try {
        // throw 'error1';

        await loadProductsFetch();
        
        const value = await new Promise((resolve, reject) => {
            // throw 'error2';
            loadCart(() => {
                // reject('error3');
                resolve('value3');
            });
        })

    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
    // console.log(value)
};
loadPage();

/* // Longcut:
function loadPage() {
    return new Promise((resolve) => {
        console.log('load page');
        resolve();

    }).then(() => {
        return loadProductsFetch()

    }).then(() => {
        return new Promise((resolve) => {
            resolve('value2');
        });
    });
};

// Shorcut for the above code:
async function loadPage() {
    console.log('load page');

    await loadProductsFetch()

    return 'value2'
};
*/

/* // Longcut:
function loadPage() {
    return new Promise((resolve) => {
        console.log('load page');
        resolve();
    });
};

// Shorcut for the above code:
async function loadPage() {
    console.log('load page');
}
*/


/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((value) => {
    // console.log(value)
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    // console.log('start promise')
    loadProducts(() => {
        // console.log('finished loading')
        resolve('value1');
    });

}).then((value) => {
    // console.log('next step')
    console.log(value);

    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/