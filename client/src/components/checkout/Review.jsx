import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = ({ user, cart, total }) => {
  const classes = useStyles();

  const payment = JSON.parse(localStorage.getItem("payment"));
  const client = JSON.parse(localStorage.getItem("adress"));

  const cardNumber = payment[1].slice(payment[1].length - 4, payment[1].length);
  console.log(cardNumber);
  const products = cart.product.map((ele) => {
    return (ele = {
      name: ele.name,
      price: `$ ${ele.price}`,
    });
  });

  const addresses = client
    ? [client.address1, client.city, client.zip, client.country]
    : "";
  const payments = [
    { name: "Card type", detail: payment[0] },
    { name: "Card holder", detail: `${user.name} ${user.lastname}` },
    { name: "Card number", detail: `xxxx-xxxx-xxxx-${cardNumber}` },
    { name: "Expiry date", detail: payment[2] },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $ {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {client && client.name} {client && client.lastname}
          </Typography>
          <Typography gutterBottom>
            {addresses && addresses.join(",  ")}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    cart: state.orderReducer.cartProducts,
    total: state.orderReducer.cartProducts.totalPrice,
  };
};

export default connect(mapStateToProps, null)(Review);
