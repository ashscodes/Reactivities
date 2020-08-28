# Reactivities

Reactivities is a sample social media site for activities/events. I built this project from a Udemy course I followed with some small additions and customisations on my side. Currently it uses a [SQLite](https://www.sqlite.org/index.html) database that will be built on the start up of the API project.

## Technologies Used

- [netcoreapp3.0](https://github.com/dotnet/core)
    - [Entity Framework Core](https://github.com/dotnet/EntityFramework.Docs)
    - [MediatR](https://github.com/jbogard/MediatR)
    - [FluentValidation](https://github.com/FluentValidation/FluentValidation)
    - [AutoMapper](https://github.com/AutoMapper/AutoMapper)
    - [Cloudinary](https://github.com/cloudinary/CloudinaryDotNet)
    - [Jwt](https://github.com/dotnet/core)
    - [SignalR](https://github.com/SignalR/SignalR)

- [React](https://github.com/facebook/react)
    - [axios](https://github.com/axios/axios)
    - [mobx](https://github.com/mobxjs/mobx)
    - [react-router](https://github.com/ReactTraining/react-router)
    - [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React)
    - [final-form](https://github.com/final-form/react-final-form)


## Requirements

### Backend

To run in development mode:

- You need a free [Cloudinary](https://cloudinary.com/) account to host images for the site.
- Set secrets using `dotnet user-secrets` within the API project for the following keys:
    - `TokenKey` _Used for JWT configuration_
    - `Cloudinary:CloudName` _Cloudinary cloud name_
    - `Cloudinary:ApiSecret` _Cloudinary API secret_
    - `Cloudinary:ApiKey` _Cloudinary API key_

You should then be able to run `dotnet watch run` within the API directory.

### Frontend

You will need [Node.js](https://nodejs.org/en/download/) and to then confirm that you have [npm](https://www.npmjs.com/) installed.

Run `npm start` from the client-app directory.

## Future Plans

- Migrate to MySQL Database.
- Add private messaging between users.
- CSP settings.
- Sample instance hosted somewhere.
