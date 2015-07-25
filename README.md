# angsym
AngularJS Symfony2 Single Page App with FOS User Bundle and FOS Rest Bundle

# Rest routes and post example with postman
Registration
http://127.0.0.1:8000/app_dev.php/rogoit/api/users
Post on route as JSON/Application
{
    "email": "rolandgolla@gmail.com"
}

print JSON
true

second time
[
  {
    "property_path": "username",
    "message": "The username is already used"
  },
  {
    "property_path": "email",
    "message": "The email is already used"
  }
]

Registration
http://127.0.0.1:8000/app_dev.php/rogoit/api/unlock/c048d199e4be0ba089d0ebdd5c7a2643
Post on route JSON Application
{
    "username": "roland",
    "password": "testify"
}

return new User id
{
  "id": 1
}

Second time
{
  "code": 404,
  "message": "Rogoit\\\\AngsymBundle\\\\Entity\\\\User object not found."
}

Login
http://127.0.0.1:8000/app_dev.php/login_check
{
    "username": "roland",
    "password": "testify"
}

return
[]

Wrong password