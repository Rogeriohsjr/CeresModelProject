
# 

dotnet publish

dotnet run




Publish to Production


dotnet publish --output publish



1. Install Database
dotnet ef migrations add InitialCreate
dotnet ef database update

These commands will create a Database and Create the Tables.
Source: https://docs.microsoft.com/en-us/ef/core/get-started/aspnetcore/new-db?tabs=netcore-cli

2. If you add a new Table or New Column in the Table, run the same command.
dotnet ef migrations add AddedNewColumn
dotnet ef database update

Source: https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/new-field?view=aspnetcore-2.2&tabs=visual-studio-code


