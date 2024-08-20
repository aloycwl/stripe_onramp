const express = require("express");
const app = express();
const Stripe = require("stripe");
const stripe = Stripe('sk_test_51ONR74CREOY0emWDVLhcbnHir4JXUaLh1KeGlPDh8E73t5Hz6N8ED5ocG24UVe7rrS99kDiuq0E5c08FpLO7RO0v00XKHwv2Av');
const OnrampSessionResource = Stripe.StripeResource.extend({
  create: Stripe.StripeResource.method({
    method: 'POST',
    path: '/crypto/onramp_sessions',
  }),
});


app.use(express.static("public"));
app.use(express.json());

app.post("/test/create-onramp-session", async (req, res) => {
  const { transaction_details } = req.body;

  const onrampSession = await new OnrampSessionResource(stripe).create({
    transaction_details: {
      destination_currency: transaction_details["destination_currency"],
      destination_exchange_amount: transaction_details["destination_exchange_amount"],
      destination_network: transaction_details["destination_network"],
    },
    customer_ip_address: req.socket.remoteAddress,
  });

  res.send({
    clientSecret: onrampSession.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));