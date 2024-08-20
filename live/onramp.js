const stripeOnramp = StripeOnramp("pk_test_51ONR74CREOY0emWD7HFOjiXgWaOECPrXWWedmH1qeiBbrqE1Kithn4wUP0b8E86toaIzdYRbS3x4v3MYBPUq07Kd00zDYGzZaL");

let session;

initialize();

async function initialize() {
  const response = await fetch(
    "/create-onramp-session",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transaction_details: {
          destination_currency: "usdc",
          destination_exchange_amount: "13.37",
          destination_network: "ethereum",
        }
      }),
    });
  const { clientSecret } = await response.json();

  session = stripeOnramp
    .createSession({
      clientSecret,
      appearance: {
        theme: "dark",
      }
    })
    .addEventListener('onramp_session_updated', (e) => {
      showMessage(`OnrampSession is now in ${e.payload.session.status} state.`)
    })
    .mount("#onramp-element");
}

function showMessage(messageText) {
  const messageContainer = document.querySelector("#onramp-message");

  messageContainer.textContent = messageText;
}