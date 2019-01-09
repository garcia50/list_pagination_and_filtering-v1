//Create and modify constants and variables that will later be used and manipulated.
const pageParentDiv = document.getElementsByClassName("page"); 
const pageHeader = document.getElementsByClassName("page-header cf");

const searchDiv = document.createElement('div');
const input = document.createElement('input');
const button = document.createElement('button');
var activePageNumber = 1

searchDiv.className = "student-search";
input.placeholder = "Search for students...";
button.textContent = "Search";
searchDiv.append(input);
searchDiv.append(button);
pageHeader[0].append(searchDiv);

const studentList = document.querySelector('ul');
const masterStudentList = [];
var searchResultsList = [];

const paginationDiv = document.createElement('div');
paginationDiv.className = "pagination";
const ulPagination = document.createElement('ul');
paginationDiv.appendChild(ulPagination);
const searchButton = document.querySelector('button');

//Search bar eventListeners
input.addEventListener('keyup', logKey);

input.onkeypress = function (e) {
  var key = e.key || e.which;
  if (key == 'Enter') {
    logKey(e);
  }
};

searchButton.addEventListener('click', (e) => {
  logKey(e);
});

/*** 
When the user clicks on a pagination number, update the pageNumber variable 
by using the target property and the innerText method and call the 
`addStudentsToPage` functions.
***/
ulPagination.addEventListener('click', (e) => {
  if (e.target && e.target.matches('a')) {
    activePageNumber = parseInt(e.target.innerText);
    var students = studentListForPagination(activePageNumber);
    addStudentsToPage(students);
  }
});

//Function Definitions
const removeStudentsFromPage = () => {
  while (studentList.firstElementChild) {
    studentList.removeChild(studentList.firstElementChild);
  }
}

const addElementsToPage = (students) => {
  var loopCount = students.length < 10 ? students.length : 10
  for (var i = 0; i < loopCount; i++) {
    studentList.appendChild(students[i])
  }
}

const addStudentsToPage = (students) => {
  removeStudentsFromPage();
  addElementsToPage(students);
}

/*** 
Deep copy students into emtpy array that limits 10 students per page. With a for 
loop and if statement cycle through the ten selected students at a time until 
page number matches count, then return proper students or else splice/remove the
following students.
***/
const studentListForPagination = (pageNumber) => {
  var list = searchResultsList.length > 0 ? searchResultsList : masterStudentList
  var masterStudentListCopy = Object.assign([], list);
  let count = 0
  createPagination(list);
  for (var i = 0; i < list.length; i++) {
    count++
    if (count === pageNumber) {
      return masterStudentListCopy.splice(0, 10)
    } else {
      masterStudentListCopy.splice(0, 10)
    }
  }
} 

//Using the keyup function record the users input and return appropiate students
function logKey(e) {
  let userInput = document.querySelector('input').value;
  removeStudentsFromPage();
  populateSearchResultsList(userInput);
  activePageNumber = 1
  if (e.key == 'Backspace' && userInput == '') {
    createPagination();
  } else{
    createPagination(searchResultsList);
  }
}

const createPagination = (students = masterStudentList) => {
  //Find out the amount of pages need to fill each up to a total of 10 people per page.
  //Divide total number of students by ten
  var pageCount = Math.floor(students.length / 10)
  // Add page to pageCount if remainder exist
  if ((students.length % 10) > 0) {
    pageCount++
  }
  //Resets `ulPagination` div if search feature is used
  ulPagination.innerHTML = '';
  //Add a message when no results are found
  if (pageCount == 0){
    ulPagination.innerHTML = 'No results were found';
  // Create pagination elements if there are more than 10 students 
  } else if (pageCount != 1) {
    let liBlock = '';
    for (var i = 1; i < pageCount + 1; i++) {
      if (i == activePageNumber){
        liBlock += `<li>
                      <a class="active" href="#">${i}</a>
                    </li>`;
      } else {
        liBlock += `<li>
                        <a href="#">${i}</a>
                    </li>`;  
      }
    }
      ulPagination.innerHTML += liBlock;
  }
  //Append paginationDiv to pageParentDiv(which is the first div in the body)
  pageParentDiv[0].appendChild(paginationDiv)
  // Remove all 'li' elements from the ul on the page
  addStudentsToPage(students);
}

// Push students('li') into a `masterStudentList`(array)
const populateMasterStudentList = () => {
  for (var i = 0; i < studentList.childElementCount; i += 1) {
    masterStudentList.push(studentList.children[i]);
  }
}

//Push students('li') into `searchResultsList`(array)
const populateSearchResultsList = (userInput) => {
  if (userInput != null) {
    searchResultsList = []
    for (var i = 0; i < masterStudentList.length; i += 1) {
      var emailRemoved = masterStudentList[i].innerText.replace('@example.com','')
      var student = emailRemoved.replace('Joined','')
      if (student.match(userInput)) {
        searchResultsList.push(masterStudentList[i]);
      }
    }
  }
}

populateMasterStudentList();
createPagination();
