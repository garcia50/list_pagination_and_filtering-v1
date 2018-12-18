/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const pageParentDiv = document.getElementsByClassName("page") 
const pageHeader = document.getElementsByClassName("page-header cf");
const searchDiv = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');

searchDiv.className = "student-search";
input.placeholder = "Search for students...";
button.textContent = "Search";

searchDiv.append(input);
searchDiv.append(button);
pageHeader[0].append(searchDiv);



const studentList = document.querySelector('ul');
const masterStudentList = [];

var liStudents = document.getElementsByTagName('li')
var pageNumber = 1



const paginationDiv = document.createElement('div');
paginationDiv.className = "pagination";
const ulPagination = document.createElement('ul');
paginationDiv.appendChild(ulPagination);



//Function Definitions 
function removeStudentsFromPage() {
  while (studentList.firstElementChild) {
    studentList.removeChild(studentList.firstElementChild);
  }
}

function addElementsToPage(elementList) {
  for (var i = 0; i < elementList.length; i++) {
    studentList.appendChild(elementList[i])
  }  
};


/*** 
Step 1
Push students('li') into a `studentArry`(array)
***/
for (var i = 0; i < studentList.childElementCount; i += 1) {
  masterStudentList.push(studentList.children[i]);
}

/*** 
Step 2
Find out the amount of pages need to fill each up to a total of 10 people per page
Divide total number of students by ten
***/
var pageCount = Math.floor(masterStudentList.length / 10)

// Add page to pageCount if remainder exist
if ((masterStudentList.length % 10) > 0) {
  pageCount++
}


//Step 3 - Create pagination elements 
for (var i = 1; i < pageCount + 1; i++) {
  let liBlock  = `<li>
                    <a class="active" href="#">${i}</a>
                  </li>`;  

  ulPagination.innerHTML += liBlock;
}

pageParentDiv[0].appendChild(paginationDiv)


// Step 4 - Remove all 'li' elements from the ul on the page
  removeStudentsFromPage();

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.