import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

// hello();
// const today = dayjs();
// const deliveryDate = today.add(7, 'days')
// console.log(deliveryDate.format('dddd, MMMM D'));

export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach(cartItem => {
        const { productId } = cartItem;

        let matchingProduct = getProduct(productId);
        // console.log(matchingProduct);
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryTime, 'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );

        const { id, image, name } = matchingProduct;

        cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${image}">

            <div class="cart-item-details">
                <div class="product-name">${name}</div>
                <div class="product-price">${matchingProduct.getPrice()}</div>
                <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">Update</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${id}">Delete</span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(id, cartItem)}            
            </div>
        </div>
    </div>`;

    })

    function deliveryOptionsHTML(id, cartItem) {
        let html = '';
        deliveryOptions.forEach(deliveryOption => {
            const today = dayjs();
            const deliveryDate = today.add(
                deliveryOption.deliveryTime, 'days'
            );
            const dateString = deliveryDate.format(
                'dddd, MMMM D'
            );

            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                <div class="delivery-option js-delivery-option" data-product-id="${id}"     data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                    ${isChecked ? 'checked' : ''} 
                    class="delivery-option-input" name="delivery-option-${id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>`
        });

        return html;
    };

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link')
        .forEach(link => {
            link.addEventListener('click', () => {
                const { productId } = link.dataset;
                removeFromCart(productId);

                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();

                renderPaymentSummary();
            });
        });

    let cartQuantity = 0;

    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-return-to-home-link')
        .innerHTML = `${cartQuantity} items`;

    document.querySelectorAll('.js-delivery-option')
        .forEach(element => {
            element.addEventListener('click', () => {
                const { productId, deliveryOptionId } = element.dataset;
                // console.log(productId, deliveryOptionId);     
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
};
