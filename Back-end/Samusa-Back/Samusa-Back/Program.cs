using Microsoft.AspNetCore.Localization;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Globalization;
 
var builder = WebApplication.CreateBuilder(args);
 
builder.Services.AddControllers();
 
// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
 
// Register the CORS middleware
builder.Services.AddCors();
 
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
 
var app = builder.Build();
 
app.UseHttpsRedirection();
 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
 
// Enable CORS globally
app.UseCors(builder => builder.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader());
 
app.UseAuthorization();
 
app.MapControllers();
 
app.Run();