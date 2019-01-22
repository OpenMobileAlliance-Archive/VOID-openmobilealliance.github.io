# OMA Registries 

This project is for the development and deployment of the OMA registries web pages at https://www.openmobilealliance.org/wp


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This is an HTML and Javascript based project so can be deployed as such in a typical web server.  

For development, npm and node are recommended


### Installing

First clone the repository and the LwM2M submodule (which can be found here: https://github.com/OpenMobileAlliance/trial.git)  

git clone --recursive https://github.com/OpenMobileAlliance/openmobilealliance.github.io.git .  
git submodule update --init --recursive


## Development

For development purposes, run using:  
npm start


## Deployment

For running in a production environment just copy the repository to the hosting webserver and run:  
git checkout master  
cd lwm2m-registry/  
git checkout master  
Add additional notes about how to deploy this on a live system  

For running in a development environment just copy the repository to the hosting webserver and run:  
git checkout DEVMaster  
cd lwm2m-registry/  
git checkout dev  


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/OpenMobileAlliance/openmobilealliance.github.io/tags). 

## Authors

* **Nathan Dixon** - *Initial work* - [OpenMobileAlliance](https://github.com/OpenMobileAlliance)  

See also the list of [contributors](https://github.com/OpenMobileAlliance/openmobilealliance.github.io/contributors) who participated in this project.  

## License

This project is licensed under the OMA License - see the [LICENSE.md](LICENSE.md) file for details
