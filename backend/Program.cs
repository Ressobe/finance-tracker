using api.Data;
using api.Interfaces;
using api.Models;
using api.Services;
using api.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddLogging(config =>
{
  config.AddConsole();
  config.AddDebug();
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*builder.Services.AddCors(options =>*/
/*{*/
/*  options.AddPolicy("AllowSpecificOrigins", policy =>*/
/*  {*/
/*    policy.WithOrigins("http://localhost")*/
/*            .AllowAnyHeader()*/
/*            .AllowAnyMethod()*/
/*            .AllowCredentials();*/
/*  });*/
/*});*/


builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowSpecificOrigins", policy =>
  {
    policy.WithOrigins("http://frontend-finance-tracker:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
  });
});

builder.Services.AddSwaggerGen(option =>
{
  var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
  var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
  option.IncludeXmlComments(xmlPath);
  option.SwaggerDoc("v1", new OpenApiInfo { Title = "Finance Tracker API", Version = "v1" });
  option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
  {
    In = ParameterLocation.Header,
    Description = "Please enter a valid token",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat = "JWT",
    Scheme = "Bearer"
  });
  option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});


builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
  options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.AddNpgsqlDbContext<ApplicationDBContext>("postgresdb");

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
  options.Password.RequireDigit = false;
  options.Password.RequireLowercase = false;
  options.Password.RequireUppercase = false;
  options.Password.RequireNonAlphanumeric = false;
  options.Password.RequiredLength = 6;
}).AddEntityFrameworkStores<ApplicationDBContext>();

builder.Services.AddAuthentication(options =>
{
  options.DefaultAuthenticateScheme =
  options.DefaultChallengeScheme =
  options.DefaultForbidScheme =
  options.DefaultScheme =
  options.DefaultSignInScheme =
  options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
  options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    ValidateIssuer = false,
    ValidIssuer = builder.Configuration["JWT:Issuer"],
    ValidateAudience = false,
    ValidAudience = builder.Configuration["JWT:Audience"],
    IssuerSigningKey = new SymmetricSecurityKey(
        System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
    ),
    ValidateLifetime = true,
  };

  options.Events = new JwtBearerEvents
  {
    OnAuthenticationFailed = context =>
    {
      context.NoResult();
      context.Response.StatusCode = 401;
      context.Response.ContentType = "text/plain";
      return context.Response.WriteAsync("Unauthorized: " + context.Exception.Message);
    },
    OnTokenValidated = context =>
    {
      return Task.CompletedTask;
    }
  };
});

builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<ITransactionRepository, TransactionRepository>();
builder.Services.AddScoped<ITransferRepository, TransferRepository>();
builder.Services.AddScoped<ISavingGoalRepository, SavingGoalRepository>();
builder.Services.AddScoped<ISavingTransactionRepository, SavingTransactionRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.WebHost.UseUrls("http://+:80");

var app = builder.Build();

app.UseCors("AllowSpecificOrigins");

/*if (app.Environment.IsDevelopment())*/
/*{*/
app.UseSwagger();
app.UseSwaggerUI();
/*}*/

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();


app.MapControllers();
app.Run();
