Developed a Simple webpage that would allow users to execute elastic search queries in JSON format and view the output from the indexed dataset.

Tech Stack Used:
- Elastic Search
- Express.js
- Pandas ( basic Data Cleaning )
- Next.js


#### Configuring Elastic Search
- Installed Elastic Search from official website and configured it as a windows service using
```bash
elasticsearch-service.bat install

elasticsearch.bat
```
![[Pasted image 20241003003503.png]]
![[Pasted image 20241002190350.png]]

#### Basic Data Cleaning
- Removed rows whose Employed ID was empty
- Removed a column (Exit Date) from dataset whose data was almost empty
- Before and After Cleaning
- ![[Pasted image 20241003002932.png]]
- ![[Pasted image 20241003002949.png]]


#### Process to Index and Load dataset to Elastic Search
- Wrote Two functions to help setting up elastic search ready for interaction
	- One to Create Employee Dataset Index using the Schema Inferred from given csv file
	- Second to parse CSV to JSON and bulk upload to Elastic Search
- ![[Pasted image 20241003001939.png]]


#### Backend Service for Search Functionality
Created a custom express.js API that will get query payload and return data from elastic search index
![[Pasted image 20241003002139.png]]


#### Backend and Frontend Integration
- Created a Simple frontend using Next.js to help interact with custom Elastic Search Service
![[Pasted image 20241003002835.png]]
