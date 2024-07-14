// let rowData = $("#rowData");
function openNav() {

    $(".side-nav").animate({
        left: 0
    },500)

    $(".open-close-button").removeClass("fa-align-justify")
    $(".open-close-button").addClass("fa-x")
    
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top:0
        },(i+1)*300)
        
    }


}




// /
function closeNav() {
    let navWidth = $(".nav-links").outerWidth()
    $(".side-nav").animate({
        left: -navWidth
    }, 500)

    $(".open-close-button").addClass("fa-align-justify");
    $(".open-close-button").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}
closeNav();


$(".open-close-button").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})


function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="showMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

  $("#rowData").html(cartoona); 
}



async function searchByName(food) {
    closeNav()
    $("#rowData").html(""); 
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`)
    response = await response.json()
    console.log(response.meals)

     displayMeals(response.meals)  //ternary operator
    $(".inner-loading-screen").fadeOut(300)

}




$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})


async function showMealDetails(mealID) {
    closeNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    // searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();
    console.log(respone);

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}

function displayMealDetails(id) {




    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (id[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-3 p-3">${id[`strMeasure${i}`]} ${id[`strIngredient${i}`]}</li>`
        }
    }


    let tags =id.strTags?.split(",")
    if(!tags) tags=[]
    let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${id.strMealThumb}"
                    alt="">
                    <h2>${id.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${id.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${id.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${id.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tags}
                </ul>

                <a target="_blank" href="${id.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${id.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    $("#rowData").html(cartoona)

}



async function showCategories() {
    $("#rowData").html("")
    $(".inner-loading-screen").fadeIn(300)
    $("#searchArea").html("")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategory(response.categories)
    $(".inner-loading-screen").fadeOut(300)

}
async function showCategoryMeals(category) {
    $("#rowData").html("")
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

function displayCategory(id) {
    let cartoona = "";

    for (let i = 0; i < id.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="showCategoryMeals('${id[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${id[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${id[i].strCategory}</h3>
                        <p>${id[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    $("#rowData").html(cartoona)
    
}









async function showArea() {
    $("#rowData").html("")

    $(".inner-loading-screen").fadeIn(300)

    $("#searchArea").html("")


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}


function displayArea(id) {
    let cartoona = "";

    for (let i = 0; i < id.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${id[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${id[i].strArea}</h3>
                </div>
        </div>
        `
    }

    $("#rowData").html(cartoona)

}

async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}





async function showIngredients() {
    $("#rowData").html("")

    $(".inner-loading-screen").fadeIn(300)

    $("#searchArea").html("")


    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0,20))
    $(".inner-loading-screen").fadeOut(300)

}
function displayIngredients(id) {
    let cartoona = "";

    for (let i = 0; i < id.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${id[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${id[i].strIngredient}</h3>
                        <p>${id[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                        
                </div>
        </div>
        `
    }

    $("#rowData").html(cartoona)
}





async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}





function showSearch() {
    let cartoona = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    $("#searchArea").html(cartoona)

    $("#rowData").html("")

}


async function searchByLetter(term) {
    closeNav()
    $("#rowData").html("")

    $(".inner-loading-screen").fadeIn(300)

    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}

function showContact() {
    $("#rowData").html(`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `) 



    submitBtn = document.getElementById("submitBtn")

$("#nameInput").focus(()=>{
    nameInputTouched = true
})
    
$("#emailInput").focus(()=>{
    emailInputTouched = true
})

$("#phoneInput").focus(()=>{
    phoneInputTouched = true
})


$("#ageInput").focus(()=>{
    ageInputTouched = true
})

$("#passwordInput").focus(()=>{
    passwordInputTouched = true
})

$("#repasswordInput").focus(()=>{
    repasswordInputTouched = true
})

   

    
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            
            $("#nameAlert").removeClass("d-block");
            $("#nameAlert").addClass("d-none");



        } else {
            
            $("#nameAlert").removeClass("d-none");
            $("#nameAlert").addClass("d-block");


        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            
            $("#emailAlert").removeClass("d-block");
            $("#emailAlert").addClass("d-none");

        } else {
            $("#emailAlert").removeClass("d-none");
            $("#emailAlert").addClass("d-block");


        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {

            $("#phoneAlert").removeClass("d-block");
            $("#phoneAlert").addClass("d-none");


        } else {
            $("#phoneAlert").removeClass("d-none");
            $("#phoneAlert").addClass("d-block");


        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            $("#ageAlert").removeClass("d-block");
            $("#ageAlert").addClass("d-none");


        } else {
            $("#ageAlert").removeClass("d-none");
            $("#ageAlert").addClass("d-block");




        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {

            $("#passwordAlert").removeClass("d-block");
            $("#passwordAlert").addClass("d-none");


        } else {

            $("#passwordAlert").removeClass("d-none");
            $("#passwordAlert").addClass("d-block");


        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            $("#repasswordAlert").removeClass("d-block");
            $("#repasswordAlert").addClass("d-none");


        } else {
            $("#repasswordAlert").removeClass("d-none");
            $("#repasswordAlert").addClass("d-block");


        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled",false);
    } else {
        submitBtn.setAttribute("disabled", true);
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test($("#nameInput").val()));
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#emailInput").val()))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test($("#phoneInput").val()))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#ageInput").val()))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#passwordInput").val()))
}

function repasswordValidation() {
    return $("#repasswordInput").val() == $("#passwordInput").val();
}