# CSV_Upload
This time I worked with external data, as in ‘csv’ files. You can upload only CSV file and see the data in it.

# Theme
    • You can upload any csv file into the system (considered the delimiter to be a comma ‘ , ’).
    • Displayed a list of all uploaded csv files.
    • When the user selects a file, display all the data (with column headers) in a table on the page (front end).
    • There is search box which searches on the front end itself and displays the matching rows of the table only (empty search box displays all the data). (I put a search on first column)
    • You can upload "DIFFERENT CSV FILES WITH DIFFERENT COLUMN HEADERS".
    • There is sorting button (ascending and descending) for each column on the front end.
    • Put a validation on the front end and server side on being able to upload only csv type of files.
    
# URL
  http://localhost:8888/ :- For home page (Upload and List of all Files)
  http://localhost:8888/showFile/:id :- For displaying the data of selected file
