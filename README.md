# PSA-Hackaton-2023
PSA-Hackaton-2023

Required
* install node -- https://nodejs.org/en
* install react -- npm install -g create-react-app.
* setup google cloud platform account 

How to run the file? 

* Backend Server
```shell
nodemon .\src\Backend_Brain.js
```

* Front end

```shell
cd client
npm start
```



Backend Files:
* Main: Backend_Brain.js
    * Function files:
        - JsonHandler.js  -- All the function to handle json data

Frontend Files:
* client: src: App.js -- main app and routing to multiple pages.
    * Activities:
        - Home.js -- Landing page and project description.
        - Application.js -- Page for I/O between backend.


* Models:
    * Container Quay model:
        * Qmodel1:
            self.width = 300
            self.lenght = 1000
    * Container model:
        * Cmodel1 
            self.width = 3
            self.lenght = 6
            self.height = 3
        * Cmodel2
            self.width = 3
            self.lenght = 12
            self.height = 4
    
YoutubeLink: https://youtu.be/_1olg6klE0I


*Google Cloud Platform 
	*Install Google Cloud SDK 
	*Create Project
	*Enable Cloud Run API 
	*Enable Google Container Registry API 
	*Retrieve Dockerfile from this URL: 
	- https://cloud.google.com/run/docs/quickstarts/build-and-deploy#containerizing
	*Cloud build & Deploy 
	- gcloud builds submit --tag gcr.io/<project_id>/<function_name>
	- gcloud run deploy --image gcr.io/<project_id>/<function_name> --platform managed


	Steps: 
	1) Code main script 
	2) Cloud build - package script into docker container (google container registry) 
	3) Cloud deploy - create a service on Cloud Run which can be triggered via a web request
