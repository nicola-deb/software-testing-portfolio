**Key Features** <br>
- **User Management:** Functions to view, create, update, and delete user accounts via a RESTful API.<br>
- **Backend Integration:** Node.js handles server-side logic and communicates with the SQLite database.<br>
- **Database Management:** SQLite provides a lightweight and efficient storage solution for user data.<br>
- **Batch Operations:** Python scripts enable batch addition, updating, or deletion of multiple users, streamlining user 
  management tasks.

**Technologies Used**
<br>
- **Frontend:** HTML, CSS, JavaScript<br>
- **Backend:** Node.js<br>
- **Database:** SQLite<br>
- **REST API:** Endpoints for adding, updating, viewing, and deleting users.<br>
- **Scripting:** Python for batch user operations.
- **Git:** Version Control

**Testing**
<br>
- **Postman API Testing Tool:**<br>
  - I used the POSTMAN Tool to test the REST API endpoints used for the creation, read, update and deletion of users, via the relevant GET,POST,PUT and DELETE HTTP requests.<br>
  - I saved this collection in the [Postman Folder](https://github.com/nicola-deb/software-testing-portfolio/tree/main/my-user-management-app/Postman_TestCollection) which can also be run in the terminal via the "newman run" command.<br>
  - Please see [here](https://github.com/nicola-deb/software-testing-portfolio/tree/main/my-user-management-app/Postman_TestCollection/postman_newman_cli_output_success.png) for the successful output of all tests.<br>

- **Python Scripting:** Interactive scripts to manage users in batch for quick set-up of environment & performance testing.<br>
  - The scripts to create, view and delete users are saved in the [test-scripts folder](https://github.com/nicola-deb/software-testing-portfolio/tree/main/my-user-management-app/test-scripts).<br>
  - Please see [here](https://github.com/nicola-deb/software-testing-portfolio/tree/main/my-user-management-app/test-scripts/script_terminal_output.png) for the successful output of all scripts.<br>

To Be Added:
- **Cypress & Javascript:** To verify the functionality of the UI components & interactions.<br>
- **Selenium & Java:** To verify the functionality
- **JMeter Performance Testing:** To test user load, response time & throughput <br>
