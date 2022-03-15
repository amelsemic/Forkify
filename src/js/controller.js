import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searcView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
//const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

/* if (module.hot) {
  module.hot.accept();
} */

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    resultsView.render(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmarks);

    recipeView.renderSpinner();
    //1.loading recipes
    await model.loadRecipe(id);

    //2.rendering recipes
    recipeView.render(model.state.recipe);

    //test
    //controlServings();
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    //Load search results
    await model.loadSearchResults(query);

    //Render results
    resultsView.render(model.getSearchResultsPage());

    //pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};

const controlPagination = function (goToPage) {
  //Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //pagination new buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //Update the recipe view
  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function () {
  //Add or remove bkmrk
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //UPdate bookmarks
  recipeView.render(model.state.recipe);
  //Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //Upload recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render reipe
    recipeView.render(model.state.recipe);

    //Close form
    addRecipeView.toggleWindow();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
