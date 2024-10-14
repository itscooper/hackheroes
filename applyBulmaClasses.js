/*
  Project: Hack Heroes
  File: applyBulmaClasses.js
  Description: Function to automatically apply standard bulma classes to HTML elements
  Author: Chris Cooper
  License: GNU AGPLv3
  -----------------------------------------------------------
  This JavaScript file is part of the Hack Heroes project.
*/

function applyBulmaClasses(htmlString) {
    // Create a temporary DOM element to manipulate the HTML string
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
  
    // Add Bulma class to <h1> elements
    const headings = tempDiv.querySelectorAll('h1');
    headings.forEach((heading) => {
      heading.classList.add('title');
    });
  
    // Add Bulma class to <h2> elements
    const subHeadings = tempDiv.querySelectorAll('h2');
    subHeadings.forEach((subHeading) => {
      subHeading.classList.add('subtitle');
    });
  
    // Add Bulma class to <blockquote> elements
    const blockquotes = tempDiv.querySelectorAll('blockquote');
    blockquotes.forEach((blockquote) => {
      blockquote.classList.add('has-text-justified', 'has-background-light', 'p-4', 'is-italic');
    });
  
    // Add Bulma classes to <ul> and <ol> (unordered and ordered lists)
    const unorderedLists = tempDiv.querySelectorAll('ul');
    unorderedLists.forEach((ul) => {
      ul.classList.add('content', 'list-disc');
    });
  
    const orderedLists = tempDiv.querySelectorAll('ol');
    orderedLists.forEach((ol) => {
      ol.classList.add('content', 'list-decimal');
    });
  
    // Add Bulma classes to <table> elements
    const tables = tempDiv.querySelectorAll('table');
    tables.forEach((table) => {
      table.classList.add('table', 'is-striped', 'is-hoverable', 'is-fullwidth');
    });
  
    // Add Bulma class to <img> elements
    const images = tempDiv.querySelectorAll('img');
    images.forEach((img) => {
      img.classList.add('image', 'is-centered');
    });
  
    // Return the modified HTML as a string
    return tempDiv.innerHTML;
  }