create table users(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    contact varchar(20),
    email varchar(100),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
)

insert into users(name, email, password, status, role)
value('HOLA', '12234556', 'hola@gmail.com', 'hola123', 'true', 'admin');