# Contact API image for Render (or any container host). Build context: the /api folder.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props ./
COPY ContactApi/ContactApi.csproj ContactApi/
RUN dotnet restore ContactApi/ContactApi.csproj
COPY ContactApi/ ContactApi/
RUN dotnet publish ContactApi/ContactApi.csproj -c Release -o /app --no-restore

# Chiseled runtime: no shell or package manager, runs as a non-root user.
FROM mcr.microsoft.com/dotnet/aspnet:10.0-noble-chiseled
WORKDIR /app
COPY --from=build /app ./
ENV ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_gcServer=0
EXPOSE 8080
ENTRYPOINT ["dotnet", "ContactApi.dll"]
