/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
Create and modify constants and variables that will later be used and manipulated.
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
var searchResultsList = []

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

function logKey(e) {
  let userInput = document.querySelector('input');
  removeStudentsFromPage();
  // var masterStudentListCopy = Object.assign([], masterStudentList);
  for (var i = 0; i < masterStudentList.length; i += 1) {
    if (masterStudentList[i].childNodes[1].innerText.match(userInput.value)) {
      studentList.appendChild(masterStudentList[i])
      // masterStudentList = masterStudentList.push(masterStudentList[i])
    }
  }  
}

/*** 
Use Object assign function to deep copy students into emtpy array that limits
10 students per page. With a for loop and if statement cycle through the ten 
selected students at a time until page number matches count, then pass selected
students through addElementsToPage function.
***/
function addStudentsToPage(pageNumber) {
  var list = searchResultsList.length > 0 ? searchResultsList : masterStudentList
  var masterStudentListCopy = Object.assign([], list);
  let count = 0
  for (var i = 0; i < list.length; i++) {
    count++
    if (count != pageNumber) {
      masterStudentListCopy.splice(0, 10)
    } else {
      addElementsToPage(masterStudentListCopy.splice(0, 10));
    }
  }
};

//Search bar eventListeners
input.addEventListener('keyup', logKey);

input.onkeypress = function (e) {
  var key = e.key || e.which;
  if (key == 'Enter') {
    logKey();
  }
};

const searchButton = document.querySelector('button');
searchButton.addEventListener('click', () => {
  logKey();
});





//Push students('li') into a `masterStudentList`(array)
for (var i = 0; i < studentList.childElementCount; i += 1) {
  masterStudentList.push(studentList.children[i]);
}

/*** 
Find out the amount of pages need to fill each up to a total of 10 people per page.
Divide total number of students by ten
***/
var pageCount = Math.floor(masterStudentList.length / 10)

// Add page to pageCount if remainder exist
if ((masterStudentList.length % 10) > 0) {
  pageCount++
}

// Create pagination elements if there are more than 10 students 
if (pageCount != 1) {
  for (var i = 1; i < pageCount + 1; i++) {
    let liBlock  = `<li>
                      <a class="active" href="#">${i}</a>
                    </li>`;  

    ulPagination.innerHTML += liBlock;
  }
}
//Append paginationDiv to pageParentDiv(which is the first div in the body)
pageParentDiv[0].appendChild(paginationDiv)

// Remove all 'li' elements from the ul on the page
removeStudentsFromPage();

// Copy the first ten 'li' elements and place them in the ul 
for (var i = 0; i < 10; i++) {
  studentList.appendChild(masterStudentList[i])
}

/*** 
When the user clicks on a pagination number, update the pageNumber variable
and call on the removeStudentsFromPage and addStudentsToPage functions.
***/
ulPagination.addEventListener('click', (e) => {
  var pageNumber = 1
  if (e.target && e.target.matches('a')) {
    var a = e.target 
    pageNumber = parseInt(a.innerText);
    removeStudentsFromPage();
    addStudentsToPage(pageNumber);
  }
});

