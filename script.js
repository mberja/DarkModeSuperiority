const BBTEA_PRICE = 5.00;
var sum;
var items = []
var prices = []
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
function validates(quantity, fail_message)
{
    if (Number.isInteger(Number(quantity))  && parseInt(quantity) > 0)
    {
        quantity = parseInt(quantity);
    }
    else{
  
            alert(fail_message);
            return -1;

        }
      

    return quantity;
}

function add_to_cart()
{
    if ($('input[name=flavor]:checked').length > 0) {
        var radios = jQuery("input[type='radio']");
        var bubble_tea = radios.filter(":checked").val();

        var toppings = ["boba","grass_jelly","cheese","egg_pudding"];
        var topping_selection = [];
        var i;

        for (i = 0 ; i < toppings.length ; i++)
        {
            if (document.getElementById(toppings[i]).checked)
            {
                topping_selection.push(toppings[i]);
            }
        }
        var price;
        var quantity = document.getElementById("quantity").value;
        quantity = validates(quantity, "please input a valid number of drinks (integer greater than 0!) ")

        if (quantity == -1)
        {
            return;
        }
    

        price = quantity * (BBTEA_PRICE + topping_selection.length * .5)
        if (topping_selection.length == 0)
        {
            items.push(bubble_tea + "with no toppings")
        }
        else{
            items.push(bubble_tea + "with" + topping_selection.toString())
        }
        prices.push(price);

        document.getElementById("carted").innerHTML += "<hr>";
        document.getElementById("carted").innerHTML += "<h5><strong> price: </strong>" + formatter.format(price) + "<br><strong> item: </strong>" + bubble_tea + " with </h5>";

        if (topping_selection.length == 0)
        {
            document.getElementById("carted").innerHTML +=  "<h5 style = 'margin-top: -40px'> no toppings </h5>";
        }
        else
        {
            for (i = 0 ; i < topping_selection.length; i++)
            {
                document.getElementById("carted").innerHTML += "<h5 style = 'margin-top: -40px'>" + topping_selection[i] + " </h5>";
            }
        }
    }
    else
    {
        alert("please select a flavor!")
    }

    sum = prices.reduce(function(a, b){
        return a + b;
    }, 0);
    document.getElementById("tax").innerHTML = "";
    document.getElementById("total").innerHTML = "";
    document.getElementById("subtotal").innerHTML =  formatter.format(sum);
}
function checkout()
{
    document.getElementById("tax").innerHTML = formatter.format(sum * .15);
    document.getElementById("total").innerHTML = formatter.format(sum+sum * .15);


}

