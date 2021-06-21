'use strict';

{
  const titleClickHandler = function(event) {
    console.log('Link was clicked!');
    console.log(event);
    event.preventDefault();

    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute('href');
    console.log(hrefAttribute);

    /* [DONE]find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(hrefAttribute);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log(targetArticle);
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags .list',
    optArticleTagsSelector = '.post-tags .list';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = '') {
    console.log(customSelector);

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('j' + articles);

    let html = '';

    for (let article of articles) {

      /* get the article id */

      const articleID = article.getAttribute('id');

      /* find the title element */

      /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleID + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */

      html = html + linkHTML;
    }

    titleList.innerHTML = html;
    console.log(html);
    
    const links = document.querySelectorAll('.titles a');
    console.log(links);
  
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = [];
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);
  
    /* START LOOP: for every article: */

    for (let article of articles) {
      console.log(article);
  
      /* find tags wrapper */

      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('j' + tagsWrapper);
      /* make html variable with empty string */

      let html = '';
  
      /* get tags from data-tags attribute */

      const tags = article.getAttribute('data-tags');
      console.log('k' + tags);
  
      /* split tags into array */

      const tagsArray = tags.split(' ');
      console.log(tagsArray);
  
      /* START LOOP: for each tag */
      for (let tag of tagsArray) {
        console.log(tag);
  
        /* generate HTML of the link */

        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + ', </a></li>';
  
        /* add generated code to html variable */

        html = html + linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
          allTags.push(linkHTML);
        }
        /* END LOOP: for each tag */
      }
  
      /* insert HTML of all the links into the tags wrapper */

      tagsWrapper.insertAdjacentHTML('afterbegin', html);
      console.log(html);
  
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
  }

  generateTags();

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('k ' + tag);
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-' + tag + '"]');
    /* START LOOP: for each active tag link */
    for (let activeTag of activeTagLinks) {
      /* remove class active */
      activeTag.classList.remove('active');
      console.log(activeTag);
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    for (let links of tagLinks) {
      /* add class active */
      links.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){
    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags li a');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  // eslint-disable-next-line no-inner-declarations
  function generateAuthors() {

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

      const authorsWrapper = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const author = article.getAttribute('data-author');
      console.log(author);

      const linkHTML = 'by <a href="#author-' + author + '">' + author + '</a>';

      html = html + linkHTML;
      
      authorsWrapper.insertAdjacentHTML('afterbegin', html);
      console.log(html);
    }

  }
  generateAuthors();

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const author = href.replace('#author-', '');

    const activeAuthorLink = document.querySelectorAll('a.active[href^="#author-' + author + '"]');

    for (let authorLink of activeAuthorLink) {

      authorLink.classList.remove('active');
    }

    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let link of authorLinks) {

      link.classList.add('active');

    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors() {
    const links = document.querySelectorAll('.post-author a');

    for (let link of links) {

      link.addEventListener('click', authorClickHandler);
      
    }
  }
  addClickListenersToAuthors();
}