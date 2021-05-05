import mysql.connector
from urllib.parse import unquote

def application(environ, start_response):
    # database
    mydb = mysql.connector.connect(
        host="localhost",
        user="lab7",
        password="password"
    )
    mycursor = mydb.cursor()
    mycursor.execute("create database if not exists lab7_database")
    mycursor.execute("use lab7_database")
    mycursor.execute("create table if not exists inputs(input1 varchar(750) primary key, input2 varchar(750))")

    # http
    status='200 OK'
    response_headers = []
    start_response(status, response_headers)

    method = environ['REQUEST_METHOD']

    key = environ['REQUEST_URI']
    key = key.split('/')
    key = key[2]
    print("key = ",key)

    if(method == 'POST'):
#          print(environ)
        for i in environ['wsgi.input']:
            data = i
        data = data.decode("utf-8")
        print("data = ",data)
        value = data.split('=')[1]

        # insert
        #add_key_value = ("insert into inputs values (%s, %s)")
        #key_value = ("k","")
        #mycursor.execute(add_key_value,key_value)

        # replace (may delete and than insert)
        # if you want to use replace, you have to set mrimary key in the table first, or the replace will act like an insert statement
        update_key_value = ("replace into inputs values (%s, %s)")
        key_value = (key,value)
        mycursor.execute(update_key_value,key_value)
        # insert or update
        # insert into inputs values('k', NULL) on duplicate key update input2='123';

        mydb.commit()
        mydb.close()
        return "OK".encode("utf-8")
    elif(method == 'GET'):
        # select
        select_input = ("select input2 from inputs where input1=%s")
        # convert from str to tuple
        key = (key,)
        mycursor.execute(select_input,key)
        result = mycursor.fetchall()
        if(len(result) < 1):
            return "key not found!".encode("utf-8")
        result = result[0][0]
        result = unquote(result)
        print("result = ",result)

        #for i in result:
        #    print(i)
        # or
        #for i in mycursor:
        #    print(i)

        #mydb.commit()
        mydb.close()
        return result.encode("utf-8")

    return