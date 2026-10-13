# MyWarranty – Product Warranty Tracker

MyWarranty is a responsive full-stack web application that helps users organize their purchased products and keep track of warranty periods in one place. It provides a dashboard to review products, monitor warranty expiration dates, and manage product and purchase information.

**Live Demo:** [my-warranty.vercel.app](https://my-warranty.vercel.app)

## Features

- **Dashboard:** View product statistics and recently added products.
- **Product Management:** Add, view, update, and delete product records.
- **Warranty Tracking:** Calculate warranty status using warranty start and end dates.
- **Expiration Monitoring:** Identify active, expiring soon, and expired warranties.
- **Product Details:** View product information, warranty dates, and related documents.
- **Image and Invoice Support:** Associate product images and invoice information with product records.
- **Search and Filtering:** Organize products by warranty status.
- **Theme Settings:** Switch between light and dark themes.
- **Responsive UI:** Designed to work across desktop, tablet, and mobile screens.

## Technology Stack

### Frontend
- Angular
- TypeScript
- HTML5 and CSS3
- Bootstrap and Bootstrap Icons
- Angular Router and HttpClient

### Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- RESTful API architecture
- Dependency Injection
- DTOs for API data transfer

### Database
- Microsoft SQL Server
- Relational tables and foreign key relationships
- Entity Framework Core database integration

### Tools
- Visual Studio Code
- Visual Studio
- Git and GitHub
- Postman
- Swagger / OpenAPI

## Application Modules

| Module | Description |
|---|---|
| Dashboard | Displays product statistics and recent products |
| My Products | Manages product records and warranty information |
| Expiring Soon | Helps identify warranties approaching expiration |
| Expired Products | Displays products with expired warranties |
| Product Details | Shows product information, warranty dates, and documents |
| Settings | Manages application appearance preferences |

## Architecture

The application separates the frontend, backend, and database responsibilities.

1. **Angular frontend:** Provides the user interface and sends HTTP requests to the backend.
2. **ASP.NET Core Web API:** Handles incoming requests, validates data, and processes product operations.
3. **Entity Framework Core:** Connects the backend application to SQL Server.
4. **SQL Server:** Stores product information, warranty dates, settings, and related relational data.

## Getting Started

### Prerequisites

Install the following tools before running the application locally:

- Node.js and npm
- Angular CLI
- .NET SDK compatible with the backend project
- Microsoft SQL Server
- SQL Server Management Studio (SSMS), optional

### 1. Clone the repository

```bash
git clone https://github.com/adeebb22/MyWarranty.git
cd MyWarranty
```

### 2. Configure the database

Create a SQL Server database named `mywarrantyDB`.

Configure the connection string in the backend's `appsettings.json` or the appropriate development configuration file.

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=mywarrantyDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Replace `YOUR_SERVER` with your SQL Server instance. Use a suitable connection string for your local authentication setup. Never commit real database passwords or production secrets.

### 3. Run the backend

Open a terminal in the backend project directory:

```bash
cd MyWarranty.Server
dotnet restore
dotnet run
```

Use the API URL printed in the terminal. If Swagger is enabled for your environment, you can use it to inspect and test the API endpoints.

### 4. Run the frontend

Open another terminal:

```bash
cd MyWarranty.Client
npm install
ng serve
```

Open the local URL printed by Angular, usually `http://localhost:4200`.

Ensure the frontend API configuration points to the running backend URL.

## Deployment

The frontend is deployed on Vercel:

**[Open MyWarranty](https://my-warranty.vercel.app)**

The backend API and database must also be hosted and configured appropriately for the live application to support persistent product operations. Local development connection strings should not be used in production.

## Future Improvements

- User registration and login using JWT authentication.
- User-specific product access and authorization.
- Warranty expiration reminders and notifications.
- Production deployment of the API and database.
- Additional document management and validation.

## What I Learned

- Building a full-stack application using Angular and ASP.NET Core.
- Developing REST API endpoints for CRUD operations.
- Connecting a Web API to SQL Server using Entity Framework Core.
- Organizing backend code with services, interfaces, models, and DTOs.
- Integrating frontend services with backend APIs using Angular HttpClient.
- Implementing responsive layouts, theme settings, and date-based business logic.
- Managing source code and project updates using Git and GitHub.

## Author

**Adeeb PA**

Full Stack Developer | Angular and ASP.NET Core

- GitHub: [@adeebb22](https://github.com/adeebb22)
- Project: [MyWarranty](https://github.com/adeebb22/MyWarranty)

---

*MyWarranty is a personal full-stack portfolio project developed to demonstrate practical web application development, API integration, database operations, and responsive UI design.*
