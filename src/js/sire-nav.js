;(function function_name(window, document) {
  'use strict'

  var list = document.querySelector('.site-nav__list');
  var remeberElement = null;
  var subMenuStatus = false;




  list.addEventListener('mouseover', hoverSiteNavOver);
  list.addEventListener('mouseout', hoverSiteNavOut); 


  function hoverSiteNavOver(event) {
    event.preventDefault();

    var target = event.target;
    var div = document.getElementById('site-nav-toggle');
    var screenWidth = document.documentElement.clientWidth ;

//отменяет hover на медиа xs<765
    if( screenWidth < 750 ) {
      return;
    };
    //если дживение курсора на элементе
    if (remeberElement) return;

    while( target.tagName != 'UL' ) {
      if (target.hasAttribute('data-nav-li')) {
      	target.firstElementChild.classList.add('site-nav__link--active');
      	subMenuToggle(target);
      	animateAdd(target, 'fadeIn');
      	remeberElement = target;
      	break;
      }
      target = target.parentElement;
  	}
  }
  function hoverSiteNavOut(event) {
    event.preventDefault();

    var relatedTarget = event.relatedTarget;

    //если дживение курсора на элементе
    if (!remeberElement) return;

    while( relatedTarget ) {
      if (relatedTarget == remeberElement) {
      	return;
      }
      relatedTarget = relatedTarget.parentElement;
  	}
  	//произошло событие
  	remeberElement.firstElementChild.classList.remove('site-nav__link--active');
  	subMenuToggle(remeberElement);
  	animateRemove(remeberElement, 'fadeIn');
  	remeberElement = null;
  }

  function subMenuToggle(parent) {
  	var i = 0;


  	if (!subMenuStatus) {
  	  while( parent.children[i] ) {
        if (parent.children[i].tagName == 'UL') {
      	  parent.children[i].classList.add('site-nav__sub-list--active');
      	  subMenuStatus = true;
      	  break;
        }
        i++;
  	  }
  	} else {
  	  while( parent.children[i] ) {
        if (parent.children[i].tagName == 'UL') {
      	  parent.children[i].classList.remove('site-nav__sub-list--active');
      	  subMenuStatus = false;
      	  break;
        }
        i++;
  	  }	
  	}
  }
  function animateAdd(elem, animateName) {
  	elem.classList.add(animateName);
  	elem.classList.add('animated');
    
    
  }
  function animateRemove(elem, animateName) {
  	elem.classList.remove(animateName);
  }
})(window, document);


