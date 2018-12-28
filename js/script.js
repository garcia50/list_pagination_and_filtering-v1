/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
Create constants and variables that will later be used and manipulated.
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


//Search bar functionality 
input.addEventListener('keyup', logKey);

function logKey(e) {
  for (var i = 0; i < students.length; i += 1) {
    student = students[i];
    if ( student.name.toLowerCase() === response.toLowerCase() ) {
      message = getStudentReport( student );
      print(message);
    }
  }  
}


input.onkeypress = function (e) {
  var key = e.key || e.which;
  if (key == 'Enter') {
    var name = input.value;
    for (var i = 0; i < studentList.length; i += 1) {

  }
};

button.addEventListener('click', () => {
  var name = input.value;
});

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

for (var i = 1; i < pageCount + 1; i++) {
  let liBlock  = `<li>
                    <a class="active" href="#">${i}</a>
                  </li>`;  

  ulPagination.innerHTML += liBlock;
}

pageParentDiv[0].appendChild(paginationDiv)


  removeStudentsFromPage();


  for (var i = 0; i < 10; i++) {
    studentList.appendChild(masterStudentList[i])
  }
// Copy the first ten 'li' elements and place them in the ul 

/*** 
When the user clicks on a pagination number, update the pageNumber variable
and call on the removeStudentsFromPage and addStudentsToPage functions.
***/
ulPagination.addEventListener('click', (e) => {
  if (e.target && e.target.matches('a')) {
    var a = e.target 
    pageNumber = parseInt(a.innerText);
    removeStudentsFromPage();
    addStudentsToPage();
  }
});

function addStudentsToPage() {
/*** 
Use Object assign function to deep copy students into emtpy array that limits
10 students per page. With a for loop and if statement cycle through the ten 
selected students at a time until page number matches count, then pass selected
students through addElementsToPage function.
***/
  var masterStudentListCopy = Object.assign([], masterStudentList);
  let count = 0
  for (var i = 0; i < masterStudentList.length; i++) {
    count++
    if (count != pageNumber) {
      masterStudentListCopy.splice(0, 10)
    } else {
      addElementsToPage(masterStudentListCopy.splice(0, 10));
    }
  }
};



