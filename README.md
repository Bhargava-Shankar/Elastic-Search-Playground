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
![Pasted image 20241003003503](https://github.com/user-attachments/assets/1fea3be4-cfc9-4b8e-bf71-192526afc0bd)

![Pasted image 20241002190350](https://github.com/user-attachments/assets/aa99c742-6c92-427d-adf4-431768e149f8)


#### Basic Data Cleaning
- Removed rows whose Employed ID was empty
- Removed a column (Exit Date) from dataset whose data was almost empty
- Before and After Cleaning
- ![Pasted image 20241003002932](https://github.com/user-attachments/assets/64eaa211-7610-48f1-8d5b-091eacbf3140)

- ![Pasted image 20241003002949](https://github.com/user-attachments/assets/2a215db2-e03e-40c0-9ee9-9213dc1014fd)



#### Process to Index and Load dataset to Elastic Search
- Wrote Two functions to help setting up elastic search ready for interaction
	- One to Create Employee Dataset Index using the Schema Inferred from given csv file
	- Second to parse CSV to JSON and bulk upload to Elastic Search
- ![Pasted image 20241003001939](https://github.com/user-attachments/assets/bd2bc4d4-9e0d-4acb-b0bb-8c27f538ff63)



#### Backend Service for Search Functionality
Created a custom express.js API that will get query payload and return data from elastic search index
![Pasted image 20241003002139](https://github.com/user-attachments/assets/cedbb143-aa5e-46ef-8dde-be0305e872ee)



#### Backend and Frontend Integration
- Created a Simple frontend using Next.js to help interact with custom Elastic Search Service
![Pasted image 20241003002835](https://github.com/user-attachments/assets/fa9798a4-0f65-43f2-a122-dc1bdf9986c0)

