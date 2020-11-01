import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

function PaypalCheckoutButton({ order, handleBan }) {

    // const itemsList = order.items.map(element => (
    //         element.props.children.map(elements => (
    //             elements
    //         ))
    // ))

    const paypalConf = {
        currency: 'USD',
        env: 'sandbox',
        client: {
            sandbox: 'AYRsaRpaPClVHLzRQuOnOdT0js51t-_V_KVw9NeOj1CHcqaHHrZHgbvOdW25c1vfgzIl6wviPYiqB5qp',
            production: '-- id--',
        },
        style: {
            label: 'pay',
            size: 'medium',
            shape: 'rect',
            color: 'gold'
        }
    }

    const PayPalButton = paypal.Button.driver('react', { React, ReactDOM })

    const payment = (data, actions) => {
        const payment = {
            transactions: [
                {
                    amount: { 
                        total: order.total,
                        currency: paypalConf.currency
                    },
                    description: 'Buy in CyberFitness',
                    custom: order.customer || '',
                    item_list : {
                        items: order.items
                    }
                }
            ],
            note_to_payer: 'Feel free to contact us for any inconvenience',
        }
        return actions.payment.create({ payment })
    }
    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
        .then(response => {
            console.log(response)
            alert(`Payment processed correctly, ID: ${response.id}`)
            handleBan(false)
        })
        .catch(error => {
            console.log(error)
            alert('An error ocurred while processing the paymnet')
        })
    }
    const onError = (error) => {
      console.log(error);
      alert("Payment failed, try again");
    };
    const onCancel = (data, actions) => {
        alert('Payment was cancel by the user')
    }
    return (
        <PayPalButton 
            env={paypalConf.env}
            client={paypalConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale="en_US"
        />
    )
}

export default PaypalCheckoutButton
