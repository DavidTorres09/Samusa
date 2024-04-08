using API.Models;
using SamusaBackNew.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(typeof(IRepository<>), typeof(Repository<>));


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
builder.Services.AddCors();


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(builder => builder.WithOrigins("http://localhost:5173").AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
