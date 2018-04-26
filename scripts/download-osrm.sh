if [ ! -d "data/osrm/argentina" ]
then 
    wget https://s3.amazonaws.com/run-forrest/argentina.tar.gz
    tar xvz -C data/osrm/argentina
fi