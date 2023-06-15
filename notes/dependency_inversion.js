// no dependency
// like an abstract or wrapper 

// e.g. STORE -> Payment Process <- APIs (Stripe and Paypal)
// - Payment Process have no dependency and can have as many APIs link to it
// - it act as an intermediate place to 'connect' Store class and the various API
// - this allows the STORE to be 'general' and we dont need to change anything inside the store class
// - all we need to do is to create a StripePayementProcess and a PaypalPaymentProcess and the STORE can just call it easily. 