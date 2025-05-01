#include <iostream>
#include <vector>
#include <string>
#include <cmath>
using namespace std;

// Class to represent a single student
class Student
{
private:
    string name;
    int rollNumber;
    int presentCount; // Stores number of times the student was marked present
    int absentCount;
    vector<pair<string, char>> dailyAttendance;

public:
    // Default constructor initializes values
    Student()
    {
        this->rollNumber = 0;
        this->name = "";
        this->presentCount = 0;
        this->absentCount = 0;
    }

    // Sets the student details
    void setDetails(string n, int r)
    {
        name = n;
        rollNumber = r;
        presentCount = 0; // Initially, present count is 0
        absentCount = 0;
    }

    // Increments the present count when marked present
    void markAttendance()
    {
        presentCount++;
    }
    void markAbsent()
    {
        absentCount++;
    }
    // Displays student's attendance record
    void displayAttendance()
    {
        cout << "Roll No: " << rollNumber << "\n Name: " << name
             << "\n Presents: " << presentCount << "\nAbsents: " << absentCount << endl;
    }

    // Returns the roll number (used for display and identification)
    int getRollNumber()
    {
        return rollNumber;
    }
};

// Class to manage the attendance system
class AttendanceSystem
{
private:
    vector<Student> Students; // Stores list of students

public:
    // Adds a new student to the system
    void addStudent()
    {
        string name;
        string input;
        int rollNumber;

        cin.ignore(); // Clears input buffer

        while (1)
        {
            cout << "Enter student name: ";
            getline(cin, name);

            bool isValid = true;
            for (char c : name)
            {
                if (!isalpha(c))
                {
                    isValid = false;
                    cout << "Error :: Name should not contain any number and special characters\n  ";
                    break;
                }
            }
            if (isValid)
            {
                break;
            }
        }

        while (int i = 1)
        {
            cout << "Enter the student roll number: ";
            cin >> input;

            // Check for duplicate roll number

            bool isValid = true;

            for (char c : input)
            {
                if (!isdigit(c))
                {
                    isValid = false;
                    break;
                }
            }

            if (!isValid)
            {
                cout << "Error :: Enter a valid roll number\n";
                continue;
            }
            break;
        }

        for (auto &s : Students)
        {
            if (s.getRollNumber() == rollNumber)
            {
                cout << "Error: Roll number already exists. Please use a unique roll number.\n";
                return; // Exit the function without adding
            }
        }

        Student s;
        s.setDetails(name, rollNumber);
        Students.push_back(s);
        cout << "Student added successfully.\n";
    }

    // Marks attendance for all students
    void markAttendance()
    {
        char attendance;
        for (auto &atn : Students) // Pass by reference to update object
        {
            cout << "Mark attendance for roll no. " << atn.getRollNumber() << " (P/A): ";
            cin >> attendance;

            // Check if input is 'P' or 'p' to mark present
            if (attendance == 'p' || attendance == 'P' || attendance == 'a' || attendance == 'A')
            {
                if (attendance == 'P' || attendance == 'p')
                {
                    atn.markAttendance();
                }
                else
                    atn.markAbsent();
            }
            else
                markAttendance();
        }
    }

    // Displays attendance record for all students
    void viewAttendance()
    {
        cout << "\n--- Attendance Record ---\n";
        for (auto &atn : Students)
        {
            atn.displayAttendance();
        }
    }
};

// Main function to run the menu-driven attendance system
int main()
{
    AttendanceSystem system;
    int choice;

    do
    {
        // Menu options
        cout << "\n===== Attendance System Menu =====\n";
        cout << "1. Add Student\n";
        cout << "2. Mark Attendance\n";
        cout << "3. View Attendance\n";
        cout << "4. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        // Switch-case to handle menu choice
        switch (choice)
        {
        case 1:
            system.addStudent();
            break;
        case 2:
            system.markAttendance();
            break;
        case 3:
            system.viewAttendance();
            break;
        case 4:
            cout << "Exiting...\n";
            break;
        default:
            cout << "Invalid choice. Try again.\n";
        }
    } while (choice != 4); // Loop until user chooses to exit

    return 0;
}
