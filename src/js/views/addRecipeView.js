import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window')
  _overlay = document.querySelector('.overlay')
  __btnOpen = document.querySelector('.nav__btn--add-recipe')
  __btnClose = document.querySelector('.btn--close-modal')

  constructor () {
      super();
      this._addHandlerShowWindow();
      this._addHandlerHideWindow();
  }

  toggleWindow () {
      this._overlay.classList.toggle('hidden')
      this._window.classList.toggle('hidden')
  }

  _addHandlerShowWindow() {
      this.__btnOpen.addEventListener('click', this.toggleWindow.bind(this))
  }

  _addHandlerHideWindow () {
      this.__btnClose.addEventListener('click', this.toggleWindow.bind(this))
      this._overlay.addEventListener('click', this.toggleWindow.bind(this))
  }

  _addHandlerUpload(handler){
      this._parentElement.addEventListener('submit', function(e){
          e.preventDefault();
                //ovdje ispod, 'this' je forma(nad njom je pozvan eventListener)
          const dataArr = [...new FormData(this)];
          const data = Object.fromEntries(dataArr)
          handler(data);
      })
  }



  _generateMarkup() {}
}

export default new AddRecipeView();
