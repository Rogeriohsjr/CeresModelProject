# Project Specification

**Backend**
1. .Net Core - v2.2
2. Entityframework - 2.2.1

**Frontend**
1. Vuejs - v2.5
2. bootstrap - v3.3


# .Net Command

*dotnet publish*
*dotnet run*


# Publish to Production
*dotnet publish --output publish*


# Creating and Updating Database
1. Install Database

*dotnet ef migrations add InitialCreate*

*dotnet ef database update*

These commands will create a Database and Create the Tables.

Source: https://docs.microsoft.com/en-us/ef/core/get-started/aspnetcore/new-db?tabs=netcore-cli

2. If you add a new Table or New Column in the Table, run the same command.

*dotnet ef migrations add AddedNewColumn*

*dotnet ef database update*

Source: https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/new-field?view=aspnetcore-2.2&tabs=visual-studio-code


