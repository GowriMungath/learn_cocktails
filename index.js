import express from "express"
import axios from "axios"

const app=express()
const port=3000

app.use(express.static("public"))
app.set("view engine", "ejs");

app.get("/",async (req,res)=>{
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    var ingredients=[]

    var drink = response.data.drinks[0];
    for(var i=1;i<=15;i++){
        var ingredient=drink[`strIngredient${i}`]
        var measure = drink[`strMeasure${i}`];
        if(ingredient){
            ingredients.push(`${measure || ''} ${ingredient}`.trim());
        }else{
            break
        }
    }
    res.render("index.ejs", {name: drink.strDrink, ingr: ingredients, image: drink.strDrinkThumb})
})

app.listen(port,()=>{
    console.log("Server up and running at ", port)
})
