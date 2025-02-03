// Necessary Imports (you will need to use this)
const { error } = require('console');
const { Student } = require('./Student');
const fs = require('fs').promises;

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    // TODO
    let node = new Node(newStudent);   
    //console.log("Student adding: ",newStudent.getString()); used for testing purpose
    //console.log(node.data.getSpecialization());
    if(!this.head){
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;     
    }     
    this.length++;
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if(!this.head){  //Checks whether head is null or not. if null, returns.
      return;
    }

    let current = this.head; //if head not null, then current points to the head.
    let previous = null;    // previous is set to null initially
  
    if (current.data.getEmail()===email){  // checks to see whether the first student email matches the removefn param email. if matches
      console.log(`Removing Student: , ${current.data.getEmail()}`);
      this.head = current.next;            //next student is assigned to the head. 
              
       if (this.head === null){           // If there was only one students, means no ther students, then making the tail as null as well.
        this.tail = null;
       }     
       this.length--;
       return;
    } else {
      while(current){                     // if not, then iterates through the list until it matches.
        if(current.data.getEmail() === email){  //when it matches
          previous.next=current.next;           //the next student is assigned to previous thus by removing the current student from the list
          if(current.next === null){            //if the next student is null, tail is assigned to the previous student.
            this.tail = previous;
          }
          this.length--;                        //length is reduced to by 1
          return;
        }
        previous = current;
        current = current.next;
      }
      console.log(`Student with email ${email} not found)`);
    }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;    

    while(current){
      if(current.data.getEmail()===email){
        //console.log("Student found");        Used for testing purpose
        //console.log(current.data.getString());
        return current.data;
      }
      
      current = current.next;
    }
    //console.log("Student not found");   Used for testing purpose
    return -1;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;

  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    let current = this.head;
    let displaylist = [];
    while(current){
      displaylist.push(current.data.getName());
      current=current.next;
    }
    console.log(displaylist);
    return displaylist.join(", ");
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    const sortedStudents = [];
    let current = this.head;
    //console.log(current.data.getString()); Used it for testing purpose
    if(this.length === 0){
      return [];
    } else
    while (current){
      sortedStudents.push(
        {name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization()}      

        //current.data
      );
      //console.log(sortedStudents); Used for testing purpose
      current = current.next;
    }
    
    sortedStudents.sort((a,b)=>{
      if(a.getName() < b.getName()){
        return -1;
      }
      if(a.getName()>b.getName()){
        return 1;
      }
      return 0;
    });
    console.log("Sorted students List ", sortedStudents); 
    return sortedStudents;   
  }

  //public method to return the sorted students by name using the private method.
  sortedList(){
    const studentsSorted = this.#sortStudentsByName();
    return studentsSorted;
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    const filteredSpecStudents = [];
    let current = this.head;
    if(this.length === 0){
      return [];
    } else {
      while(current){
        if(current.data.getSpecialization().toLowerCase() === specialization.toLowerCase()){
          filteredSpecStudents.push(current.data);
        }
          current = current.next;      
      }
      //console.log("Filtered Students: ",filteredSpecStudents); Used for test purpose
      filteredSpecStudents.sort((a,b)=>{
        if (a.getName()<b.getName()){
          return -1;
        } else if (a.getName()>b.getName()){
          return 1;
        } else {
          return 0;
        }
       
      })    
      //console.log("Filtered and Sorted by Spec: ",filteredSpecStudents); Used for test purpose
      return filteredSpecStudents;
  }}

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    // TODO
    const filteredMinYearStudents = [];
    let current = this.head;
    if(this.length === 0){
      return [];
    } else {
      while(current){
        if (current.data.getYear() >= minYear){
          filteredMinYearStudents.push(current.data);
        }
        current = current.next;
      }
      //console.log("Filtered Students by minYear: ", filteredMinYearStudents);     
    }

    filteredMinYearStudents.sort((a,b)=>{
      if(a.getName() < b.getName()){
        return -1;
      } else if (a.getName() > b.getName()){
        return 1;
      } else {
        return 0;
      }
    })
    //console.log("Sorted Filtered Students by minYear: ", filteredMinYearStudents);
    return filteredMinYearStudents;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
     
     const newstudentsArray = [];
     let current = this.head;
     try {
        while(current){
          newstudentsArray.push({
            name: current.data.getName(),
            year: current.data.getYear(),
            email: current.data.getEmail(),
            specialization: current.data.getSpecialization()
          });
          current = current.next;
        }
        await fs.writeFile(fileName,JSON.stringify(newstudentsArray),'utf8');
        console.log("File written successfully");
     }
     catch(error){
      console.log("Error:", error);
     }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    try{
      const data = await fs.readFile(fileName,'utf8');
      const studentsArray = JSON.parse(data);
      console.log('File Content:',studentsArray);

      this.clearStudents();

      studentsArray.forEach(studentData => {
        const {name, year, email, specialization } = studentData;
        const student = new Student (name, year, email, specialization);
        this.addStudent(student);
      });
      console.log("Students loaded into the LinkedList");    

    }
    catch (error) {
      console.log('Error: ', error);
    }


  }

}

module.exports = { LinkedList }
